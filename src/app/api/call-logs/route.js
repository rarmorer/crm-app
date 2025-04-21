export async function GET(request) {
  // Replace with your actual token (ideally, use environment variables)
  const ZOOM_ACCESS_TOKEN = "eyJzdiI6IjAwMDAwMiIsImFsZyI6IkhTNTEyIiwidiI6IjIuMCIsImtpZCI6IjZiZTMwZTUzLTI0ZDktNGM0Ny05MWQzLTlmZGEwYjE0ZjY1MCJ9.eyJhdWQiOiJodHRwczovL29hdXRoLnpvb20udXMiLCJ1aWQiOiI2R3RkaGVaUVNxLWwySmxGVzZ2TEZ3IiwidmVyIjoxMCwiYXVpZCI6IjkxZDFmN2U4YTMwODc1ZGI0NTQzZjE5MWM2ZTM3NWRjOGUyMjg5NjI2MjJiNTZkNmQ3MDY0NzEyMzJlMGQ4ZDYiLCJuYmYiOjE3NDQ5OTAwODYsImNvZGUiOiJHcjNQaGFoVFIzdTlJQUdRUW16RE5naWw2a2lLcm1HMjAiLCJpc3MiOiJ6bTpjaWQ6UnFUcGFiV3pRUXl0VmxWc1VKSDY2dyIsImdubyI6MCwiZXhwIjoxNzQ0OTkzNjg2LCJ0eXBlIjozLCJpYXQiOjE3NDQ5OTAwODYsImFpZCI6ImxLaGtWSWpOU3V5bGhDUkhzN25aencifQ.x5woxkv92iJeM_vkAcMF4DEJE5nZh63K4MbBhvc38Kq0vopRTUCmgqMjR6zOX390P5HDi4vRU60tUSJthk0txA"
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
