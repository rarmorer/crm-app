import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(request) {
  // Get the session which contains the access token
  const session = await getServerSession(authOptions);
  
  if (!session || !session.accessToken) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  // Use the access token to call Zoom API
  try {
    const zoomResponse = await fetch('https://api.zoom.us/v2/phone/call_history?from=2025-04-01&to=2025-04-23', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    // Check if response is not OK before trying to parse the body
    if (!zoomResponse.ok) {
      const errorText = await zoomResponse.text();
      throw new Error(`Zoom API error: ${zoomResponse.status} - ${errorText}`);
    }

    // Only try to parse JSON if the response was OK
    const data = await zoomResponse.json();
   
    // Check if call_logs exists in the response
    if (!data.call_logs) { 
      throw new Error('Unexpected API response structure');
    }
    
    // Process and return the data
    const formatted = data.call_logs.map(log => ({
      id: log.id,
      agent_name: log.owner_name || 'N/A',
      queue_name: log.queue_name || 'N/A',
      start_time: log.start_time,
      end_time: log.end_time,
      duration: log.duration,
      recording_url: log.recording_file_path || null
    }));

    return Response.json({ interactions: formatted });
  } catch (err) {
    console.error('Zoom call logs fetch error:', err.message);
    return Response.json({ error: 'Failed to fetch call logs' }, { status: 500 });
  }
}