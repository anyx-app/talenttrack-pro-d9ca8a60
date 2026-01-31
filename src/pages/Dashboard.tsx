import React from 'react';
import { ArrowUpRight, Users, Briefcase, CheckCircle2, Clock } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Dashboard</h1>
          <p className="text-slate-500 mt-1">Welcome back, Sarah. Here's what's happening today.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
            View Reports
          </button>
          <button className="px-4 py-2 bg-[#0052CC] text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-900/20">
            + Post New Job
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Candidates', value: '1,284', trend: '+12%', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Active Jobs', value: '32', trend: '+4%', icon: Briefcase, color: 'text-purple-600', bg: 'bg-purple-50' },
          { label: 'Interviews', value: '18', trend: 'Today', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Offers Accepted', value: '86', trend: '+24%', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        ].map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className={`p-3 rounded-xl ${stat.bg}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <span className="flex items-center text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                {stat.trend} <ArrowUpRight className="h-3 w-3 ml-1" />
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-3xl font-bold text-slate-900">{stat.value}</h3>
              <p className="text-sm font-medium text-slate-500">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity & Upcoming Interviews */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Feed */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">Recent Applications</h2>
              <button className="text-sm font-medium text-[#0052CC] hover:text-blue-700">View All</button>
            </div>
            <div className="divide-y divide-slate-50">
              {[
                { name: 'Dr. Emily Chen', role: 'Chief of Cardiology', time: '2h ago', status: 'Applied' },
                { name: 'Michael Ross', role: 'Senior Financial Analyst', time: '4h ago', status: 'Screening' },
                { name: 'Sarah Connor', role: 'ICU Nurse', time: '5h ago', status: 'Interview' },
                { name: 'James Wilson', role: 'Neurologist', time: '1d ago', status: 'Applied' },
              ].map((item, i) => (
                <div key={i} className="p-4 flex items-center gap-4 hover:bg-slate-50 transition-colors cursor-pointer group">
                  <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold group-hover:bg-[#0052CC] group-hover:text-white transition-colors">
                    {item.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-900">{item.name}</h4>
                    <p className="text-sm text-slate-500">{item.role}</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-3 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-full">
                      {item.status}
                    </span>
                    <p className="text-xs text-slate-400 mt-1">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Widgets */}
        <div className="space-y-6">
          <div className="bg-[#0052CC] rounded-2xl p-6 text-white shadow-xl shadow-blue-900/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 bg-white/10 rounded-full blur-xl"></div>
            <h3 className="text-lg font-bold mb-1 relative z-10">Premium Plan</h3>
            <p className="text-blue-100 text-sm mb-4 relative z-10">You are using 85% of your monthly InMail credits.</p>
            <div className="w-full bg-blue-800/50 rounded-full h-2 mb-4 relative z-10">
              <div className="bg-white h-2 rounded-full w-[85%]"></div>
            </div>
            <button className="w-full py-2 bg-white text-[#0052CC] text-sm font-bold rounded-lg hover:bg-blue-50 transition-colors relative z-10">
              Upgrade Plan
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Upcoming Interviews</h3>
            <div className="space-y-4">
              {[
                { time: '10:00 AM', name: 'Alex Thompson', type: 'Video Call' },
                { time: '1:30 PM', name: 'Maria Garcia', type: 'On-site' },
                { time: '3:00 PM', name: 'David Kim', type: 'Phone Screen' },
              ].map((event, i) => (
                <div key={i} className="flex items-start gap-3 pb-3 border-b border-slate-50 last:border-0 last:pb-0">
                  <div className="flex flex-col items-center min-w-[60px]">
                    <span className="text-xs font-bold text-slate-500">{event.time.split(' ')[0]}</span>
                    <span className="text-[10px] text-slate-400 uppercase">{event.time.split(' ')[1]}</span>
                  </div>
                  <div className="pl-3 border-l-2 border-[#FF5630]">
                    <p className="text-sm font-semibold text-slate-900">{event.name}</p>
                    <p className="text-xs text-slate-500">{event.type}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
