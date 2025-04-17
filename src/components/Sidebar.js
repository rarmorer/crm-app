'use client';

import {
  HomeIcon,
  UserGroupIcon,
  PhoneIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

const navItems = [
  { label: 'Dashboard', icon: HomeIcon, href: '#' },
  { label: 'Accounts', icon: UserGroupIcon, href: '#' },
  { label: 'Call Log', icon: PhoneIcon, href: '#' },
  { label: 'Instructions', icon: InformationCircleIcon, href: '#' },
];

const Sidebar = () => {
  return (
    <aside className="h-screen w-64 bg-white shadow-lg flex flex-col">
      <div className="p-6 text-xl font-bold text-blue-600">My CRM</div>

      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="p-4 text-sm text-gray-400 border-t">
        &copy; 2025 Your Company
      </div>
    </aside>
  );
}

export default Sidebar;