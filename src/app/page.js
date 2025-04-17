"use client"

import Earnings from "@/components/Earnings";
import Calls from "@/components/Call-log";
import Sidebar from "@/components/Sidebar";
import SearchBar from "@/components/SearchBar";

const HomePage = () => {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-y-auto px-8 py-6 bg-gray-50">
        {/* Search Bar - same width as content and aligned to top */}
        <div className="w-full max-w-[500px] mb-6 ml-0">
          <SearchBar />
        </div>
        
        {/* Main Content Area */}
        <main className="flex flex-col space-y-8 ml-0 w-[800px]">
          <Earnings />
          <Calls />
        </main>
      </div>
    </div>
  );
}

export default HomePage;