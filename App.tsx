
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Courses from './components/Courses';
import AIChat from './components/AIChat';
import QuizModule from './components/QuizModule';
import { ViewState } from './types';
import { Bell, Search } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setView] = useState<ViewState>(ViewState.DASHBOARD);
  const [activeSubject, setActiveSubject] = useState<string | undefined>(undefined);

  const startTutorOnSubject = (subject: string) => {
    setActiveSubject(subject);
    setView(ViewState.TUTOR);
  };

  const startQuizOnSubject = (subject: string) => {
    setActiveSubject(subject);
    setView(ViewState.QUIZ);
  };

  const navigateToView = (view: ViewState) => {
    setActiveSubject(undefined);
    setView(view);
  };

  const renderContent = () => {
    switch (currentView) {
      case ViewState.DASHBOARD:
        return <Dashboard />;
      case ViewState.COURSES:
        return <Courses onStartTutor={startTutorOnSubject} onStartQuiz={startQuizOnSubject} />;
      case ViewState.TUTOR:
        return <AIChat initialSubject={activeSubject} />;
      case ViewState.QUIZ:
        return <QuizModule initialSubject={activeSubject} />;
      case ViewState.DOCUMENTS:
        return (
          <div className="flex flex-col items-center justify-center h-96 text-slate-400">
            <p className="text-xl">Gestionnaire de documents bientôt disponible.</p>
          </div>
        );
      case ViewState.SETTINGS:
        return (
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold">Paramètres</h2>
            <div className="bg-white p-6 rounded-2xl shadow-sm space-y-4">
              <div className="flex items-center justify-between py-2 border-b border-slate-100">
                <span>Mode Sombre</span>
                <div className="w-12 h-6 bg-slate-200 rounded-full relative"><div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 shadow-sm"></div></div>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-slate-100">
                <span>Notifications de rappel</span>
                <div className="w-12 h-6 bg-blue-600 rounded-full relative"><div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 shadow-sm"></div></div>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Langue de l'IA</span>
                <span className="font-semibold text-blue-600">Français (FR)</span>
              </div>
            </div>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50">
      <Sidebar currentView={currentView} setView={navigateToView} />
      
      <main className="flex-1 ml-64 p-8">
        <header className="flex justify-between items-center mb-10 bg-white/50 backdrop-blur-md sticky top-0 py-4 z-10 -mx-8 px-8 border-b border-slate-200/50">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Rechercher un cours (ex: Botanique)..." 
              className="w-full bg-white/80 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 transition-all outline-none"
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-500 hover:text-blue-600 transition-colors">
              <Bell size={22} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-px bg-slate-200 mx-2"></div>
            <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-full pl-1.5 pr-4 py-1.5 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">JD</div>
              <div className="hidden sm:block">
                <p className="text-xs font-bold text-slate-900 leading-none">Étudiant PMC12</p>
                <p className="text-[10px] text-slate-500 mt-1">Session active</p>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
