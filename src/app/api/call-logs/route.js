export async function GET(request) {
  // Replace with your actual token (ideally, use environment variables)
  const ZOOM_ACCESS_TOKEN = "eyJzdiI6IjAwMDAwMiIsImFsZyI6IkhTNTEyIiwidiI6IjIuMCIsImtpZCI6IjE5YzM1YWFjLTk5ZmItNGU4OC1iYmJlLWU2ZmQ4NmYyODlkOCJ9.eyJhdWQiOiJodHRwczovL29hdXRoLnpvb20udXMiLCJ1aWQiOiI2R3RkaGVaUVNxLWwySmxGVzZ2TEZ3IiwidmVyIjoxMCwiYXVpZCI6IjkxZDFmN2U4YTMwODc1ZGI0NTQzZjE5MWM2ZTM3NWRjOGUyMjg5NjI2MjJiNTZkNmQ3MDY0NzEyMzJlMGQ4ZDYiLCJuYmYiOjE3NDQ5MDQxMTQsImNvZGUiOiI1YmxVWnBRZFNJQ1VuUlRQeDdHWUhBRnFGVmJKYWU3am8iLCJpc3MiOiJ6bTpjaWQ6UnFUcGFiV3pRUXl0VmxWc1VKSDY2dyIsImdubyI6MCwiZXhwIjoxNzQ0OTA3NzE0LCJ0eXBlIjozLCJpYXQiOjE3NDQ5MDQxMTQsImFpZCI6ImxLaGtWSWpOU3V5bGhDUkhzN25aencifQ.xO6C7P_kORSwFANe44Ycd8kD60BL4BT255qd4aFokv9VwyOYFDwbBkUbl7ixcs_6UIJ1AqjaWc1dCkM6xGTjlA"

  try {
    const response = await fetch('https://api.zoom.us/v2/phone/call_history?from=2025-03-01&to=2025-03-31', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${ZOOM_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Zoom API error: ${response.status} - ${errText}`);
    }

    const data = await response.json();
    
    // Example: structure the data to match your frontend expectations
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
