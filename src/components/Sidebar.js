'use client';

import {
  HomeIcon,
  UserGroupIcon,
  PhoneIcon,
  InformationCircleIcon,
  LockClosedIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useVoiceAuthorized } from "@/context/global-context";
import VoiceAuth from './VoiceAuth';

const Sidebar = () => {
  const { voiceAuthorized } = useVoiceAuthorized();

  const navItems = [
    { label: 'Dashboard', icon: HomeIcon, href: '/' },
    { label: 'Accounts', icon: UserGroupIcon, href: '/accounts' },
    { label: 'Call Logs', icon: PhoneIcon, href: '/call-logs' },
    { label: 'Instructions', icon: InformationCircleIcon, href: '/README.md' },
    {label: 'Authorized Only', icon: LockClosedIcon, href: '/authorized'}
  ];

  return (
    <aside className="h-screen w-64 bg-white shadow-lg flex flex-col">
      <div className="pt-6 pl-6 text-xl font-bold text-blue-600">My CRM</div>

      <nav className="flex-1 pl-6 pt-4 pr-4 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition ${
              item.label === 'Authorized Only' && !voiceAuthorized
                ? 'text-gray-400 cursor-not-allowed pointer-events-none'
                : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
            }`}
            aria-disabled={item.label === 'Authorized Only' && !voiceAuthorized}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </Link>
        ))}
        <div className="pt-4">
          <VoiceAuth />
        </div>
      </nav>

      <div className="pl-6 pr-4 pb-4 text-sm text-gray-400 border-t">
        &copy; 2025 Your Company
      </div>
    </aside>
  );
}

export default Sidebar;