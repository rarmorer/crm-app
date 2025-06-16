"use client"
import React, {useState, useEffect} from "react";
import { isToday } from "date-fns";
import { useCall } from "@/context/global-context";

const Calls = () => {
  const [logs, setLogs] = useState([]);
  const {calls} = useCall();
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const todayLogs = calls.filter(log => {
      const startTime = new Date(log.start_time);
      return isToday(startTime);
    });

    setLogs(todayLogs);
    setLoading(false);
  }, []);
  
  if (loading) { 
    return <p className="text-center text-gray-500">Loading call logs...</p>
  }

  
  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4 min-w-0">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Daily Call Logs</h2>
      <table className="text-sm text-left text-gray-600">
        <thead className="bg-gray-100 text-xs uppercase text-gray-500">
          <tr>
            <th className="px-4 py-2">Agent</th>
            <th className="px-4 py-2">Queue</th>
            <th className="px-4 py-2">Start Time</th>
            <th className="px-4 py-2">End Time</th>
            <th className="px-4 py-2">Duration</th>
            <th className="px-4 py-2">Recording</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2">{log.agent_name}</td>
              <td className="px-4 py-2">{log.queue_name}</td>
              <td className="px-4 py-2">{new Date(log.start_time).toLocaleString()}</td>
              <td className="px-4 py-2">{new Date(log.end_time).toLocaleString()}</td>
              <td className="px-4 py-2">{Math.floor(log.duration / 60)} min</td>
              <td className="px-4 py-2"> 
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
  );
};

export default Calls;
