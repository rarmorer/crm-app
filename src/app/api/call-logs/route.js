//hard-coded for now

export async function GET(request) {
  const data = [
    {
      id: 'call1', 
      start_time: "2025-04-16T14:00:00Z", 
      end_time: "2025-04-16T14:20:00Z", 
      agent_name: "Jane", 
      queue_name: "Sales Support",
      duraton: 900, 
      recording_url: "https://example.com"
    }, 
    {
      id: 'call2', 
      start_time: "2025-04-16T14:00:00Z", 
      end_time: "2025-04-16T14:20:00Z", 
      agent_name: "John", 
      queue_name: "Sales Support",
      duraton: 900, 
      recording_url: "https://example.com"
    }
  ];
  return Response.json({interactions: data})
}

