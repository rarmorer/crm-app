"use client"

import React, { useState, useEffect } from "react";
import { PhoneIcon } from '@heroicons/react/24/solid';


// Function to make a call using Zoom Smart Embed
export const makeCall = (phoneNumber, callerId) => {
  const iframe = document.querySelector('iframe#zoom-embeddable-phone-iframe');
  if (iframe && iframe.contentWindow) {
    const message = {
      type: 'zp-make-call',
      data: {
        number: phoneNumber, // The phone number you want to dial
        callerId: callerId, // The caller ID (optional)
        autoDial: true // Whether to dial automatically, default is true
      }
    };
    // Send the message to the iframe
    iframe.contentWindow.postMessage(message, 'https://applications.zoom.us');
  } else {
    console.error('Iframe or contentWindow not ready. Cannot make call.');
  }
};

const Accounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, isLoading] = useState(true);

  useEffect(() => {
    const getAccounts = async () => {
      try {
        const res = await fetch('/api/accounts');
        const data = await res.json();
        setAccounts(data.accounts || []);
        console.log(accounts)
      } catch(err) {
        console.error('failed to fetch accounts', err);
      } finally {
        isLoading(false);
      }
    }
    getAccounts();
  }, []);
  
  if (loading) { 
    return <p className="text-center text-gray-500">Loading Accounts...</p>
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <h2 className="text-lg font-semibold mb-4">Accounts</h2>
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white border border-gray-200 text-sm text-left rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs tracking-wider">
            <tr>
              <th className="px-4 py-3 border-b">ID</th>
              <th className="px-4 py-3 border-b">Name</th>
              <th className="px-4 py-3 border-b">Email</th>
              <th className="px-4 py-3 border-b">Phone Number</th>
              <th className="px-4 py-3 border-b">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
  {accounts.map((account) => (
    <tr key={account.id} className="hover:bg-gray-50 transition-colors">
      <td className="px-4 py-3 border-b">{account.id}</td>
      <td className="px-4 py-3 border-b font-medium">{account.name}</td>
      <td className="px-4 py-3 border-b text-gray-500">{account.email}</td>
      <td
        className="px-4 py-3 border-b text-gray-500 cursor-pointer hover:text-blue-500 transition"
        onClick={() => makeCall(account.phoneNumber)}
      >
        {account.phoneNumber}
      </td>
      <td className="px-4 py-3 border-b">
        <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${account.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {account.status}
        </span>
      </td>
    </tr>
  ))}
</tbody>

        </table>
      </div>
    </div>
  );
}

export default Accounts;
