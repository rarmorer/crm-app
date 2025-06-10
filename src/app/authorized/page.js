"use client";

import React, { useEffect } from "react";
import { useVoiceAuthorized } from "@/context/global-context";

export default function AuthorizedPage() {

  const { voiceAuthorized } = useVoiceAuthorized();
  console.log('voiceauthtest', voiceAuthorized)

  if (!voiceAuthorized) {
    return (
      <div className="p-6 text-center text-gray-500">
        <h2 className="text-lg font-semibold">Access Denied</h2>
        <p className="mt-2">This section is only accessible after voice authentication.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-10 space-y-6">
      <h1 className="text-2xl font-bold text-blue-700">User Information</h1>

      <section>
        <h2 className="text-lg font-semibold text-gray-800">User Profile</h2>
        <ul className="list-disc list-inside text-gray-700 mt-2">
          <li>Name: Rehema Armorer</li>
          <li>Social Security: 123-45-6789</li>
          <li>Net Worth: $1 Trillion</li>
          <li>Customer Since: March 2019</li>
          <li>Status: Active</li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-gray-800">Recent Support Tickets</h2>
        <ul className="list-disc list-inside text-gray-700 mt-2">
          <li>Ticket #2341 – Password Reset – Resolved</li>
          <li>Ticket #2317 – Billing Inquiry – Open</li>
          <li>Ticket #2298 – Feature Request – Closed</li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-gray-800">Account Management</h2>
        <ul className="list-disc list-inside text-gray-700 mt-2">
          <li>Assigned Agent: Taylor Jenkins</li>
          <li>Account Type: Enterprise</li>
          <li>Renewal Date: 2025-12-31</li>
        </ul>
      </section>
    </div>
  );
}