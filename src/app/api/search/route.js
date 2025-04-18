export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('q');
  console.log('Query received:', query);

  const ZOOM_ACCESS_TOKEN="eyJzdiI6IjAwMDAwMiIsImFsZyI6IkhTNTEyIiwidiI6IjIuMCIsImtpZCI6ImY4ZmMwYzY1LWFhODAtNDM5NS04Yjg0LTNjMjFmYmNlZTFlMSJ9.eyJhdWQiOiJodHRwczovL29hdXRoLnpvb20udXMiLCJ1aWQiOiI2R3RkaGVaUVNxLWwySmxGVzZ2TEZ3IiwidmVyIjoxMCwiYXVpZCI6IjkxZDFmN2U4YTMwODc1ZGI0NTQzZjE5MWM2ZTM3NWRjOGUyMjg5NjI2MjJiNTZkNmQ3MDY0NzEyMzJlMGQ4ZDYiLCJuYmYiOjE3NDQ5ODQ0MTQsImNvZGUiOiIwbkFUTzlRblQ3aWZzNlhLcHlDWUlncENzd2lXaEx5MUMiLCJpc3MiOiJ6bTpjaWQ6UnFUcGFiV3pRUXl0VmxWc1VKSDY2dyIsImdubyI6MCwiZXhwIjoxNzQ0OTg4MDE0LCJ0eXBlIjozLCJpYXQiOjE3NDQ5ODQ0MTQsImFpZCI6ImxLaGtWSWpOU3V5bGhDUkhzN25aencifQ.sCTcdwwdLbOLWDRxRq5x-M7RM70qFcnjcjrch1CA-QPJcUBLSeHrX1MzZ-wAVnrymKoOrf0efOjQn1o-IXUp6A"
  if (!query) {
    return new Response(JSON.stringify({ error: 'Missing search query' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const response = await fetch('https://api.zoom.us/v2/phone/users', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${ZOOM_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Zoom API error: ${response.status} - ${errText}`);
    }

    const data = await response.json();
    
    // Mocked Zoom contact data
    const contacts = data.users.map(user => ({
      id: user.id,
      name: user.name,
      phone_number: user.phone_numbers?.[0]?.number || null,
    }));
    // Very basic filtering by name
    const filtered = contacts.filter(contact =>
      contact.name.toLowerCase().includes(query.toLowerCase())
    );

  return Response.json({ contacts: filtered });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}