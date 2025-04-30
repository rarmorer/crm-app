import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // Adjust if needed

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.accessToken) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const response = await fetch('https://api.zoom.us/v2/phone/users', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error(`Zoom API error: ${response.status}`, errText);
      throw new Error(`Zoom API error: ${response.status} - ${errText}`);
    }

    const data = await response.json();

    const filteredUsers = data.users || []

    const results = filteredUsers.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phone_numbers && user.phone_numbers.length > 0 ? user.phone_numbers[0].number : 'No phone number',
      status: user.status
    }));

    return Response.json({accounts: results}); 
  } catch (error) {
    console.error('Search error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
