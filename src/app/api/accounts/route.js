import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; 

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const bookName = searchParams.get("name");   
  
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.accessToken) {
      return Response.json({ error: "Not authenticated" }, { status: 401 });
    }
//unit id needs to be added
    const response = await fetch('https://api.zoom.us/v2/contact_center/address_books', {
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
    console.log('books', data)

    const matchedBook = data.address_books.find(book => book.address_book_name.toLowerCase() === bookName.toLowerCase());

    if (!matchedBook) {
      return Response.json({ found: false });
    }

    const id = matchedBook.address_book_id;

    const detailsRes = await fetch(`https://api.zoom.us/v2/contact_center/address_books/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        'Content-Type': 'application/json',
      }
    });

    if (!detailsRes.ok) {
      const errText = await detailsRes.text();
      console.error(`Zoom address book ID fetch error: ${detailsRes.status}`, errText);
      throw new Error(`Zoom address book ID fetch error: ${detailsRes.status} - ${errText}`);
    }

    const details = await detailsRes.json();

    const results = [{
      id: details.address_book_id,
      name: details.address_book_name,
      description: details.address_book_description,
      status: 'Available',
      phoneNumber: 'N/A',
      email: 'N/A'
    }];

    return Response.json({ found: true, accounts: results }); 
  } catch (error) {
    console.error('Authorization error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
