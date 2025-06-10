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
        autoDial: true 
      }
    };
    // Send the message to the iframe
    iframe.contentWindow.postMessage(message, 'https://applications.zoom.us');
  } else {
    console.error('Iframe or contentWindow not ready. Cannot make call.');
  }
};

const Accounts = () => {
  // const [accounts, setAccounts] = useState([]);
  // const [loading, isLoading] = useState(true);
  //
  // useEffect(() => {
  //   const getAccounts = async () => {
  //     try {
  //       const res = await fetch('/api/accounts');
  //       const data = await res.json();
  //       setAccounts(data.accounts || []);
  //     } catch(err) {
  //       console.error('failed to fetch accounts', err);
  //     } finally {
  //       isLoading(false);
  //     }
  //   }
  //   getAccounts();
  // }, []);
  //
  // if (loading) { 
  //   return <p className="text-center text-gray-500">Loading Accounts...</p>
  // }

  const accounts = [
    {
      id: '1',
      name: 'Rehema Armorer',
      email: 'rehema@example.com',
      phoneNumber: '+15551234567',
      status: 'Active',
    },
    {
      id: '2',
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      phoneNumber: '+15559876543',
      status: 'Inactive',
    }
  ];

  const [isRecording, setIsRecording] = useState(false);
  const [recorder, setRecorder] = useState(null);
  const [recordingUserId, setRecordingUserId] = useState(null);
  const [recordedUsers, setRecordedUsers] = useState([]);

  useEffect(() => {
    const sample = localStorage.getItem("Rehema Voice Sample");
    if (sample) {
      setRecordedUsers(["1"]);
    }
  }, []);

  const recordVoiceSample = async (userId) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const newRecorder = new MediaRecorder(stream);
      const chunks = [];

      newRecorder.ondataavailable = e => chunks.push(e.data);
      newRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64data = reader.result.split(",")[1]; // Strip the prefix
          localStorage.setItem("Rehema Voice Sample", base64data);
          setRecordedUsers(prev => [...new Set([...prev, userId])]);
          alert('Voice sample saved!');
        };
        reader.readAsDataURL(blob);
        return;
      };

      setRecorder(newRecorder);
      setRecordingUserId(userId);
      setIsRecording(true);
      newRecorder.start();
    } catch (err) {
      console.error('Failed to record voice:', err);
      alert('Microphone access is required to record your voice.');
    }
  };

  const stopRecording = () => {
    if (recorder) {
      recorder.stop();
      recorder.stream.getTracks().forEach(track => track.stop());
    }
    setIsRecording(false);
    setRecorder(null);
    setRecordingUserId(null);
  };

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
              <th className="px-4 py-3 border-b">Passphrase</th>
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
      <td className="px-4 py-3 border-b">
        {recordedUsers.includes(account.id) ? (
          <button
            className="text-green-600 hover:underline text-sm"
            onClick={() => {
              const audioBase64 = localStorage.getItem('Rehema Voice Sample');
              if (audioBase64) {
                const audioUrl = `data:audio/webm;base64,${audioBase64}`;
                new Audio(audioUrl).play();
              }
            }}
          >
            View Passphrase
          </button>
        ) : (
          <button
            className="text-blue-600 hover:underline text-sm"
            onClick={() => recordVoiceSample(account.id)}
          >
            Create/Edit Passphrase
          </button>
        )}
      </td>
    </tr>
  ))}
</tbody>

        </table>
      </div>
      {isRecording && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="mb-4 font-medium text-gray-700">🎤 Recording in progress...</p>
            <div className="flex justify-center space-x-1 mb-4">
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 bg-blue-500 animate-pulse"
                  style={{ height: `${Math.random() * 30 + 10}px`, animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              onClick={stopRecording}
            >
              Stop Recording
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Accounts;
