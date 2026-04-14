
import React, { useState, useEffect } from 'react';
import { 
  Cpu, Book, Clock, Activity, Settings, CheckCircle2, 
  Play, Pause, Trash2, Edit3, ExternalLink, Shield, 
  Terminal as TerminalIcon, Box, Globe, Zap, Layers, Orbit, Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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

// --- COMPONENTS ---

function AgentCore({ status }) {
  return (
    <div className="relative flex items-center justify-center w-64 h-64">
      {/* Outer Ring - Rotating Glow */}
      <motion.div 
        animate={{ rotate: 360 }} 
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 rounded-full border-2 border-indigo-500/30 border-dashed" 
      />
      {/* Mid Ring - Pulsing */}
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-4 rounded-full border border-indigo-400/40 shadow-[0_0_30px_rgba(99,102,241,0.3)]" 
      />
      {/* The Core - Heartbeat */}
      <motion.div 
        animate={{ 
          scale: status === 'processing' ? [1, 1.2, 1] : [1, 1.05, 1],
          boxShadow: status === 'processing' ? 
            ["0 0 20px #6366f1", "0 0 50px #6366f1", "0 0 20px #6366f1"] : 
            ["0 0 15px #4f46e5", "0 0 25px #4f46e5", "0 0 15px #4f46e5"]
        }}
        transition={{ duration: status === 'processing' ? 0.8 : 2, repeat: Infinity }}
        className={cn(
          "relative z-10 w-24 h-24 rounded-full flex items-center justify-center bg-gradient-to-br from-indigo-600 to-blue-700 shadow-lg",
          status === 'processing' && "bg-gradient-to-br from-blue-400 to-indigo-500"
        )}
      >
        <Cpu size={40} className="text-white animate-pulse" />
        <div className="absolute inset-0 rounded-full animate-ping bg-indigo-400/20" />
      </motion.div>
    </div>
  );
}

function NavItem({ icon, label, active, onClick }) {
  return (
    <motion.button 
      whileHover={{ x: 4 }}
      onClick={onClick} 
      className={cn(
        "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 mb-1", 
        active ? "bg-indigo-600/20 text-indigo-400 font-medium shadow-[inset_0_0_10px_rgba(79,70,229,0.2)]" : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
      )}
    >
      {icon} <span className="text-sm">{label}</span>
      {active && <div className="ml-auto w-1.5 h-1.5 bg-indigo-500 rounded-full shadow-[0_0_8px_#6366f1]" />}
    </motion.button>
  );
}

function StatCard({ label, value, sub, color }) {
  const colors = { indigo: "text-indigo-400", emerald: "text-emerald-400", amber: "text-amber-400", blue: "text-blue-400" };
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-800/40 backdrop-blur-md p-6 rounded-2xl border border-slate-700/50 hover:border-indigo-500/50 transition-all group"
    >
      <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">{label}</p>
      <p className={cn("text-3xl font-bold tracking-tight", colors[color])}>{value}</p>
      <p className="text-[10px] text-slate-500 mt-1 opacity-70">{sub}</p>
    </motion.div>
  );
}

function Overview() {
  const [logs, setLogs] = useState(["[SYS] Heartbeat active", "[MEM] Index stable"]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      const events = ["Sensing TikTok...", "Updating Memory...", "Syncing n8n...", "Analyzing Hooks...", "Refining logic..."];
      setLogs(prev => [...prev.slice(-4), `[${new Date().toLocaleTimeString()}] ${events[Math.floor(Math.random()*events.length)]}`]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="flex flex-col items-center justify-center p-8 bg-slate-900/50 rounded-3xl border border-slate-800/50 shadow-inner">
        <AgentCore status="processing" />
        <div className="mt-8 text-center">
            <h3 className="text-xl font-bold text-white mb-1">Hermes Engine</h3>
            <p className="text-xs text-indigo-400 font-mono animate-pulse">SENSE // THINK // ACT</p>
        </div>
      </div>
      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-slate-400 flex items-center gap-2"><Activity size={16} /> Real-time Stream</h3>
          <div className="bg-black/60 p-4 rounded-2xl border border-slate-700 font-mono text-[11px] text-emerald-400 space-y-2 h-48 overflow-hidden relative">
            {logs.map((log, i) => (
              <motion.p initial={{ opacity:0, x:-10 }} animate={{ opacity:1, x:0 }} key={i}>{log}</motion.p>
            ))}
            <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        </div>
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-slate-400 flex items-center gap-2"><Clock size={16} /> Recent Automations</h3>
          {MOCK_DATA.crons.map(c => (
            <div key={c.id} className="flex items-center justify-between p-3 bg-slate-800/30 rounded-xl border border-slate-700/50 hover:bg-slate-700/50 transition-all">
              <span className="text-sm font-medium text-slate-300">{c.name}</span>
              <span className="text-xs text-slate-500">{c.last_run}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// (Skills, Memory, Cron, Tasks, OpenClaw, N8nViews keep same logic but wrap in Framer Motion)
function Skills() {
  return (
    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-sm text-slate-400">Procedural Logic Matrix</p>
        <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-medium transition-all hover:scale-105 active:scale-95">+ New Skill</button>
      </div>
      <div className="grid grid-cols-1 gap-3">
        {MOCK_DATA.skills.map(s => (
          <motion.div whileHover={{ scale: 1.01 }} key={s.id} className="p-4 bg-slate-800/40 rounded-xl border border-slate-700/50 flex items-center justify-between group hover:border-indigo-500/50 transition-all">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg group-hover:bg-indigo-600 group-hover:text-white transition-all"><Book size={18} /></div>
              <div><p className="font-mono text-sm font-semibold text-slate-200">{s.name}</p><p className="text-xs text-slate-500">{s.desc}</p></div>
            </div>
            <div className="flex items-center gap-3">
              <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-bold uppercase", s.status === 'active' ? "bg-emerald-500/10 text-emerald-500" : "bg-amber-500/10 text-amber-500")}>{s.status}</span>
              <div className="flex gap-1">
                <button className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white"><Edit3 size={14}/></button>
                <button className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-red-400"><Trash2 size={14}/></button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function Memory() {
  return (
    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-sm text-slate-400">Persistent Cognitive Vault</p>
        <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-medium transition-all">+ Add Memory</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {MOCK_DATA.memory.map(m => (
          <motion.div whileHover={{ y: -2 }} key={m.id} className="p-5 bg-slate-800/40 rounded-xl border border-slate-700/50 hover:border-indigo-500/50 transition-all group">
            <div className="flex justify-between items-start mb-3">
              <span className={cn("px-2 py-0.5 rounded text-[10px] font-bold uppercase", m.target === 'user' ? "bg-blue-500/10 text-blue-400" : "bg-purple-500/10 text-purple-400")}>{m.target}</span>
              <span className="text-[10px] text-slate-500">{m.date}</span>
            </div>
            <p className="text-sm text-slate-300 mb-4 leading-relaxed">{m.text}</p>
            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white"><Edit3 size={14}/></button>
              <button className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-red-400"><Trash2 size={14}/></button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function Cron() {
  return (
    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-sm text-slate-400">Temporal Automation Matrix</p>
        <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-medium transition-all">+ New Cron</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="text-xs text-slate-500 uppercase tracking-wider border-b border-slate-800">
            <tr><th className="pb-3 font-medium">Job Name</th><th className="pb-3 font-medium">Schedule</th><th className="pb-3 font-medium">Status</th><th className="pb-3 font-medium">Target</th><th className="pb-3 font-medium text-right">Actions</th></tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {MOCK_DATA.crons.map(c => (
              <tr key={c.id} className="group hover:bg-slate-800/30 transition-colors">
                <td className="py-4 text-sm font-medium text-slate-300">{c.name}</td>
                <td className="py-4 text-sm font-mono text-slate-400">{c.schedule}</td>
                <td className="py-4"><span className={cn("px-2 py-0.5 rounded-full text-[10px] font-bold", c.status === 'running' ? "bg-emerald-500/10 text-emerald-500" : "bg-slate-500/10 text-slate-500")}>{c.status}</span></td>
                <td className="py-4 text-sm text-slate-400">{c.target}</td>
                <td className="py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white"><Play size={14}/></button>
                    <button className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white"><Pause size={14}/></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

function Tasks() {
  return (
    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-semibold">Dedicated Mission Status</h3>
          <span className="px-2 py-1 bg-indigo-500/20 text-indigo-400 rounded text-[10px] font-bold">ACTIVE_SESSION</span>
        </div>
        <button className="text-xs text-indigo-400 hover:underline flex items-center gap-1">View Logs <ExternalLink size={12} /></button>
      </div>
      <div className="relative pl-8 space-y-8 border-l-2 border-slate-800">
        {MOCK_DATA.todo.map((item) => (
          <div key={item.id} className="relative">
            <div className={cn("absolute -left-[41px] top-0 w-4 h-4 rounded-full border-4 border-[#0f172a]", item.status === 'completed' ? "bg-emerald-500" : item.status === 'in_progress' ? "bg-indigo-500 animate-pulse" : "bg-slate-700")} />
            <div className={cn("p-4 rounded-xl border transition-all", item.status === 'completed' ? "bg-slate-800/20 border-slate-800 text-slate-500" : item.status === 'in_progress' ? "bg-indigo-500/10 border-indigo-500/30 text-indigo-200 shadow-[0_0_20px_rgba(99,102,241,0.1)]" : "bg-slate-800/40 border-slate-800 text-slate-400")}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {item.status === 'completed' && <CheckCircle2 size={18} className="text-emerald-500" />}
                  <span className="text-sm font-medium">{item.content}</span>
                </div>
                {item.status === 'in_progress' && <span className="text-[10px] font-bold text-indigo-400 animate-pulse">PROCESSING...</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function OpenClaw() {
  return (
    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} className="space-y-6">
       <div className="flex justify-between items-center">
        <p className="text-sm text-slate-400">Remote Tool Ecosystem</p>
        <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-xs font-medium transition-all flex items-center gap-2"><Globe size={14} /> Remote Session</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {MOCK_DATA.openclaw.tools.map(t => (
          <motion.div whileHover={{ scale: 1.02 }} key={t.id} className="p-4 bg-slate-800/40 rounded-xl border border-slate-700/50 hover:border-indigo-500/50 transition-all group">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg group-hover:bg-indigo-600 group-hover:text-white transition-all"><Layers size={18} /></div>
                <span className="font-semibold text-sm text-slate-200">{t.name}</span>
              </div>
              <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-bold", t.status === 'online' ? "bg-emerald-500/10 text-emerald-500" : "bg-slate-500/10 text-slate-500")}>{t.status}</span>
            </div>
            <p className="text-xs text-slate-400 mb-4">{t.desc}</p>
            <div className="flex justify-end gap-2">
                <button className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors"><ExternalLink size={14}/></button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function N8nView() {
  return (
    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-sm text-slate-400">Automation Orchestration (n8n)</p>
        <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-medium transition-all">+ New Workflow</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="text-xs text-slate-500 uppercase tracking-wider border-b border-slate-800">
            <tr><th className="pb-3 font-medium">Workflow Name</th><th className="pb-3 font-medium">Status</th><th className="pb-3 font-medium">Last Run</th><th className="pb-3 font-medium">Result</th><th className="pb-3 font-medium text-right">Actions</th></tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {MOCK_DATA.openclaw.n8n_workflows.map(w => (
              <tr key={w.id} className="group hover:bg-slate-800/30 transition-colors">
                <td className="py-4 text-sm font-medium text-slate-300">{w.name}</td>
                <td className="py-4"><span className={cn("px-2 py-0.5 rounded-full text-[10px] font-bold", w.status === 'active' ? "bg-emerald-500/10 text-emerald-500" : "bg-slate-500/10 text-slate-500")}>{w.status}</span></td>
                <td className="py-4 text-sm text-slate-400">{w.last_execution}</td>
                <td className="py-4"><span className={cn("text-xs", w.result === 'Success' ? "text-emerald-400" : "text-amber-400")}>{w.result}</span></td>
                <td className="py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white"><Play size={14}/></button>
                    <button className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white"><Pause size={14}/></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  return (
    <div className="flex h-screen w-full bg-[#020617] text-slate-200 overflow-hidden">
      <aside className="w-64 bg-[#020617] border-r border-slate-800 flex flex-col relative z-20">
        <div className="p-6 flex items-center gap-3 border-b border-slate-800">
          <div className="p-2 bg-indigo-600 rounded-lg shadow-[0_0_15px_rgba(79,70,229,0.5)]"><Cpu size={20} className="text-white" /></div>
          <span className="font-bold text-lg tracking-tight text-white">HERMES<span className="text-indigo-500">CC</span></span>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <NavItem active={activeTab==='overview'} onClick={() => setActiveTab('overview')} icon={<Activity size={18}/>} label="Overview" />
          <NavItem active={activeTab==='skills'} onClick={() => setActiveTab('skills')} icon={<Book size={18}/>} label="Skill Hub" />
          <NavItem active={activeTab==='memory'} onClick={() => setActiveTab('memory')} icon={<Shield size={18}/>} label="Memory Vault" />
          <NavItem active={activeTab==='cron'} onClick={() => setActiveTab('cron')} icon={<Clock size={18}/>} label="Cron Monitor" />
          <NavItem active={activeTab==='tasks'} onClick={() => setActiveTab('tasks')} icon={<TerminalIcon size={18}/>} label="Task Tracker" />
          <div className="pt-6 pb-2 px-4 text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em]">Ecosystem</div>
          <NavItem active={activeTab==='openclaw'} onClick={() => setActiveTab('openclaw')} icon={<Box size={18}/>} label="OpenClaw Tools" />
          <NavItem active={activeTab==='n8n'} onClick={() => setActiveTab('n8n')} icon={<Zap size={18}/>} label="n8n Automations" />
        </nav>
        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800/50 cursor-pointer text-slate-500 transition-all group">
            <Settings size={18} className="group-hover:rotate-90 transition-transform" /> <span className="text-sm">System Console</span>
          </div>
        </div>
      </aside>
      
      <main className="flex-1 overflow-y-auto relative">
        {/* Background Gradient Glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <StatCard label="Core Skills" value={MOCK_DATA.skills.length} sub="Optimal State" color="indigo" />
            <StatCard label="Live Robots" value={MOCK_DATA.crons.filter(c => c.status === 'running').length} sub="Syncing Now" color="emerald" />
            <StatCard label="Memory Load" value="92%" sub="Saturating Brain" color="amber" />
            <StatCard label="Network" value="Stable" sub="All Bridges Green" color="blue" />
          </div>
          
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="bg-slate-900/40 backdrop-blur-xl rounded-3xl border border-slate-700/50 overflow-hidden shadow-2xl"
            >
              <div className="p-6 border-b border-slate-700/50 flex justify-between items-center bg-slate-800/20">
                <h2 className="text-lg font-bold text-white capitalize flex items-center gap-2">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full" /> {activeTab}
                </h2>
                <div className="flex items-center gap-2 px-3 py-1 bg-black/40 rounded-full text-[10px] font-mono text-slate-400 border border-slate-700/50">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> WHATSAPP_BRIDGE_STABLE
                </div>
              </div>
              <div className="p-8">
                {activeTab === 'overview' && <Overview />}
                {activeTab === 'skills' && <Skills />}
                {activeTab === 'memory' && <Memory />}
                {activeTab === 'cron' && <Cron />}
                {activeTab === 'tasks' && <Tasks />}
                {activeTab === 'openclaw' && <OpenClaw />}
                {activeTab === 'n8n' && <N8nView />}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
