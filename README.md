# 👑 COUTURE RENTALS — Full-Stack Cloudinary-Powered Fashion Rental Platform

> **A luxury e-commerce fashion rental platform for clothes, shoes, and accessories (inspired by Myntra & Rent The Runway) featuring deep Cloudinary media integration for product listing, pre-dispatch condition proofs, customer delivery verification, pickup evidence, and side-by-side visual inspection.**

---

## 🌟 The Core Innovation: Cloudinary Visual Condition Lifecycle

In traditional rental platforms, damage disputes arise because there is no verified visual proof of garment condition between parties.

**COUTURE RENTALS** turns Cloudinary into the single immutable source of truth throughout the rental journey:

```text
    ADMIN DISPATCH                 DELIVERY                   CUSTOMER RECEIVE
 ┌──────────────────┐        ┌──────────────────┐        ┌─────────────────────────┐
 │ Cloudinary Proof │ ────►  │ Delivery Handover│ ────►  │ "Good condition?"       │
 │ Front, Back, Left│        │ Sealed bag check │        │ Defect photo/video proof│
 │ Right, Close-up  │        └──────────────────┘        │ 7-Day Defective Policy  │
 └──────────────────┘                                    └────────────┬────────────┘
                                                                      │
 ┌────────────────────────────────────────────────────────────────────┘
 │
 ▼
CUSTOMER RETURN                   DELIVERY PICKUP            ADMIN INSPECTION STUDIO
 ┌──────────────────┐        ┌──────────────────┐        ┌─────────────────────────┐
 │ Upload Return    │ ────►  │ Partner captures │ ────►  │ Side-by-Side Comparison │
 │ Photos to        │        │ collection proof │        │ BEFORE vs AFTER return  │
 │ Cloudinary       │        │ (No penalty rights)       │ Admin evaluates penalty │
 └──────────────────┘        └──────────────────┘        └────────────┬────────────┘
                                                                      │
                                                                      ▼
                                                          SECURITY DEPOSIT REFUND
                                                         ┌─────────────────────────┐
                                                         │ 30% Deposit Settled     │
                                                         │ - Deduct late/damage fee│
                                                         │ ➔ App Wallet (Instant)  │
                                                         │ ➔ Original Source (Card)│
                                                         └─────────────────────────┘
```

---

## 💎 Transparent Business & Pricing Model

For every luxury garment or accessory on the platform:

```text
Actual Retail Price (MRP) = 100%
Rental Price              = 20% of retail price
Security Deposit          = 30% of retail price (100% Refundable)
Customer Initial Payment  = Rental Price + Security Deposit (50% of retail)
```

### Numerical Example:
- **Actual Price**: ₹1,000
- **Rental Price (20%)**: ₹200
- **Security Deposit (30%)**: ₹300
- **Customer Initially Pays**: ₹500

### Refund Scenarios:
1. **Clean Return on Time**:
   - `Refund = ₹300` (Customer pays only ₹200 rental cost)
2. **Late Return (3 days late)**:
   - `Late Fee = 1,000 × 0.02 × 3 days = ₹60`
   - `Refund = ₹300 - ₹60 = ₹240`
3. **Minor Damage (Stain confirmed by Admin Inspection)**:
   - `Damage Fee = ₹100`
   - `Refund = ₹300 - ₹100 = ₹200`

### Refund Preference UI
Customers can select their preferred refund destination at checkout or anytime before inspection:
- **App Wallet**: Instant credit, reusable for the next luxury rental.
- **Original Payment Method**: Processed back to credit card / bank source.

---

## 🚀 Key Features

### 1. Multi-Angle Cloudinary Product Listings
Admin captures and stores 5 verified angles for every garment:
- **Front View**
- **Back View**
- **Side Silhouette**
- **Fabric / Zari Close-up Macro**
- **Brand Tag / Authenticity Hologram**

MongoDB records: `publicId`, `secureUrl`, `resourceType`, `format`, `width`, `height`.

### 2. Side-by-Side Visual Inspection Studio
Admin compares the official **Before Rental** dispatch photograph directly against the **After Return** photograph side-by-side with interactive magnifier zoom. Admin grades condition:
- `No Damage`
- `Minor Damage`
- `Major Damage`

### 3. Customer Receive Verification & 7-Day Defective Policy
Upon delivery, the customer is asked:
> *"Did you receive the product in good condition?"*
- `✓ Received correctly`
- `⚠ Product damaged`
- `⚠ Product defective`
- `⚠ Wrong product`
- `⚠ Missing accessory`

If defective, the customer uploads photo or video evidence directly to Cloudinary (e.g., stuck zipper motion proof).

### 4. Product Condition Timeline
Every garment has a visual condition history showcasing its lifetime journey with Cloudinary photo timestamps:
- *Jan 10*: Added to stock — Condition: Excellent
- *Jan 17*: Rented to Customer A
- *Jan 20*: Returned — Minor oil droplet noted
- *Jan 25*: Dry-cleaned with heritage solvent — Restored to ready inventory

### 5. Customer Trust Score & Loyalty Perks
- Tracks rentals, clean returns, late returns, and damage cases.
- Trust Score $\ge 90$: ⭐ **Trusted Renter** badge (unlocks 20% security deposit rate instead of 30%).
- Loyalty Tiers:
  - **Bronze**: 0 rentals
  - **Silver**: 5+ clean rentals $\rightarrow$ 5% discount
  - **Gold**: 10+ clean rentals $\rightarrow$ 10% discount
  - **Platinum**: 20+ clean rentals $\rightarrow$ 15% discount + VIP priority

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose (with high-resilience in-memory datastore fallback)
- **Media Engine**: Cloudinary SDK v2
- **Authentication**: JWT, bcrypt, Role-Based Access Control (`CUSTOMER`, `DELIVERY_PARTNER`, `ADMIN`)
- **Frontend**: React 18, React Router v6, Tailwind CSS, Lucide React, Vite

---

## ⚡ Quick Start Instructions

### 1. Start the Backend API Server

```bash
cd backend
npm install
npm start
```
The backend will launch on `http://localhost:5001`.

### 2. Start the Frontend Application

```bash
cd frontend
npm install
npm run dev
```
Open your browser at `http://localhost:3000`.

### 3. One-Click Hackathon Persona Switcher
For seamless hackathon evaluation, click the **Hackathon Role Switcher** in the top black banner of the website to test each view instantly:
- **Customer Persona (Ananya)**: Browse catalog, book rental, verify receipt, request return, track wallet & trust score.
- **Delivery Partner Persona (Vikram)**: View assigned return collections, upload pickup condition proof.
- **Admin Persona (Pooja)**: Review pending visual inspections side-by-side, determine penalties, approve refunds, add products.

---

## 🧪 Automated Test Suite

Run the built-in 24-point automated test suite:

```bash
node backend/test-suite.js
```
Expected output: `RESULTS: 24 Passed, 0 Failed`.
