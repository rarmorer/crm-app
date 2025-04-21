import NextAuth from "next-auth";
import ZoomProvider from "next-auth/providers/zoom";

// Next has a Next-auth function that supports Zoom OAuth so we just need to pass clied ID and secret from our app
export const authOptions = {
  providers: [
    ZoomProvider({
      clientId: process.env.ZOOM_CLIENT_ID,
      clientSecret: process.env.ZOOM_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  // Tells NextAuth to use JWT tokens to manage session data instead of storing sessions in a database
  // Set shorter session lifetime
  session: {
    strategy: "jwt",
    maxAge: 60 * 60, // 1 hour instead of the default 30 days
  },
  // Keep debug mode for development
  debug: process.env.NODE_ENV === "development",
  // Add these callbacks
  callbacks: {
    async jwt({ token, account }) {
      console.log("JWT Callback - Account:", !!account);
      // Only update token if account exists (user explicitly authenticated)
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expiresAt = account.expires_at;
      }
      return token;
    },
    async session({ session, token }) {
      console.log("Session Callback - Token exists:", !!token);
      // Only set session properties if token exists
      if (token) {
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
};const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };