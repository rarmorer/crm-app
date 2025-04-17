export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('q');
  console.log('Query received:', query);

  if (!query) {
    return new Response(JSON.stringify({ error: 'Missing search query' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Mocked Zoom contact data
  const mockContacts = [
    {
      id: 'abc123',
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      phone_number: '+1-555-123-4567',
      department: 'Support',
      address: '123 Main St, Springfield',
    },
    {
      id: 'def456',
      name: 'John Smith',
      email: 'john.smith@example.com',
      phone_number: '+1-555-987-6543',
      department: 'Sales',
      address: '456 Oak Ave, Rivertown',
    },
  ];

  // Very basic filtering by name
  const filtered = mockContacts.filter(contact =>
    contact.name.toLowerCase().includes(query.toLowerCase())
  );

  return new Response(JSON.stringify({ contacts: filtered }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}