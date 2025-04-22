import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(request) {
  try {
    // Check if user is authenticated
    const session = await getServerSession(authOptions);
    
    if (!session || !session.accessToken) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    // Get search query
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    
    if (!query) {
      return Response.json({ error: "Missing search query" }, { status: 400 });
    }
      
      // Use the access token to call Zoom API
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

      // Filter users based on the search query
      const filteredUsers = data.users.filter(user => 
        user.name.toLowerCase().includes(query.toLowerCase())
      );

      // Map to a simpler format
      const results = filteredUsers.map(user => ({
        name: `${user.name}`,
        phone_number: user.phone_numbers?.[0]?.number || null,
        // Add other fields as needed
      }));

      return Response.json({ contacts: results });
    
  } catch (error) {    console.error('Search error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}