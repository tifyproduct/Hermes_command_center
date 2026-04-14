
import React, { useState } from 'react';
import { 
  Cpu, Book, Clock, Activity, Settings, CheckCircle2, 
  Play, Pause, Trash2, Edit3, ExternalLink, Shield, 
  Terminal as TerminalIcon, Box, Globe, Zap, Layers
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) { return twMerge(clsx(inputs)); }

const MOCK_DATA = {
  skills: [
    { id: 'tiktok-analyst', name: 'tiktok-analyst', cat: 'social-media', status: 'active', desc: 'Analyzes viral TikTok trends' },
    { id: 'github-pr-workflow', name: 'github-pr-workflow', cat: 'github', status: 'active', desc: 'PR lifecycle management' },
    { id: 'gamefication_video', name: 'gamefication_video', cat: 'creative', status: 'patching', desc: 'Viral explainers' },
  ],
  memory: [
    { id: 1, target: 'user', text: 'Ricky prefers sharp and helpful vibe.', date: '2026-03-24' },
    { id: 2, target: 'memory', text: 'User is located in Asia/Jakarta timezone.', date: '2026-03-24' },
    { id: 3, target: 'memory', text: 'Verification of URLs is critical for news automation.', date: '2026-03-25' },
  ],
  crons: [
    { id: 'cron_1', name: 'TikTok Trending 24h', schedule: '0 9 * * *', status: 'running', last_run: '2h ago', target: 'whatsapp' },
    { id: 'cron_2', name: 'Geopolitical News Sync', schedule: 'every 6h', status: 'paused', last_run: '1d ago', target: 'telegram' },
  ],
  todo: [
    { id: 't1', content: 'Initialize Project Shell', status: 'completed' },
    { id: 't2', content: 'Build Command Center UI', status: 'in_progress' },
    { id: 't3', content: 'Integrate API Bridge', status: 'pending' },
    { id: 't4', content: 'Deploy to Vercel', status: 'pending' },
  ],
  openclaw: {
    tools: [
      { id: 'chrome-relay', name: 'Chrome Relay', status: 'online', desc: 'Remote browser control & automation' },
      { id: 'kie-image', name: 'Kie Image Gen', status: 'online', desc: 'AI Visual content generation' },
      { id: 'n8n-workflow', name: 'n8n Engine', status: 'online', desc: 'Logic & automation orchestration' },
      { id: 'webhook-manager', name: 'Webhook Bridge', status: 'online', desc: 'External event delivery system' },
    ],
    n8n_workflows: [
      { id: 'wf_1', name: 'TikTok Viral Pipeline', status: 'active', last_execution: '10m ago', result: 'Success' },
      { id: 'wf_2', name: 'Daily News Aggregator', status: 'active', last_execution: '4h ago', result: 'Success' },
      { id: 'wf_3', name: 'User Memory Sync', status: 'idle', last_execution: '2d ago', result: 'Warning' },
    ]
  }
};

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  return (
    <div className="flex h-screen w-full bg-[#0f172a] text-slate-200">
      <aside className="w-64 bg-[#020617] border-r border-slate-800 flex flex-col">
        <div className="p-6 flex items-center gap-3 border-b border-slate-800">
          <div className="p-2 bg-indigo-600 rounded-lg"><Cpu size={20} className="text-white" /></div>
          <span className="font-bold text-lg tracking-tight">HERMES<span className="text-indigo-500">CC</span></span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <NavItem active={activeTab==='overview'} onClick={() => setActiveTab('overview')} icon={<Activity size={18}/>} label="Overview" />
          <NavItem active={activeTab==='skills'} onClick={() => setActiveTab('skills')} icon={<Book size={18}/>} label="Skill Hub" />
          <NavItem active={activeTab==='memory'} onClick={() => setActiveTab('memory')} icon={<Shield size={18}/>} label="Memory Vault" />
          <NavItem active={activeTab==='cron'} onClick={() => setActiveTab('cron')} icon={<Clock size={18}/>} label="Cron Monitor" />
          <NavItem active={activeTab==='tasks'} onClick={() => setActiveTab('tasks')} icon={<TerminalIcon size={18}/>} label="Task Tracker" />
          <div className="pt-4 pb-2 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Ecosystem</div>
          <NavItem active={activeTab==='openclaw'} onClick={() => setActiveTab('openclaw')} icon={<Box size={18}/>} label="OpenClaw Tools" />
          <NavItem active={activeTab==='n8n'} onClick={() => setActiveTab('n8n')} icon={<Zap size={18}/>} label="n8n Automations" />
        </nav>
        <div className="p-4 border-t border-slate-800 bg-[#020617]">
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-800 cursor-pointer text-slate-400 transition-colors">
            <Settings size={18} /> <span className="text-sm">System Settings</span>
          </div>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard label="Total Skills" value={MOCK_DATA.skills.length} sub="Active/Optimal" color="indigo" />
          <StatCard label="Active Crons" value={MOCK_DATA.crons.filter(c => c.status === 'running').length} sub="Schedules running" color="emerald" />
          <StatCard label="Memory Load" value="92%" sub="2,029 / 2,200 chars" color="amber" />
          <StatCard label="System Health" value="Stable" sub="All connected" color="blue" />
        </div>
        <div className="bg-[#1e293b] rounded-2xl border border-slate-700 overflow-hidden shadow-xl">
          <div className="p-6 border-b border-slate-700 flex justify-between items-center">
            <h2 className="text-xl font-semibold capitalize">{activeTab}</h2>
            <div className="flex items-center gap-2 px-3 py-1 bg-slate-900 rounded-full text-xs text-slate-400 border border-slate-700">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> WhatsApp Connected
            </div>
          </div>
          <div className="p-6">
            {activeTab === 'overview' && <Overview />}
            {activeTab === 'skills' && <Skills />}
            {activeTab === 'memory' && <Memory />}
            {activeTab === 'cron' && <Cron />}
            {activeTab === 'tasks' && <Tasks />}
            {activeTab === 'openclaw' && <OpenClaw />}
            {activeTab === 'n8n' && <N8nView />}
          </div>
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active, onClick }) {
  return (
    <button onClick={onClick} className={cn("w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200", active ? "bg-indigo-600/10 text-indigo-400 font-medium" : "text-slate-400 hover:bg-slate-800 hover:text-slate-200")}>
      {icon} <span className="text-sm">{label}</span> {active && <div className="ml-auto w-1.5 h-1.5 bg-indigo-500 rounded-full" />}
    </button>
  );
}

function StatCard({ label, value, sub, color }) {
  const colors = { indigo: "text-indigo-400", emerald: "text-emerald-400", amber: "text-amber-400", blue: "text-blue-400" };
  return (
    <div className="bg-[#1e293b] p-6 rounded-2xl border border-slate-700 shadow-sm">
      <p className="text-sm text-slate-400 mb-1">{label}</p>
      <p className={cn("text-3xl font-bold", colors[color])}>{value}</p>
      <p className="text-xs text-slate-500 mt-1">{sub}</p>
    </div>
  );
}

function Overview() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-slate-400 flex items-center gap-2"><Activity size={16} /> Active System State</h3>
        <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 font-mono text-xs text-emerald-400 space-y-2">
          <p>[INFO] System Heartbeat: OK</p>
          <p>[INFO] Memory Index: Optimal</p>
          <p>[INFO] Last Tool Call: 2s ago</p>
          <p className="text-slate-500">_ awaiting input...</p>
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-slate-400 flex items-center gap-2"><Clock size={16} /> Recent Activity</h3>
        <div className="space-y-3">
          {MOCK_DATA.crons.map(c => (
            <div key={c.id} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-slate-700">
              <span className="text-sm font-medium">{c.name}</span>
              <span className="text-xs text-slate-500">{c.last_run}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Skills() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-sm text-slate-400">Manage procedural capabilities.</p>
        <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-medium transition-colors">+ New Skill</button>
      </div>
      <div className="grid grid-cols-1 gap-3">
        {MOCK_DATA.skills.map(s => (
          <div key={s.id} className="p-4 bg-slate-800/50 rounded-xl border border-slate-700 flex items-center justify-between group hover:border-indigo-500 transition-all">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-slate-700 rounded-lg text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all"><Book size={18} /></div>
              <div><p className="font-mono text-sm font-semibold">{s.name}</p><p className="text-xs text-slate-500">{s.desc}</p></div>
            </div>
            <div className="flex items-center gap-3">
              <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-bold uppercase", s.status === 'active' ? "bg-emerald-500/10 text-emerald-500" : "bg-amber-500/10 text-amber-500")}>{s.status}</span>
              <div className="flex gap-1">
                <button className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white"><Edit3 size={14}/></button>
                <button className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-red-400"><Trash2 size={14}/></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Memory() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-sm text-slate-400">Directly edit the agent's persistent beliefs.</p>
        <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-medium transition-colors">+ Add Memory</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {MOCK_DATA.memory.map(m => (
          <div key={m.id} className="p-5 bg-slate-800/50 rounded-xl border border-slate-700 hover:border-indigo-500 transition-all group">
            <div className="flex justify-between items-start mb-3">
              <span className={cn("px-2 py-0.5 rounded text-[10px] font-bold uppercase", m.target === 'user' ? "bg-blue-500/10 text-blue-400" : "bg-purple-500/10 text-purple-400")}>{m.target}</span>
              <span className="text-[10px] text-slate-500">{m.date}</span>
            </div>
            <p className="text-sm text-slate-300 mb-4 leading-relaxed">{m.text}</p>
            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white"><Edit3 size={14}/></button>
              <button className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-red-400"><Trash2 size={14}/></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Cron() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-sm text-slate-400">Scheduled automation tasks.</p>
        <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-medium transition-colors">+ New Cron</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-xs text-slate-500 uppercase tracking-wider border-b border-slate-700">
              <th className="pb-3 font-medium">Job Name</th>
              <th className="pb-3 font-medium">Schedule</th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 font-medium">Target</th>
              <th className="pb-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {MOCK_DATA.crons.map(c => (
              <tr key={c.id} className="group hover:bg-slate-800/30 transition-colors">
                <td className="py-4 text-sm font-medium">{c.name}</td>
                <td className="py-4 text-sm font-mono text-slate-400">{c.schedule}</td>
                <td className="py-4">
                  <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-bold", c.status === 'running' ? "bg-emerald-500/10 text-emerald-500" : "bg-slate-500/10 text-slate-500")}>{c.status}</span>
                </td>
                <td className="py-4 text-sm text-slate-400">{c.target}</td>
                <td className="py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white"><Play size={14}/></button>
                    <button className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white"><Pause size={14}/></button>
                    <button className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-red-400"><Trash2 size={14}/></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Tasks() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-semibold">Current Dedicated Task</h3>
          <span className="px-2 py-1 bg-indigo-500/20 text-indigo-400 rounded text-[10px] font-bold">IN PROGRESS</span>
        </div>
        <button className="text-xs text-indigo-400 hover:underline flex items-center gap-1">View Logs <ExternalLink size={12} /></button>
      </div>
      <div className="relative pl-8 space-y-8 border-l-2 border-slate-700">
        {MOCK_DATA.todo.map((item) => (
          <div key={item.id} className="relative">
            <div className={cn("absolute -left-[41px] top-0 w-4 h-4 rounded-full border-4 border-[#1e293b]", item.status === 'completed' ? "bg-emerald-500" : item.status === 'in_progress' ? "bg-indigo-500 animate-pulse" : "bg-slate-600")} />
            <div className={cn("p-4 rounded-xl border transition-all", item.status === 'completed' ? "bg-slate-800/30 border-slate-700 text-slate-500" : item.status === 'in_progress' ? "bg-indigo-500/10 border-indigo-500/50 text-indigo-200 shadow-lg shadow-indigo-500/10" : "bg-slate-800/50 border-slate-700 text-slate-400")}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {item.status === 'completed' && <CheckCircle2 size={18} className="text-emerald-500" />}
                  <span className="text-sm font-medium">{item.content}</span>
                </div>
                {item.status === 'in_progress' && <span className="text-[10px] font-bold text-indigo-400">EXECUTING...</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function OpenClaw() {
  return (
    <div className="space-y-6">
       <div className="flex justify-between items-center">
        <p className="text-sm text-slate-400">Integrated tool ecosystem and remote agents.</p>
        <div className="flex gap-2">
            <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-xs font-medium transition-colors flex items-center gap-2">
                <Globe size={14} /> Remote Session
            </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {MOCK_DATA.openclaw.tools.map(t => (
          <div key={t.id} className="p-4 bg-slate-800/50 rounded-xl border border-slate-700 hover:border-indigo-500 transition-all group">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg"><Layers size={18} /></div>
                <span className="font-semibold text-sm">{t.name}</span>
              </div>
              <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-bold", t.status === 'online' ? "bg-emerald-500/10 text-emerald-500" : "bg-slate-500/10 text-slate-500")}>{t.status}</span>
            </div>
            <p className="text-xs text-slate-400 mb-4">{t.desc}</p>
            <div className="flex justify-end gap-2">
                <button className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors"><ExternalLink size={14}/></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function N8nView() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-sm text-slate-400">Agentic automation orchestration via n8n.</p>
        <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-medium transition-colors">+ Create Workflow</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-xs text-slate-500 uppercase tracking-wider border-b border-slate-700">
              <th className="pb-3 font-medium">Workflow Name</th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 font-medium">Last Run</th>
              <th className="pb-3 font-medium">Result</th>
              <th className="pb-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {MOCK_DATA.openclaw.n8n_workflows.map(w => (
              <tr key={w.id} className="group hover:bg-slate-800/30 transition-colors">
                <td className="py-4 text-sm font-medium">{w.name}</td>
                <td className="py-4">
                  <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-bold", w.status === 'active' ? "bg-emerald-500/10 text-emerald-500" : "bg-slate-500/10 text-slate-500")}>{w.status}</span>
                </td>
                <td className="py-4 text-sm text-slate-400">{w.last_execution}</td>
                <td className="py-4">
                   <span className={cn("text-xs", w.result === 'Success' ? "text-emerald-400" : "text-amber-400")}>{w.result}</span>
                </td>
                <td className="py-4 text-right">
                   <div className="flex justify-end gap-2">
                      <button className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white"><Play size={14}/></button>
                      <button className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white"><Pause size={14}/></button>
                      <button className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-red-400"><Trash2 size={14}/></button>
                   </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
