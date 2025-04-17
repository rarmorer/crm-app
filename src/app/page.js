"use client"

import Earnings from "@/components/Earnings";
import Calls from "@/components/Call-log";

const HomePage = () => {
  return (
    <div className="flex h-screen">

      <div className="flex flex-col flex-1 overflow-y-auto">

        <main className="p-6 space-y-6">
        <Earnings/>
        <Calls/>
        </main>
      </div>
    </div>
  );
}

export default HomePage;