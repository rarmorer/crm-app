// "use client";
// import { signIn } from "next-auth/react";
// import { useSearchParams } from "next/navigation";
// import { useState } from "react";

// export default function SignIn() {
//   const searchParams = useSearchParams();
//   const callbackUrl = searchParams.get("callbackUrl") || "/";
//   const [isLoading, setIsLoading] = useState(false);
  
//   const handleSignIn = async (provider) => {
//     setIsLoading(true);
//     try {
//       await signIn(provider, { callbackUrl });
//     } catch (error) {
//       console.error("Sign in error:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };
  
//   return (
//     <div className="flex min-h-screen flex-col items-center justify-center p-4">
//       <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
//         <div className="text-center">
//           <h1 className="text-2xl font-bold">Sign in to your account</h1>
//           <p className="mt-2 text-gray-600">
//             Choose your sign-in method below
//           </p>
//         </div>
        
//         <div className="mt-8 space-y-4">
//           <button
//             onClick={() => handleSignIn("zoom")}
//             disabled={isLoading}
//             className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//           >
//             {isLoading ? "Signing in..." : "Sign in with Zoom"}
//           </button>
//         </div>
        
//         <div className="mt-6 text-center text-sm text-gray-500">
//           <p>
//             By signing in, you agree to our Terms of Service and Privacy Policy.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }
