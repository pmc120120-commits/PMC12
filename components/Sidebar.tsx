
import React from 'react';
import { LayoutDashboard, MessageSquareText, GraduationCap, FileText, Settings, LogOut, BookOpen } from 'lucide-react';
import { ViewState } from '../types';
import Logo from './Logo';

interface SidebarProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView }) => {
  const navItems = [
    { id: ViewState.DASHBOARD, label: 'Tableau de bord', icon: LayoutDashboard },
    { id: ViewState.COURSES, label: 'Mes Cours', icon: BookOpen },
    { id: ViewState.TUTOR, label: 'Tuteur IA', icon: MessageSquareText },
    { id: ViewState.QUIZ, label: 'Quiz Interactifs', icon: GraduationCap },
    { id: ViewState.DOCUMENTS, label: 'Documents', icon: FileText },
  ];

  return (
    <aside className="w-64 h-screen bg-slate-900 text-slate-300 flex flex-col fixed left-0 top-0">
      <div className="p-6 flex items-center gap-3 border-b border-slate-800">
        <Logo size="sm" />
        <div>
          <h1 className="text-white font-bold text-lg leading-tight">PMC12</h1>
          <p className="text-xs text-slate-500">Academy</p>
        </div>
      </div>

      <nav className="flex-1 mt-6 px-4 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              currentView === item.id
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50'
                : 'hover:bg-slate-800 hover:text-white'
            }`}
          >
            <item.icon size={20} />
            <span className="font-medium text-sm">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800 space-y-1">
        <button
          onClick={() => setView(ViewState.SETTINGS)}
          className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors ${
            currentView === ViewState.SETTINGS ? 'text-white bg-slate-800' : ''
          }`}
        >
          <Settings size={18} />
          <span className="text-sm">Paramètres</span>
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-red-500/10 hover:text-red-400 transition-colors">
          <LogOut size={18} />
          <span className="text-sm">Déconnexion</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
