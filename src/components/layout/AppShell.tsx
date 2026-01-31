import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  Calendar, 
  BarChart2, 
  Settings, 
  Bell, 
  Search, 
  Menu,
  X,
  LogOut
} from 'lucide-react';

export default function AppShell() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Jobs', href: '/jobs', icon: Briefcase },
    { name: 'Candidates', href: '/candidates', icon: Users },
    { name: 'Schedule', href: '/schedule', icon: Calendar },
    { name: 'Analytics', href: '/analytics', icon: BarChart2 },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-[#0052CC]/20 selection:text-[#0052CC]">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-50 h-full w-72 bg-white border-r border-slate-200 shadow-xl shadow-slate-200/50 transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
      `}>
        <div className="flex h-20 items-center justify-between px-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#0052CC] to-[#2684FF] shadow-lg shadow-blue-900/20">
              <Users className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              TalentTrack<span className="text-[#0052CC]">Pro</span>
            </span>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-slate-500" />
          </button>
        </div>

        <nav className="p-4 space-y-2 mt-4">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsSidebarOpen(false)}
                className={`
                  group flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-300
                  ${isActive 
                    ? 'bg-[#0052CC]/5 text-[#0052CC] ring-1 ring-[#0052CC]/10' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 hover:translate-x-1'
                  }
                `}
              >
                <item.icon className={`h-5 w-5 transition-colors ${isActive ? 'text-[#0052CC]' : 'text-slate-400 group-hover:text-slate-600'}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 w-full p-4 border-t border-slate-100 bg-slate-50/50">
          <button className="flex items-center gap-3 px-4 py-3.5 w-full rounded-xl text-sm font-medium text-slate-600 hover:bg-white hover:shadow-sm hover:text-slate-900 transition-all">
            <Settings className="h-5 w-5 text-slate-400" />
            Settings
          </button>
          <button className="flex items-center gap-3 px-4 py-3.5 w-full rounded-xl text-sm font-medium text-slate-600 hover:bg-white hover:shadow-sm hover:text-red-600 transition-all mt-1">
            <LogOut className="h-5 w-5 text-slate-400" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <div className="lg:pl-72 flex flex-col min-h-screen transition-all duration-300">
        {/* Top Header */}
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between px-4 sm:px-8 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-sm">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <Menu className="h-6 w-6 text-slate-600" />
            </button>
            
            {/* Search Bar */}
            <div className="hidden md:flex items-center gap-2 px-4 py-2.5 bg-slate-100/50 rounded-full border border-slate-200 focus-within:border-[#0052CC] focus-within:ring-2 focus-within:ring-[#0052CC]/10 transition-all w-96 group">
              <Search className="h-4 w-4 text-slate-400 group-focus-within:text-[#0052CC]" />
              <input 
                type="text" 
                placeholder="Search candidates, jobs, or keywords..."
                className="bg-transparent border-none focus:ring-0 text-sm text-slate-900 placeholder-slate-400 w-full outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <button className="relative p-2 text-slate-400 hover:text-[#0052CC] hover:bg-[#0052CC]/5 rounded-full transition-all">
              <Bell className="h-6 w-6" />
              <span className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-[#FF5630] ring-2 ring-white"></span>
            </button>
            
            <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-slate-900">Sarah Jenkins</p>
                <p className="text-xs text-slate-500">Senior Recruiter</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-slate-200 ring-2 ring-white shadow-md overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                  alt="User avatar"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
          <div className="mx-auto max-w-7xl animate-in fade-in duration-500 slide-in-from-bottom-4">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
