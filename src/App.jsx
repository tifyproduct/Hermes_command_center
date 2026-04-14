
import React, { useState } from 'react';
import { 
  Cpu, Book, Clock, Activity, Settings, CheckCircle2, 
  Play, Pause, Trash2, Edit3, ExternalLink, Shield, 
  Terminal as TerminalIcon, Box, Globe, Zap, Layers, 
  Brain, Target, Rocket
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) { return twMerge(clsx(inputs)); }

const MOCK_DATA = {
  hermes: {
    stats: { level: 42, xp: 85, memory: '92%', status: 'OPTIMAL' },
    skills: [
      { id: 'tiktok-analyst', name: 'TikTok Analyst', rarity: 'Legendary', desc: 'Viral pattern recognition', icon: <Zap /> },
      { id: 'github-pr', name: 'PR Architect', rarity: 'Rare', desc: 'Lifecycle optimization', icon: <Layers /> },
      { id: 'game-video', name: 'Cinematic Gen', rarity: 'Epic', desc: 'Explainers production', icon: <Rocket /> },
    ],
    memory: [
      { id: 1, text: 'Ricky: Sharp, Helpful, Engineering Vibe', tag: 'CORE_USER' },
      { id: 2, text: 'Location: Asia/Jakarta', tag: 'ENV' },
      { id: 3, text: 'URL Verification: Priority High', tag: 'SOP' },
    ]
  },
  openclaw: {
    stats: { load: '14%', health: 'STABLE', connection: 'ESTABLISHED' },
    tools: [
      { id: 'chrome', name: 'Chrome Relay', type: 'BODY', desc: 'Remote Browser Control', status: 'online' },
      { id: 'kie', name: 'Kie Image', type: 'SENSE', desc: 'Visual Generation', status: 'online' },
      { id: 'n8n', name: 'n8n Engine', type: 'NERVE', desc: 'Automation Orchestration', status: 'online' },
    ],
    workflows: [
      { id: 'wf_1', name: 'TikTok Viral Pipeline', status: 'active', result: 'Success' },
      { id: 'wf_2', name: 'Global News Sync', status: 'active', result: 'Success' },
    ]
  },
  mission: {
    name: 'PROJECT:COMMAND_CENTER',
    steps: [
      { id: 's1', content: 'Architecture Design', status: 'completed' },
      { id: 's2', content: 'Core UI Revamp (The Sanctum)', status: 'in_progress' },
      { id: 's3', content: 'API Bridge Integration', status: 'pending' },
      { id: 's4', content: 'Final Deployment', status: 'pending' },
    ]
  }
};

function NeonGlow({ color = "indigo" }) {
  return (
    <div className={cn(
      "absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-20 pointer-events-none",
      color === "indigo" ? "bg-indigo-600" : color === "blue" ? "bg-blue-600" : "bg-emerald-600"
    )} />
  );
}

function CoreSymmetry({ type, status, label }) {
  const isHermes = type === 'hermes';
  return (
    <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative flex flex-col items-center justify-center group">
      <div className="relative w-48 h-48 flex items-center justify-center">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="absolute inset-0 rounded-full border-2 border-indigo-500/20 border-dashed" />
        <motion.div animate={{ rotate: -360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="absolute inset-4 rounded-full border border-blue-400/30" />
        <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }} className={cn("relative z-10 w-24 h-24 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 group-hover:shadow-indigo-500/50", isHermes ? "bg-gradient-to-br from-indigo-600 to-blue-800" : "bg-gradient-to-br from-emerald-600 to-teal-800")}>
          {isHermes ? <Brain size={40} className="text-white" /> : <Box size={40} className="text-white" />}
          <div className="absolute inset-0 rounded-full animate-ping bg-white/10" />
        </motion.div>
      </div>
      <div className="mt-6 text-center">
        <h3 className="text-lg font-bold tracking-widest text-slate-100 uppercase">{label}</h3>
        <div className="flex items-center justify-center gap-2 mt-1">
          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-tighter">{status}</span>
        </div>
      </div>
    </motion.div>
  );
}

function SkillCard({ skill }) {
  const rarityColors = {
    'Legendary': 'border-amber-500/50 text-amber-400 shadow-amber-500/10',
    'Epic': 'border-purple-500/50 text-purple-400 shadow-purple-500/10',
    'Rare': 'border-blue-500/50 text-blue-400 shadow-blue-500/10',
    'Common': 'border-slate-500/50 text-slate-400 shadow-slate-500/10',
  };
  return (
    <motion.div whileHover={{ scale: 1.02, y: -5 }} className={cn("p-4 rounded-2xl border bg-slate-900/60 backdrop-blur-md relative overflow-hidden group", rarityColors[skill.rarity])}>
      <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-100 transition-opacity">{skill.icon}</div>
      <div className="text-[10px] font-bold uppercase tracking-widest mb-1 opacity-60">{skill.rarity}</div>
      <div className="text-sm font-bold text-slate-100 mb-1">{skill.name}</div>
      <div className="text-xs text-slate-400 leading-relaxed">{skill.desc}</div>
    </motion.div>
  );
}

function MissionStep({ step }) {
  return (
    <div className="relative flex items-start gap-6 mb-8 group">
      <div className="flex flex-col items-center">
        <div className={cn("w-6 h-6 rounded-full border-4 border-slate-900 transition-all", step.status === 'completed' ? "bg-emerald-500 shadow-[0_0_10px_#10b981]" : step.status === 'in_progress' ? "bg-indigo-500 animate-pulse shadow-[0_0_15px_#6366f1]" : "bg-slate-700")} />
        <div className="w-0.5 h-full bg-slate-800 group-last:hidden" />
      </div>
      <div className={cn("p-4 rounded-2xl border transition-all flex-1", step.status === 'completed' ? "bg-slate-800/20 border-slate-800 text-slate-500" : step.status === 'in_progress' ? "bg-indigo-500/10 border-indigo-500/40 text-indigo-200 shadow-lg shadow-indigo-500/10" : "bg-slate-800/40 border-slate-700 text-slate-400")}>
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">{step.content}</span>
          {step.status === 'in_progress' && <span className="text-[10px] font-bold animate-pulse">ANALYZING...</span>}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [view, setView] = useState('sanctum');
  return (
    <div className="flex h-screen w-full bg-[#020617] text-slate-200 overflow-hidden font-sans">
      <NeonGlow color="indigo" />
      <NeonGlow color="blue" />
      <aside className="w-20 bg-black/40 backdrop-blur-xl border-r border-slate-800/50 flex flex-col items-center py-8 gap-8 z-50">
        <div className="p-3 bg-indigo-600 rounded-2xl shadow-[0_0_20px_rgba(79,70,229,0.6)]"><Cpu size={24} className="text-white" /></div>
        <nav className="flex flex-col gap-6">
          <NavBtn active={view==='sanctum'} onClick={() => setView('sanctum')} icon={<Activity />} label="Sanc" />
          <NavBtn active={view==='hermes'} onClick={() => setView('hermes')} icon={<Brain />} label="Hrne" />
          <NavBtn active={view==='claw'} onClick={() => setView('claw')} icon={<Box />} label="Claw" />
          <NavBtn active={view==='mission'} onClick={() => setView('mission')} icon={<Target />} label="Miss" />
        </nav>
      </aside>
      <main className="flex-1 relative overflow-y-auto px-12 py-12">
        <AnimatePresence mode="wait">
          {view === 'sanctum' && (
            <motion.div key="sanctum" initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0, scale:1.1 }} className="h-full flex flex-col items-center justify-center">
              <div className="flex gap-32 items-center justify-center mb-20 text-center">
                <CoreSymmetry type="hermes" label="Hermes Mind" status="OPTIMAL" />
                <div className="flex flex-col items-center gap-4">
                    <div className="w-32 h-1 bg-slate-800 rounded-full overflow-hidden relative">
                        <motion.div animate={{ x: [-100, 100] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="absolute top-0 left-0 w-10 h-full bg-indigo-500 shadow-[0_0_10px_#6366f1]" />
                    </div>
                    <div className="text-[10px] font-mono text-indigo-400 uppercase tracking-widest animate-pulse">Synchronizing...</div>
                </div>
                <CoreSymmetry type="claw" label="OpenClaw Body" status="STABLE" />
              </div>
              <div className="grid grid-cols-4 gap-6 w-full max-w-5xl">
                <StatCard label="Intellect" value={MOCK_DATA.hermes.stats.level} sub="LVL 42" color="indigo" />
                <StatCard label="Cognition" value={MOCK_DATA.hermes.stats.xp} sub="XP 85%" color="blue" />
                <StatCard label="Synapse" value={MOCK_DATA.hermes.stats.memory} sub="Saturated" color="amber" />
                <StatCard label="Cortex" value={MOCK_DATA.openclaw.stats.health} sub="Online" color="emerald" />
              </div>
            </motion.div>
          )}
          {view === 'hermes' && (
            <motion.div key="hermes" initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-20 }} className="max-w-6xl mx-auto space-y-12">
              <div className="flex justify-between items-end">
                <div><h1 className="text-4xl font-black tracking-tighter text-white uppercase">Cognitive Matrix</h1><p className="text-slate-400 text-sm mt-2 font-mono">Accessing Procedural Memory & Skill Sets</p></div>
                <div className="px-4 py-2 bg-indigo-600/20 border border-indigo-500/30 rounded-full text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Secure Connection</div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-6">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2"><Layers size={14} /> Installed Skill-Sets</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{MOCK_DATA.hermes.skills.map(s => <SkillCard key={s.id} skill={s} />)}</div>
                </div>
                <div className="space-y-6">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2"><Shield size={14} /> Memory Vault</h3>
                    <div className="space-y-3">{MOCK_DATA.hermes.memory.map(m => (<div key={m.id} className="p-3 bg-slate-900/40 border border-slate-800 rounded-xl text-xs text-slate-300 hover:border-indigo-500/50 transition-all"><span className="text-[9px] font-bold text-indigo-400 opacity-50 block mb-1">{m.tag}</span>{m.text}</div>))}</div>
                </div>
              </div>
            </motion.div>
          )}
          {view === 'claw' && (
            <motion.div key="claw" initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-20 }} className="max-w-6xl mx-auto space-y-12">
              <div className="flex justify-between items-end">
                <div><h1 className="text-4xl font-black tracking-tighter text-white uppercase">Mechanical Interface</h1><p className="text-slate-400 text-sm mt-2 font-mono">Controlling Remote Agents & Automation Hub</p></div>
                <div className="px-4 py-2 bg-emerald-600/20 border border-emerald-500/30 rounded-full text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Senses Active</div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {MOCK_DATA.openclaw.tools.map(t => (
                    <div key={t.id} className="p-6 bg-slate-900/60 border border-slate-800 rounded-3xl hover:border-emerald-500/50 transition-all group">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-2xl group-hover:bg-emerald-500 group-hover:text-white transition-all"><Box size={20}/></div>
                            <div className="text-[10px] font-bold text-emerald-500 uppercase">{t.status}</div>
                        </div>
                        <h4 className="text-lg font-bold text-white">{t.name}</h4>
                        <p className="text-xs text-slate-400 mt-1 mb-6">{t.desc}</p>
                        <button className="w-full py-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2">Initialize $ightarrow$</button>
                    </div>
                ))}
              </div>
              <div className="space-y-6 mt-12">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2"><Zap size={14} /> Nerve Center (n8n)</h3>
                <div className="bg-slate-900/40 border border-slate-800 rounded-3xl overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead className="text-[10px] text-slate-500 uppercase border-b border-slate-800 bg-slate-800/20">
                            <tr className="p-4"><th className="p-4 font-bold">Workflow</th><th className="p-4 font-bold">Status</th><th className="p-4 font-bold">Result</th><th className="p-4 text-right font-bold">Cmd</th></tr>
                        </thead>
                        <tbody>
                            {MOCK_DATA.openclaw.workflows.map(w => (
                                <tr key={w.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-all">
                                    <td className="p-4 text-sm font-medium text-slate-200">{w.name}</td>
                                    <td className="p-4"><span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/10 text-emerald-500">{w.status}</span></td>
                                    <td className="p-4 text-xs text-slate-400">{w.result}</td>
                                    <td className="p-4 text-right"><div className="flex justify-end gap-2"><button className="p-2 hover:text-white text-slate-500"><Play size={14}/></button><button className="p-2 hover:text-white text-slate-500"><Pause size={14}/></button></div></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
              </div>
            </motion.div>
          )}
          {view === 'mission' && (
            <motion.div key="mission" initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-20 }} className="max-w-3xl mx-auto space-y-12">
              <div className="text-center space-y-4">
                <h1 className="text-5xl font-black text-white tracking-tighter uppercase italic">Mission Control</h1>
                <div className="flex items-center justify-center gap-3"><span className="text-xs font-mono text-indigo-400">{MOCK_DATA.mission.name}</span></div>
              </div>
              <div className="relative">{MOCK_DATA.mission.steps.map(step => <MissionStep key={step.id} step={step} />)}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

function NavBtn({ icon, label, active, onClick }) {
  return (
    <motion.button whileHover={{ scale: 1.1 }} onClick={onClick} className={cn("w-12 h-12 flex items-center justify-center rounded-2xl transition-all duration-300 relative group", active ? "bg-indigo-600 text-white shadow-[0_0_20px_rgba(79,70,229,0.6)]" : "text-slate-500 hover:bg-slate-800 hover:text-slate-300")}>
      {icon}
      <span className="absolute left-16 scale-0 group-hover:scale-100 origin-left transition-all duration-200 px-2 py-1 bg-indigo-600 text-white text-[10px] font-bold rounded uppercase tracking-widest">{label}</span>
    </motion.button>
  );
}

function StatCard({ label, value, sub, color }) {
  const la = { indigo: "text-indigo-400", blue: "text-blue-400", amber: "text-amber-400", emerald: "text-emerald-400" };
  return (
    <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-3xl backdrop-blur-sm group hover:border-indigo-500/50 transition-all shadow-xl">
      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">{label}</p>
      <p className={cn("text-3xl font-black tracking-tighter", la[color])}>{value}</p>
      <p className="text-[10px] font-mono text-slate-600 mt-1 italic">{sub}</p>
    </div>
  );
}
