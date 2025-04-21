
export async function GET(req) {
  const data = {
    page_size: 3,
    next_page_token: '',
    total_records: 3,
    contacts: [
      {
        id: '1',
        name: 'Acme Corp',
        email: 'contact@acme.com',
        phone_number: '+1234567890',
        status: 'Active',
      },
      {
        id: '2',
        name: 'Beta LLC',
        email: 'info@beta.com',
        phone_number: '+1987654321',
        status: 'Inactive',
      },
      {
        id: '3',
        name: 'Delta Inc',
        email: 'support@delta.com',
        phone_number: '+1122334455',
        status: 'Active',
      },
    ],
  };

  return new Response(JSON.stringify(data.contacts), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}