"use client";

import React, { useState, useEffect } from "react";
import { formatISO } from "date-fns";

const CallLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const fetchLogs = async (from, to) => {
    setLoading(true);
    try {
      let url = '/api/call-logs';
      if (from && to) {
        url += `?from=${from}&to=${to}`;
      }

      const res = await fetch(url);
      const data = await res.json();

      setLogs(data.interactions || []);
    } catch (err) {
      console.error("Failed to fetch call logs", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = () => {
    if (fromDate && toDate) {
      fetchLogs(fromDate, toDate);
    }
  };

  useEffect(() => {
    const today = formatISO(new Date(), { representation: "date" });
    fetchLogs(today, today); // Load today’s logs on mount
  }, []);

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
        <button
          onClick={handleFilter}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Filter
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading Call Logs...</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full bg-white border border-gray-200 text-sm text-left rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs tracking-wider">
              <tr>
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
                <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 border-b">{log.agent_name}</td>
                  <td className="px-4 py-3 border-b">{log.queue_name}</td>
                  <td className="px-4 py-3 border-b">{new Date(log.start_time).toLocaleString()}</td>
                  <td className="px-4 py-3 border-b">{new Date(log.end_time).toLocaleString()}</td>
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
    </div>
  );
};

export default CallLogs;
