

import React, { useState, useEffect } from "react";

const CallDetailsModal = ({ callId, onClose }) => {
  const [callDetails, setCallDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedSegments, setExpandedSegments] = useState({});

  useEffect(() => {
    const fetchCallDetails = async () => {
      try {
        setLoading(true);
        console.log(`Fetching call details for ID: ${callId}`);
        
        const res = await fetch(`/api/calls/${callId}`);
        console.log(`Response status: ${res.status}`);
        
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          console.error("Error response:", errorData);
          throw new Error(`Failed to fetch call details: ${res.status} ${errorData.error || ''}`);
        }
        
        const data = await res.json();
        console.log("Call details data:", data);
        setCallDetails(data);
      } catch (err) {
        console.error("Error fetching call details:", err);
        setError(err.message || "Failed to fetch call details");
      } finally {
        setLoading(false);
      }
    };

    if (callId) {
      fetchCallDetails();
    }
  }, [callId]);

  const toggleSegmentExpansion = (index) => {
    setExpandedSegments(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  if (!callId) return null;
  // Format phone number for display
  const formatPhoneNumber = (phoneNumber) => {
    return phoneNumber || 'N/A';
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString();
  };

  // Calculate duration in minutes and seconds
  const calculateDuration = (startTime, endTime) => {
    if (!startTime || !endTime) return 'N/A';
    
    const start = new Date(startTime);
    const end = new Date(endTime);
    const durationInSeconds = Math.floor((end - start) / 1000);
    
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = durationInSeconds % 60;
    
    return `${minutes} min ${seconds} sec`;
  };

  return (
    <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50">
      {/* Modal content */}
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 max-h-[80vh] flex flex-col">
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-800">Call Details</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
    
        <div className="px-6 py-4 overflow-y-auto flex-grow">
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="text-red-500 py-4">{error}</div>
          ) : callDetails ? (
            <ul className="space-y-4 text-sm">
              <li className="flex justify-between">
                <span className="font-medium text-gray-600">Call ID:</span>
                <span className="text-gray-800">{callDetails.id || callDetails.call_id || 'N/A'}</span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium text-gray-600">Direction:</span>
                <span className="text-gray-800 capitalize">{callDetails.direction || 'N/A'}</span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium text-gray-600">Call Type:</span>
                <span className="text-gray-800 capitalize">{callDetails.call_type || 'N/A'}</span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium text-gray-600">Start Time:</span>
                <span className="text-gray-800">{formatDate(callDetails.start_time)}</span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium text-gray-600">Answer Time:</span>
                <span className="text-gray-800">{formatDate(callDetails.answer_time)}</span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium text-gray-600">End Time:</span>
                <span className="text-gray-800">{formatDate(callDetails.end_time)}</span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium text-gray-600">Duration:</span>
                <span className="text-gray-800">{calculateDuration(callDetails.start_time, callDetails.end_time)}</span>
              </li>
          
              <li className="pt-2">
                <span className="font-medium text-gray-600 block mb-2">Caller Information:</span>
                <div className="pl-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Name:</span>
                    <span className="text-gray-800">{callDetails.caller_name || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Number:</span>
                    <span className="text-gray-800">{formatPhoneNumber(callDetails.caller_did_number)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Extension:</span>
                    <span className="text-gray-800">{callDetails.caller_ext_number || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Email:</span>
                    <span className="text-gray-800">{callDetails.caller_email || 'N/A'}</span>
                  </div>
                </div>
              </li>
          
              <li className="pt-2">
                <span className="font-medium text-gray-600 block mb-2">Callee Information:</span>
                <div className="pl-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Name:</span>
                    <span className="text-gray-800">{callDetails.callee_name || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Number:</span>
                    <span className="text-gray-800">{formatPhoneNumber(callDetails.callee_did_number)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Extension:</span>
                    <span className="text-gray-800">{callDetails.callee_ext_number || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Email:</span>
                    <span className="text-gray-800">{callDetails.callee_email || 'N/A'}</span>
                  </div>
                </div>
              </li>
          
              <li className="pt-2">
                <span className="font-medium text-gray-600 block mb-2">Additional Information:</span>
                <div className="pl-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Department:</span>
                    <span className="text-gray-800">{callDetails.department || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Site:</span>
                    <span className="text-gray-800">{callDetails.site_name || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Cost Center:</span>
                    <span className="text-gray-800">{callDetails.cost_center || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Connect Type:</span>
                    <span className="text-gray-800 capitalize">{callDetails.connect_type || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">International:</span>
                    <span className="text-gray-800">{callDetails.international ? 'Yes' : 'No'}</span>
                  </div>
                </div>
              </li>
              {callDetails.call_path && callDetails.call_path.length > 0 && (
                <li className="pt-2">
                  <span className="font-medium text-gray-600 block mb-2">Call Path:</span>
                  <div className="pl-4 space-y-4">
                    {callDetails.call_path.map((segment, index) => (
                      <div key={index} className="border-l-2 border-gray-200 pl-3">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-gray-700">Segment {segment.segment || index + 1}</span>
                          <button 
                            onClick={() => toggleSegmentExpansion(index)}
                            className="text-blue-500 hover:text-blue-700 text-xs"
                          >
                            {expandedSegments[index] ? 'Show Less' : 'Show More'}
                          </button>
                        </div>
                    
                        <div className="space-y-1 mt-1">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Event:</span>
                            <span className="text-gray-800 capitalize">{segment.event || 'N/A'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Result:</span>
                            <span className="text-gray-800 capitalize">{segment.result || 'N/A'}</span>
                          </div>
                          {segment.result_reason && (
                            <div className="flex justify-between">
                              <span className="text-gray-500">Reason:</span>
                              <span className="text-gray-800 capitalize">{segment.result_reason.replace(/_/g, ' ') || 'N/A'}</span>
                            </div>
                          )}
                      
                          {expandedSegments[index] && (
                            <div className="mt-2 space-y-2 bg-gray-50 p-2 rounded">
                              {/* Timing Information */}
                              <div className="space-y-1">
                                <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs">
                                  <div className="text-gray-500">Start:</div>
                                  <div className="text-gray-800">{formatDate(segment.start_time)}</div>
                              
                                  {segment.answer_time && (
                                    <>
                                      <div className="text-gray-500">Answer:</div>
                                      <div className="text-gray-800">{formatDate(segment.answer_time)}</div>
                                    </>
                                  )}
                              
                                  <div className="text-gray-500">End:</div>
                                  <div className="text-gray-800">{formatDate(segment.end_time)}</div>
                              
                                  {segment.waiting_time > 0 && (
                                    <>
                                      <div className="text-gray-500">Wait Time:</div>
                                      <div className="text-gray-800">{segment.waiting_time} sec</div>
                                    </>
                                  )}
                              
                                  {segment.hold_time > 0 && (
                                    <>
                                      <div className="text-gray-500">Hold Time:</div>
                                      <div className="text-gray-800">{segment.hold_time} sec</div>
                                    </>
                                  )}
                                </div>
                              </div>
                          
                              {/* Caller Details */}
                              {(segment.caller_name || segment.caller_ext_number || segment.caller_did_number) && (
                                <div className="space-y-1">
                                  <div className="text-xs font-medium text-gray-600">Caller:</div>
                                  <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs">
                                    {segment.caller_name && (
                                      <>
                                        <div className="text-gray-500">Name:</div>
                                        <div className="text-gray-800">{segment.caller_name}</div>
                                      </>
                                    )}
                                
                                    {segment.caller_ext_number && (
                                      <>
                                        <div className="text-gray-500">Extension:</div>
                                        <div className="text-gray-800">{segment.caller_ext_number}</div>
                                      </>
                                    )}
                                
                                    {segment.caller_did_number && (
                                      <>
                                        <div className="text-gray-500">Number:</div>
                                        <div className="text-gray-800">{formatPhoneNumber(segment.caller_did_number)}</div>
                                      </>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </li>
              )}
          
              {callDetails.call_path && callDetails.call_path.some(segment => segment.recording_id) && (
                <li className="pt-2">
                  <span className="font-medium text-gray-600 block mb-2">Recording:</span>
                  <audio controls className="w-full">
                    <source src={`/api/calls/${callId}/recording`} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </li>
              )}
            </ul>
          ) : (
            <p className="text-gray-500">No call details found.</p>
          )}
        </div>
    
        <div className="border-t px-6 py-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>

  );
          };
          export default CallDetailsModal;
