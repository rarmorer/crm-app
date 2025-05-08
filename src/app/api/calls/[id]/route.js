import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(request, { params }) {
  // Await the params object to get the id
  const callId = params?.id;
  console.log("API route called with ID:", callId);
  
  const session = await getServerSession(authOptions);

  if (!session || !session.accessToken) {
    return Response.json({ error: "Not authenticated" }, { status: 401 });
  }

  // Check if there was an error refreshing the token
  if (session.error === "RefreshAccessTokenError") {
    return Response.json(
      { error: "Your session has expired. Please sign in again." },
      { status: 401 }
    );
  }

  try {
    // Note: The URL has changed from call_logs to call_history based on your error
    const zoomUrl = `https://api.zoom.us/v2/phone/call_history/${callId}`;
    
    console.log("Fetching from Zoom API:", zoomUrl);
    
    const response = await fetch(zoomUrl, {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Zoom API error: ${response.status} ${errorText}`);
      return Response.json(
        { error: `Failed to fetch call details: ${response.status}` },
        { status: response.status }
      );
    }

    const callDetails = await response.json();
    return Response.json(callDetails);
  } catch (error) {
    console.error("Error in API route:", error);
    return Response.json(
      { error: "Failed to fetch call details" },
      { status: 500 }
    );
  }
}