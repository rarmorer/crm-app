"use client"

import Earnings from "@/components/Earnings";
import Calls from "@/components/Call-log";
import Sidebar from "@/components/Sidebar";

const HomePage = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-y-auto">
        <main className="p-6">
          <div className="flex flex-wrap gap-6">
            <div className="w-full md:w-1/2">
              <Earnings />
            </div>
            <div className="w-full md:w-1/2">
              <Calls />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default HomePage;