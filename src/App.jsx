
import React, { useState } from 'react';
import { 
  Cpu, Book, Clock, Activity, Settings, CheckCircle2, 
  Play, Pause, Trash2, Edit3, ExternalLink, Shield, 
  Terminal as TerminalIcon
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) { return twMerge(clsx(inputs)); }

const MOCK_DATA = {
  skills: [
    { id: 'tiktok-analyst', name: 'tiktok-analyst', cat: 'social-media', status: 'active', desc: ' la analyzes trends' },
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
  ]
};

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  return (
    <<divdiv className="flex h-screen w-full bg-[#0f172a] text-slate-200">
      <<asideaside className="w-64 bg-[#020617] border-r border-slate-800 flex flex-col">
        <<divdiv className="p-6 flex items-center gap-3 border-b border-slate-800">
          <<divdiv className="p-2 bg-indigo-600 rounded-lg"><<CpuCpu size={20} className="text-white" /></div>
          <<spanspan className="font-bold text-lg tracking-tight">HERMES<<spanspan className="text-indigo-500">CC</span></span>
        </div>
        <<navnav className="flex-1 p-4 space-y-2">
          <<NavItemNavItem active={activeTab==='overview'} onClick={() => setActiveTab('overview')} icon={<<ActivityActivity size={18}/>} label="Overview" />
          <<NavItemNavItem active={activeTab==='skills'} onClick={() => setActiveTab('skills')} icon={<<BookBook size={18}/>} label="Skill Hub" />
          <<NavItemNavItem active={activeTab==='memory'} onClick={() => setActiveTab('memory')} icon={<<ShieldShield size={18}/>} label="Memory Vault" />
          <<NavItemNavItem active={activeTab==='cron'} onClick={() => setActiveTab('cron')} icon={<<ClockClock size={18}/>} label="Cron Monitor" />
          <<NavItemNavItem active={activeTab==='tasks'} onClick={() => setActiveTab('tasks')} icon={<<TerminalTerminalIcon size={18}/>} label="Task Tracker" />
        </nav>
        <<divdiv className="p-4 border-t border-slate-800 bg-[#020617]">
          <<divdiv className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-800 cursor-pointer text-slate-400 transition-colors">
            <<SettingsSettings size={18} /> <<spanspan className="text-sm">System Settings</span>
          </div>
        </div>
      </aside>
      <<mainmain className="flex-1 overflow-y-auto p-8">
        <<divdiv className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <<StatStatCard label="Total Skills" value={MOCK_DATA.skills.length} sub="Active/Optimal" color="indigo" />
          <<StatStatCard label="Active Crons" value={MOCK_DATA.crons.filter(c => c.status === 'running').length} sub="Schedules running" color="emerald" />
          <<StatStatCard label="Memory Load" value="92%" sub="2,029 / 2,200 chars" color="amber" />
          <<StatStatCard label="System Health" value="Stable" sub="All connected" color="blue" />
        </div>
        <<divdiv className="bg-[#1e293b] rounded-2xl border border-slate-700 overflow-hidden shadow-xl">
          <<divdiv className="p-6 border-b border-slate-700 flex justify-between items-center">
            <<hh2 className="text-xl font-semibold capitalize">{activeTab}</h2>
            <<divdiv className="flex items-center gap-2 px-3 py-1 bg-slate-900 rounded-full text-xs text-slate-400 border border-slate-700">
              <<divdiv className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> WhatsApp Connected
            </div>
          </div>
          <<divdiv className="p-6">
            {activeTab === 'overview' && <<OverviewOverview />}
            {activeTab === 'skills' && <<SkillsSkills />}
            {activeTab === 'memory' && <<MemoryMemory />}
            {activeTab === 'cron' && <<CronCron />}
            {activeTab === 'tasks' && <<TasksTasks />}
          </div>
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active, onClick }) {
  return (
    <<buttonbutton onClick={onClick} className={cn("w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200", active ? "bg-indigo-600/10 text-indigo-400 font-medium" : "text-slate-400 hover:bg-slate-800 hover:text-slate-200")}>
      {icon} <<spanspan className="text-sm">{label}</span> {active && <<divdiv className="ml-auto w-1.5 h-1.5 bg-indigo-500 rounded-full" />}
    </button>
  );
}

function StatCard({ label, value, sub, color }) {
  const colors = { indigo: "text-indigo-400", emerald: "text-emerald-400", amber: "text-amber-400", blue: "text-blue-400" };
  return (
    <<divdiv className="bg-[#1e293b] p-6 rounded-2xl border border-slate-700 shadow-sm">
      <<pp className="text-sm text-slate-400 mb-1">{label}</p>
      <<pp className={cn("text-3xl font-bold", colors[color])}>{value}</p>
      <<pp className="text-xs text-slate-500 mt-1">{sub}</p>
    </div>
  );
}

function Overview() {
  return (
    <<divdiv className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <<divdiv className="space-y-4">
        <<hh3 className="text-sm font-medium text-slate-400 flex items-center gap-2"><<ActivityActivity size={16} /> Active System State</h3>
        <<divdiv className="bg-slate-900 p-4 rounded-xl border border-slate-800 font-mono text-xs text-emerald-400 space-y-2">
          <<pp>[INFO] System Heartbeat: OK</p>
          <<pp>[INFO] Memory Index: Optimal</p>
          <<pp>[INFO] Last Tool Call: 2s ago</p>
          <<pp className="text-slate-500">_ awaiting input...</p>
        </div>
      </div>
      <<divdiv className="space-y-4">
        <<hh3 className="text-sm font-medium text-slate-400 flex items-center gap-2"><<ClockClock size={16} /> Recent Activity</h3>
        <<divdiv className="space-y-3">
          {MOCK_DATA.crons.map(c => (
            <<divdiv key={c.id} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-slate-700">
              <<spanspan className="text-sm font-medium">{c.name}</span>
              <<spanspan className="text-xs text-slate-500">{c.last_run}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Skills() {
  return (
    <<divdiv className="space-y-6">
      <<divdiv className="flex justify-between items-center">
        <<pp className="text-sm text-slate-400">Manage procedural capabilities.</p>
        <<buttonbutton className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-medium transition-colors">+ New Skill</button>
      </div>
      <<divdiv className="grid grid-cols-1 gap-3">
        {MOCK_DATA.skills.map(s => (
          <<divdiv key={s.id} className="p-4 bg-slate-800/50 rounded-xl border border-slate-700 flex items-center justify-between group hover:border-indigo-500 transition-all">
            <<divdiv className="flex items-center gap-4">
              <<divdiv className="p-2 bg-slate-700 rounded-lg text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all"><<BookBook size={18} /></div>
              <div><<pp className="font-mono text-sm font-semibold">{s.name}</p><<pp className="text-xs text-slate-500">{s.desc}</p></div>
            </div>
            <<divdiv className="flex items-center gap-3">
              <<spanspan className={cn("px-2 py-0.5 rounded-full text-[10px] font-bold uppercase", s.status === 'active' ? "bg-emerald-500/10 text-emerald-500" : "bg-amber-500/10 text-amber-500")}>{s.status}</span>
              <<divdiv className="flex gap-1">
                <<buttonbutton className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white"><<EditEdit3 size={14}/></button>
                <<buttonbutton className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-red-400"><<TrashTrash2 size={14}/></button>
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
    <<divdiv className="space-y-6">
      <<divdiv className="flex justify-between items-center">
        <<pp className="text-sm text-slate-400">Directly edit the agent's persistent beliefs.</p>
        <<buttonbutton className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-medium transition-colors">+ Add Memory</button>
      </div>
      <<divdiv className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {MOCK_DATA.memory.map(m => (
          <<divdiv key={m.id} className="p-5 bg-slate-800/50 rounded-xl border border-slate-700 hover:border-indigo-500 transition-all group">
            <<divdiv className="flex justify-between items-start mb-3">
              <<spanspan className={cn("px-2 py-0.5 rounded text-[10px] font-bold uppercase", m.target === 'user' ? "bg-blue-500/10 text-blue-400" : "bg-purple-500/10 text-purple-400")}>{m.target}</span>
              <<spanspan className="text-[10px] text-slate-500">{m.date}</span>
            </div>
            <<pp className="text-sm text-slate-300 mb-4 leading-relaxed">{m.text}</p>
            <<divdiv className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <<buttonbutton className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white"><<EditEdit3 size={14}/></button>
              <<buttonbutton className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-red-400"><<TrashTrash2 size={14}/></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Cron() {
  return (
    <<divdiv className="space-y-6">
      <<divdiv className="flex justify-between items-center">
        <<pp className="text-sm text-slate-400">Scheduled automation tasks.</p>
        <<buttonbutton className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-medium transition-colors">+ New Cron</button>
      </div>
      <<divdiv className="overflow-x-auto">
        <<tabletable className="w-full text-left border-collapse">
          <thead>
            <<trtr className="text-xs text-slate-500 uppercase tracking-wider border-b border-slate-700">
              <<thth className="pb-3 font-medium">Job Name</th>
              <<thth className="pb-3 font-medium">Schedule</th>
              <<thth className="pb-3 font-medium">Status</th>
              <<thth className="pb-3 font-medium">Target</th>
              <<thth className="pb-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <<tbodytbody className="divide-y divide-slate-800">
            {MOCK_DATA.crons.map(c => (
              <<trtr key={c.id} className="group hover:bg-slate-800/30 transition-colors">
                <<tdtd className="py-4 text-sm font-medium">{c.name}</td>
                <<tdtd className="py-4 text-sm font-mono text-slate-400">{c.schedule}</td>
                <<tdtd className="py-4">
                  <<spanspan className={cn("px-2 py-0.5 rounded-full text-[10px] font-bold", c.status === 'running' ? "bg-emerald-500/10 text-emerald-500" : "bg-slate-500/10 text-slate-500")}>{c.status}</span>
                </td>
                <<tdtd className="py-4 text-sm text-slate-400">{c.target}</td>
                <<tdtd className="py-4 text-right">
                  <<divdiv className="flex justify-end gap-2">
                    <<buttonbutton className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white"><<PlayPlay size={14}/></button>
                    <<buttonbutton className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white"><<PausePause size={14}/></button>
                    <<buttonbutton className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-red-400"><<TrashTrash2 size={14}/></button>
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
    <<divdiv className="space-y-8">
      <<divdiv className="flex items-center justify-between">
        <<divdiv className="flex items-center gap-3">
          <<hh3 className="text-lg font-semibold">Current Dedicated Task</h3>
          <<spanspan className="px-2 py-1 bg-indigo-500/20 text-indigo-400 rounded text-[10px] font-bold">IN PROGRESS</span>
        </div>
        <<buttonbutton className="text-xs text-indigo-400 hover:underline flex items-center gap-1">View Logs <<ExternalExternalLink size={12} /></button>
      </div>
      <<divdiv className="relative pl-8 space-y-8 border-l-2 border-slate-700">
        {MOCK_DATA.todo.map((item) => (
          <<divdiv key={item.id} className="relative">
            <<divdiv className={cn("absolute -left-[41px] top-0 w-4 h-4 rounded-full border-4 border-[#1e293b]", item.status === 'completed' ? "bg-emerald-500" : item.status === 'in_progress' ? "bg-indigo-500 animate-pulse" : "bg-slate-600")} />
            <<divdiv className={cn("p-4 rounded-xl border transition-all", item.status === 'completed' ? "bg-slate-800/30 border-slate-700 text-slate-500" : item.status === 'in_progress' ? "bg-indigo-500/10 border-indigo-500/50 text-indigo-200 shadow-lg shadow-indigo-500/10" : "bg-slate-800/50 border-slate-700 text-slate-400")}>
              <<divdiv className="flex items-center justify-between">
                <<divdiv className="flex items-center gap-3">
                  {item.status === 'completed' && <<CheckCheckCircle2 size={18} className="text-emerald-500" />}
                  <<spanspan className="text-sm font-medium">{item.content}</span>
                </div>
                {item.status === 'in_progress' && <<spanspan className="text-[10px] font-bold text-indigo-400">EXECUTING...</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
