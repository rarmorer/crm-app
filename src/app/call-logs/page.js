"use client";

import React, { useState, useEffect } from "react";
import { formatISO, format } from "date-fns";
import { useCall } from "@/context/global-context";
import CallDetailsModal from "@/components/CallDetailsModal"; // Import the existing component

// Hardcoded call data
const calls = [
  {
    id: 'abc123',
    agent_name: 'Jane Doe',
    queue_name: 'Support',
    start_time: '2025-06-08T10:00:00Z',
    end_time: '2025-06-08T10:15:00Z',
    duration: 900,
    recording_url: 'https://example.com/recording1.mp3',
  },
  {
    id: 'def456',
    agent_name: 'John Smith',
    queue_name: 'Sales',
    start_time: '2025-06-08T11:00:00Z',
    end_time: '2025-06-08T11:05:00Z',
    duration: 300,
    recording_url: null,
  },
];

const CallLogs = () => {
  // const { calls } = useCall();
  const [logs, setLogs] = useState(calls);
  const [loading, setLoading] = useState(false);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [selectedCallId, setSelectedCallId] = useState(null); // Add state for selected call ID

  // const handleFilter = async () => {
  //   if (fromDate && toDate) {
  //     setLoading(true);
  //     try {
  //       const res = await fetch(`/api/call-logs?from=${fromDate}&to=${toDate}`);
  //       const data = await res.json();
  //       setLogs(data.interactions || []);
  //     } catch (err) {
  //       console.error("Failed to fetch filtered logs", err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   const fetchInitialLogs = async () => {
  //     setLoading(true);
  //     try {
  //       const res = await fetch('/api/call-logs');
  //       const data = await res.json();
  //       setLogs(data.interactions || []);
  //     } catch (err) {
  //       console.error("Failed to load initial logs", err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchInitialLogs();
  // }, []);

  // Add handlers for opening and closing the modal
  const handleCallClick = (callId) => {
    setSelectedCallId(callId);
  };

  const handleCloseModal = () => {
    setSelectedCallId(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <h2 className="text-lg font-semibold mb-4">Call Logs</h2>

      <div className="mb-4 flex gap-4 items-end">
        <div>
          <label className="block text-sm text-gray-600">From:</label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="border px-2 py-1 rounded"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600">To:</label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="border px-2 py-1 rounded"
          />
        </div>
        {/* <button
          onClick={handleFilter}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Filter
        </button> */}
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading Call Logs...</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full bg-white border border-gray-200 text-sm text-left rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs tracking-wider">
              <tr>
                <th className="px-4 py-3 border-b">Call ID</th>
                <th className="px-4 py-3 border-b">Agent</th>
                <th className="px-4 py-3 border-b">Queue</th>
                <th className="px-4 py-3 border-b">Start Time</th>
                <th className="px-4 py-3 border-b">End Time</th>
                <th className="px-4 py-3 border-b">Duration</th>
                <th className="px-4 py-3 border-b">Recording</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {logs.map((log) => (
                <tr key={log.id || `${log.agent_name}-${log.start_time}`} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 border-b">
                    <button 
                      onClick={() => handleCallClick(log.id)}
                      className="text-blue-600 hover:text-blue-800 hover:underline focus:outline-none"
                    >
                      {log.id}
                    </button>
                  </td>
                  <td className="px-4 py-3 border-b">{log.agent_name}</td>
                  <td className="px-4 py-3 border-b">{log.queue_name}</td>
                  <td className="px-4 py-3 border-b">{log.start_time ? format(new Date(log.start_time), "yyyy-MM-dd HH:mm:ss") : 'N/A'}</td>
                  <td className="px-4 py-3 border-b">{log.end_time ? format(new Date(log.end_time), "yyyy-MM-dd HH:mm:ss") : 'N/A'}</td>
                  <td className="px-4 py-3 border-b">{Math.floor(log.duration / 60)} min</td>
                  <td className="px-4 py-3 border-b">
                    {log.recording_url ? (
                      <a
                        href={log.recording_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        Listen
                      </a>
                    ) : ('N/A')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Render the modal when a call ID is selected */}
      {selectedCallId && (
        <CallDetailsModal 
          callId={selectedCallId} 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
};

export default CallLogs;