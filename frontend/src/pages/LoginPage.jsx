import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sparkles, ShieldCheck, ArrowRight, Lock, Mail, User } from 'lucide-react';

export default function LoginPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const { login, register, switchRole } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      if (isRegister) {
        await register({ name, email, password });
      } else {
        await login(email, password);
      }
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed. Please check credentials.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleTestLogin = async (role) => {
    await switchRole(role);
    if (role === 'ADMIN') {
      navigate('/admin');
    } else if (role === 'DELIVERY_PARTNER') {
      navigate('/delivery');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden p-8 space-y-6">
        <div className="text-center space-y-1">
          <div className="w-12 h-12 rounded-full bg-luxury-black text-luxury-gold flex items-center justify-center font-serif text-2xl font-bold mx-auto mb-2 border border-luxury-gold/40 shadow-inner">
            C
          </div>
          <h2 className="font-serif text-2xl font-bold text-gray-950">
            {isRegister ? 'Create Couture Account' : 'Welcome Back'}
          </h2>
          <p className="text-xs text-gray-500">
            {isRegister ? 'Sign up to rent designer wardrobes at 20% of retail.' : 'Log in to manage your active rentals and security deposit refunds.'}
          </p>
        </div>

        {/* 1-Click Fast Persona Switcher (For Demo & Hackathon evaluation) */}
        <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 text-xs space-y-2">
          <div className="flex items-center space-x-1.5 text-luxury-goldDark font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>1-Click Hackathon Test Logins:</span>
          </div>
          <div className="grid grid-cols-3 gap-2 pt-1">
            <button
              onClick={() => handleTestLogin('CUSTOMER')}
              className="bg-white hover:bg-gray-50 border border-gray-200 text-gray-800 font-semibold py-1.5 px-2 rounded-lg text-center transition"
            >
              👤 Customer
            </button>
            <button
              onClick={() => handleTestLogin('DELIVERY_PARTNER')}
              className="bg-white hover:bg-gray-50 border border-gray-200 text-gray-800 font-semibold py-1.5 px-2 rounded-lg text-center transition"
            >
              🚚 Delivery
            </button>
            <button
              onClick={() => handleTestLogin('ADMIN')}
              className="bg-white hover:bg-gray-50 border border-gray-200 text-gray-800 font-semibold py-1.5 px-2 rounded-lg text-center transition"
            >
              👑 Admin
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 p-3 rounded-xl text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {isRegister && (
            <div>
              <label className="font-semibold text-gray-700 block mb-1">Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ananya Sharma"
                  className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-luxury-gold/50 focus:outline-none"
                />
                <User className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
              </div>
            </div>
          )}

          <div>
            <label className="font-semibold text-gray-700 block mb-1">Email Address</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-luxury-gold/50 focus:outline-none"
              />
              <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            </div>
          </div>

          <div>
            <label className="font-semibold text-gray-700 block mb-1">Password</label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-luxury-gold/50 focus:outline-none"
              />
              <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-luxury-black text-white hover:bg-luxury-gold hover:text-black py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition shadow-md flex items-center justify-center space-x-1"
          >
            <span>{isRegister ? 'Create Account' : 'Sign In'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        <div className="text-center pt-2 border-t border-gray-100">
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-xs text-luxury-goldDark font-semibold hover:underline"
          >
            {isRegister ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
}
