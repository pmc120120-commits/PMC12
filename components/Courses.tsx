
import React from 'react';
import { Beaker, TreePine, Tractor, Zap, Monitor, Bird, ThermometerSun, Leaf, Settings2, PenTool, MessageSquare, GraduationCap, Globe, Users, Book } from 'lucide-react';
import { ViewState } from '../types';

interface CoursesProps {
  onStartTutor: (subject: string) => void;
  onStartQuiz: (subject: string) => void;
}

const courses = [
  { name: "Chimie minérale", icon: Beaker, cat: "Science", color: "text-blue-600 bg-blue-50" },
  { name: "Chimie organique", icon: Beaker, cat: "Science", color: "text-blue-600 bg-blue-50" },
  { name: "Physique", icon: Zap, cat: "Science", color: "text-amber-600 bg-amber-50" },
  { name: "Informatique appliquée I", icon: Monitor, cat: "Tech", color: "text-slate-600 bg-slate-50" },
  { name: "Chimie appliquée I", icon: Beaker, cat: "Science", color: "text-blue-600 bg-blue-50" },
  { name: "Botanique I", icon: TreePine, cat: "Agro", color: "text-emerald-600 bg-emerald-50" },
  { name: "Zoologie", icon: Bird, cat: "Science", color: "text-orange-600 bg-orange-50" },
  { name: "Botanique II", icon: Leaf, cat: "Agro", color: "text-emerald-600 bg-emerald-50" },
  { name: "Agronomie générale", icon: Tractor, cat: "Agro", color: "text-emerald-600 bg-emerald-50" },
  { name: "Productions végétales I", icon: Leaf, cat: "Agro", color: "text-emerald-600 bg-emerald-50" },
  { name: "Economie financière et sociale I", icon: Globe, cat: "Autre", color: "text-indigo-600 bg-indigo-50" },
  { name: "Agrométéorologie", icon: ThermometerSun, cat: "Agro", color: "text-cyan-600 bg-cyan-50" },
  { name: "Sciences du sol", icon: Tractor, cat: "Agro", color: "text-amber-800 bg-amber-50" },
  { name: "Introduction aux problèmes environnementaux", icon: Globe, cat: "Agro", color: "text-emerald-700 bg-emerald-50" },
  { name: "Moteurs", icon: Settings2, cat: "Tech", color: "text-slate-700 bg-slate-100" },
  { name: "Machinisme", icon: Tractor, cat: "Tech", color: "text-slate-700 bg-slate-100" },
  { name: "Dessin", icon: PenTool, cat: "Tech", color: "text-purple-600 bg-purple-50" },
  { name: "Techniques de communication", icon: Users, cat: "Autre", color: "text-pink-600 bg-pink-50" },
  { name: "Anglais I", icon: MessageSquare, cat: "Langue", color: "text-blue-700 bg-blue-50" },
  { name: "Biologie animale", icon: Bird, cat: "Science", color: "text-orange-600 bg-orange-50" },
];

const Courses: React.FC<CoursesProps> = ({ onStartTutor, onStartQuiz }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h2 className="text-3xl font-bold text-slate-900">Mon Programme</h2>
        <p className="text-slate-500">Accède rapidement à tes supports d'étude et quiz par matière.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {courses.map((course, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
            <div className="flex items-center gap-4 mb-6">
              <div className={`p-3 rounded-xl ${course.color}`}>
                <course.icon size={24} />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{course.cat}</span>
                <h3 className="text-lg font-bold text-slate-800 leading-tight">{course.name}</h3>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => onStartTutor(course.name)}
                className="flex items-center justify-center gap-2 py-2 px-3 bg-slate-50 hover:bg-blue-600 hover:text-white text-slate-600 rounded-xl text-xs font-semibold transition-all"
              >
                <MessageSquare size={14} /> Tuteur IA
              </button>
              <button 
                onClick={() => onStartQuiz(course.name)}
                className="flex items-center justify-center gap-2 py-2 px-3 bg-slate-50 hover:bg-amber-500 hover:text-white text-slate-600 rounded-xl text-xs font-semibold transition-all"
              >
                <GraduationCap size={14} /> Quiz
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
