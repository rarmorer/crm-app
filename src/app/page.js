"use client"

import Earnings from "@/components/Earnings";
import Calls from "@/components/Call-log";
import Sidebar from "@/components/Sidebar";
import SearchBar from "@/components/Searchbar";
import SmartEmbed from "@/components/SmartEmbed";
import EventLog from "@/components/EventLog";
import { useEffect } from "react";
 import { useCall } from "@/context/global-context";

const HomePage = () => {

  const {calls, setCalls} = useCall();
 
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await fetch('/api/call-logs');
        const data = await res.json();
        console.log('test', data)
        setCalls(data.interactions);
        } catch(err) {
        console.error('failed to fetch call logs', err);
      } 
    }
    fetchLogs();
  }, []);
  console.log('CALLS', calls)
  return (
    <div className="flex h-screen w-screen overflow-hidden">
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