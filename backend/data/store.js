const {
  initialUsers,
  initialProducts,
  initialRentals,
  initialEvidence,
  initialPayments
} = require('./seedData');

/**
 * Resilient Data Store
 * Provides seamless in-memory or persisted storage when MongoDB is not running,
 * and syncs with Mongoose models when MongoDB is available.
 */
class MemoryDataStore {
  constructor() {
    this.users = JSON.parse(JSON.stringify(initialUsers));
    this.products = JSON.parse(JSON.stringify(initialProducts));
    this.rentals = JSON.parse(JSON.stringify(initialRentals));
    this.evidence = JSON.parse(JSON.stringify(initialEvidence));
    this.payments = JSON.parse(JSON.stringify(initialPayments));
    this.inspections = [];
    this.penalties = [];
    this.notifications = [
      {
        _id: 'notif_1',
        userId: '65e000000000000000000001',
        title: 'Rental RNT-1023 Under Inspection',
        message: 'Your returned Sabyasachi Lehenga has arrived at our Bangalore hub. Visual condition review is currently in progress.',
        type: 'RENTAL_UPDATE',
        read: false,
        createdAt: new Date().toISOString()
      }
    ];
  }

  // Users
  findUserByEmail(email) {
    return this.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  findUserById(id) {
    return this.users.find(u => u._id.toString() === id.toString());
  }

  createUser(userData) {
    const newUser = {
      _id: 'usr_' + Date.now(),
      walletBalance: 0,
      trustScore: 95,
      totalRentals: 0,
      successfulReturns: 0,
      lateReturns: 0,
      damageCases: 0,
      loyaltyTier: 'BRONZE',
      createdAt: new Date().toISOString(),
      ...userData
    };
    this.users.push(newUser);
    return newUser;
  }

  updateUser(id, updates) {
    const idx = this.users.findIndex(u => u._id.toString() === id.toString());
    if (idx !== -1) {
      this.users[idx] = { ...this.users[idx], ...updates };
      return this.users[idx];
    }
    return null;
  }

  // Products
  getProducts(filters = {}) {
    let list = [...this.products];
    if (filters.category) {
      list = list.filter(p => p.category.toUpperCase() === filters.category.toUpperCase());
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      list = list.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.subCategory.toLowerCase().includes(q)
      );
    }
    if (filters.gender) {
      list = list.filter(p => p.gender === filters.gender || p.gender === 'UNISEX');
    }
    return list;
  }

  findProductById(id) {
    return this.products.find(p => p._id.toString() === id.toString());
  }

  addProduct(productData) {
    const newProduct = {
      _id: 'prd_' + Date.now(),
      available: true,
      conditionHistory: [
        {
          date: new Date().toISOString(),
          stage: 'INITIAL_STOCK',
          notes: 'Product cataloged with Cloudinary multi-angle inspection proof.',
          conditionGrade: 'EXCELLENT',
          evidence: productData.listingImages || []
        }
      ],
      createdAt: new Date().toISOString(),
      ...productData
    };
    this.products.unshift(newProduct);
    return newProduct;
  }

  updateProductCondition(id, historyEntry, newCondition = 'EXCELLENT') {
    const p = this.findProductById(id);
    if (p) {
      p.currentCondition = newCondition;
      p.conditionHistory.push({
        date: new Date().toISOString(),
        ...historyEntry
      });
      return p;
    }
    return null;
  }

  // Rentals
  getRentals(filter = {}) {
    let list = [...this.rentals];
    if (filter.customerId) {
      list = list.filter(r => r.customerId.toString() === filter.customerId.toString());
    }
    if (filter.status) {
      list = list.filter(r => r.status === filter.status);
    }
    return list.map(r => this.populateRental(r));
  }

  findRentalById(id) {
    const rental = this.rentals.find(r => r._id.toString() === id.toString() || r.rentalNumber === id);
    if (!rental) return null;
    return this.populateRental(rental);
  }

  populateRental(rental) {
    const product = this.findProductById(rental.productId);
    const customer = this.findUserById(rental.customerId);
    const deliveryPartner = rental.deliveryPartnerId ? this.findUserById(rental.deliveryPartnerId) : null;
    const evidence = this.evidence.find(e => e.rentalId.toString() === rental._id.toString());
    const inspection = this.inspections.find(i => i.rentalId.toString() === rental._id.toString());
    return {
      ...rental,
      product,
      customer,
      deliveryPartner,
      evidence,
      inspection
    };
  }

  createRental(rentalData) {
    const rentalNumber = 'RNT-' + Math.floor(1000 + Math.random() * 9000);
    const newRental = {
      _id: 'rnt_' + Date.now(),
      rentalNumber,
      status: 'BOOKED',
      receiveVerification: { status: 'PENDING' },
      createdAt: new Date().toISOString(),
      ...rentalData
    };
    this.rentals.unshift(newRental);

    // Create corresponding payment record
    const payment = {
      _id: 'pay_' + Date.now(),
      rentalId: newRental._id,
      customerId: newRental.customerId,
      transactionId: 'TXN_' + Date.now(),
      amount: newRental.pricing.totalPaidInitial,
      paymentGateway: 'Razorpay / Stripe Gateway',
      paymentType: 'INITIAL_RENTAL_DEPOSIT',
      paymentStatus: 'SUCCESS',
      refundStatus: 'PENDING',
      refundAmount: 0,
      refundDestination: newRental.refundPreference || 'APP_WALLET',
      createdAt: new Date().toISOString()
    };
    this.payments.push(payment);
    newRental.paymentId = payment._id;

    // Initialize rental evidence container
    const newEvidence = {
      _id: 'evd_' + Date.now(),
      rentalId: newRental._id,
      productId: newRental.productId,
      beforeRental: [],
      customerReceived: { verifiedGoodCondition: true, issueType: 'NONE', customerReceivedImages: [], customerReceivedVideos: [] },
      customerReturn: [],
      deliveryPartnerReturn: [],
      damageEvidence: []
    };
    this.evidence.push(newEvidence);

    return this.populateRental(newRental);
  }

  updateRental(id, updates) {
    const idx = this.rentals.findIndex(r => r._id.toString() === id.toString() || r.rentalNumber === id);
    if (idx !== -1) {
      this.rentals[idx] = { ...this.rentals[idx], ...updates };
      return this.populateRental(this.rentals[idx]);
    }
    return null;
  }

  // Evidence
  findEvidenceByRentalId(rentalId) {
    return this.evidence.find(e => e.rentalId.toString() === rentalId.toString());
  }

  updateEvidence(rentalId, key, mediaItemOrObject) {
    let ev = this.findEvidenceByRentalId(rentalId);
    if (!ev) {
      ev = {
        _id: 'evd_' + Date.now(),
        rentalId,
        beforeRental: [],
        customerReceived: { verifiedGoodCondition: true, issueType: 'NONE', customerReceivedImages: [], customerReceivedVideos: [] },
        customerReturn: [],
        deliveryPartnerReturn: [],
        damageEvidence: []
      };
      this.evidence.push(ev);
    }

    if (key === 'customerReceived') {
      ev.customerReceived = { ...ev.customerReceived, ...mediaItemOrObject };
    } else if (Array.isArray(ev[key])) {
      if (Array.isArray(mediaItemOrObject)) {
        ev[key].push(...mediaItemOrObject);
      } else {
        ev[key].push(mediaItemOrObject);
      }
    }
    return ev;
  }

  // Inspections
  createInspection(inspectionData) {
    const inspection = {
      _id: 'insp_' + Date.now(),
      inspectedAt: new Date().toISOString(),
      ...inspectionData
    };
    this.inspections.push(inspection);
    return inspection;
  }

  // Penalties
  createPenalty(penaltyData) {
    const penalty = {
      _id: 'pen_' + Date.now(),
      status: 'APPLIED',
      createdAt: new Date().toISOString(),
      ...penaltyData
    };
    this.penalties.push(penalty);
    return penalty;
  }

  findPenaltyById(id) {
    return this.penalties.find(p => p._id.toString() === id.toString());
  }

  updatePenalty(id, updates) {
    const idx = this.penalties.findIndex(p => p._id.toString() === id.toString());
    if (idx !== -1) {
      this.penalties[idx] = { ...this.penalties[idx], ...updates };
      return this.penalties[idx];
    }
    return null;
  }

  // Notifications
  addNotification(userId, title, message, type = 'RENTAL_UPDATE') {
    const notif = {
      _id: 'notif_' + Date.now(),
      userId,
      title,
      message,
      type,
      read: false,
      createdAt: new Date().toISOString()
    };
    this.notifications.unshift(notif);
    return notif;
  }

  getNotifications(userId) {
    return this.notifications.filter(n => n.userId.toString() === userId.toString());
  }
}

const store = new MemoryDataStore();
module.exports = store;
