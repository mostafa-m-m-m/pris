// components/Pricing.tsx
"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Package {
  id: number;
  name: string;
  basePrice: number;
  annualPrice: number;
  monthlyPrice: number;
  currency: string;
}

const Pricing: React.FC = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [currency, setCurrency] = useState<string>('USD');
  const [billingType, setBillingType] = useState<'monthly' | 'annual'>('monthly');

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get('/api/packages');
        setPackages(response.data);
      } catch (error) {
        console.error('Error fetching packages:', error);
      }
    };

    fetchPackages();
  }, []);

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrency(e.target.value);
  };

  const handleBillingTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBillingType(e.target.value as 'monthly' | 'annual');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Our Pricing Plans</h1>
        <p className="text-lg text-gray-600">Choose a plan that best suits your needs.</p>
      </header>

      <div className="flex justify-center mb-8">
        <div className="mr-4">
          <label htmlFor="currency" className="block text-sm font-medium text-gray-700">Currency:</label>
          <select
            id="currency"
            value={currency}
            onChange={handleCurrencyChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
          </select>
        </div>
        <div>
          <fieldset className="flex items-center">
            <legend className="sr-only">Billing Type</legend>
            <div className="flex items-center mr-4">
              <input
                type="radio"
                id="monthly"
                name="billingType"
                value="monthly"
                checked={billingType === 'monthly'}
                onChange={handleBillingTypeChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <label htmlFor="monthly" className="ml-2 block text-sm text-gray-700">Monthly</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="annual"
                name="billingType"
                value="annual"
                checked={billingType === 'annual'}
                onChange={handleBillingTypeChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <label htmlFor="annual" className="ml-2 block text-sm text-gray-700">Annual</label>
            </div>
          </fieldset>
        </div>
      </div>

      <div className="flex flex-wrap -mx-4">
        {packages.map(pkg => (
          <div key={pkg.id} className="w-full md:w-1/3 px-4 mb-8">
            <div className="bg-white shadow-lg rounded-lg p-6 text-center border border-gray-200">
              <h2 className="text-2xl font-semibold mb-2">{pkg.name}</h2>
              <p className="text-lg text-gray-800 mb-4">
                {billingType === 'monthly' ? pkg.monthlyPrice : pkg.annualPrice} {currency}
              </p>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                Get Started
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
