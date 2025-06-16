"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { useCall } from "@/context/global-context";
import CallDetailsModal from "@/components/CallDetailsModal"; // Import the existing component

const CallLogs = () => {
  const { calls } = useCall();
  const [logs] = useState([
    {
      id: 'call-001',
      direction: 'Inbound',
      connect_type: 'Direct',
      start_time: '2025-06-10T14:30:00Z',
      end_time: '2025-06-10T14:45:00Z',
      duration: 900,
      recording_status: 'Completed'
    },
    {
      id: 'call-002',
      direction: 'Outbound',
      connect_type: 'Transfer',
      start_time: '2025-06-11T09:15:00Z',
      end_time: '2025-06-11T09:30:00Z',
      duration: 900,
      recording_status: 'In Progress'
    },
    {
      id: 'call-003',
      direction: 'Inbound',
      connect_type: 'IVR',
      start_time: '2025-06-12T16:00:00Z',
      end_time: '2025-06-12T16:22:00Z',
      duration: 1320,
      recording_status: 'Failed'
    }
  ]);
  const [selectedCallId, setSelectedCallId] = useState(null); // Add state for selected call ID

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

      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white border border-gray-200 text-sm text-left rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs tracking-wider">
            <tr>
              <th className="px-4 py-3 border-b">Call ID</th>
              <th className="px-4 py-3 border-b">Direction</th>
              <th className="px-4 py-3 border-b">Connect type</th>
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
                <td className="px-4 py-3 border-b">{log.direction}</td>
                <td className="px-4 py-3 border-b">{log.connect_type}</td>
                <td className="px-4 py-3 border-b">{log.start_time ? format(new Date(log.start_time), "yyyy-MM-dd HH:mm:ss") : 'N/A'}</td>
                <td className="px-4 py-3 border-b">{log.end_time ? format(new Date(log.end_time), "yyyy-MM-dd HH:mm:ss") : 'N/A'}</td>
                <td className="px-4 py-3 border-b">{Math.floor(log.duration / 60)} min</td>
                <td className="px-4 py-3 border-b">{log.recording_status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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