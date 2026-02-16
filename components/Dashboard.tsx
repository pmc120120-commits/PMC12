
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { BookOpen, Trophy, Clock, BrainCircuit } from 'lucide-react';
import { StudyStat } from '../types';

const data: StudyStat[] = [
  { day: 'Lun', hours: 2.5, quizzes: 4 },
  { day: 'Mar', hours: 3.2, quizzes: 2 },
  { day: 'Mer', hours: 1.8, quizzes: 5 },
  { day: 'Jeu', hours: 4.0, quizzes: 3 },
  { day: 'Ven', hours: 2.1, quizzes: 6 },
  { day: 'Sam', hours: 0.5, quizzes: 1 },
  { day: 'Dim', hours: 1.2, quizzes: 2 },
];

const StatCard = ({ icon: Icon, label, value, color }: any) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-start gap-4">
    <div className={`p-3 rounded-xl ${color}`}>
      <Icon className="text-white" size={24} />
    </div>
    <div>
      <p className="text-slate-500 text-sm font-medium">{label}</p>
      <h3 className="text-2xl font-bold text-slate-900 mt-1">{value}</h3>
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h2 className="text-3xl font-bold text-slate-900">Bon retour, Étudiant !</h2>
        <p className="text-slate-500">Voici un aperçu de tes progrès cette semaine.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={BookOpen} label="Chapitres Lus" value="12" color="bg-blue-500" />
        <StatCard icon={Trophy} label="Score Moyen" value="94%" color="bg-amber-500" />
        <StatCard icon={Clock} label="Temps d'étude" value="15.3h" color="bg-emerald-500" />
        <StatCard icon={BrainCircuit} label="Concepts Maîtrisés" value="28" color="bg-purple-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-900 mb-6">Heures d'étude par jour</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} 
                />
                <Area type="monotone" dataKey="hours" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorHours)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-900 mb-6">Quiz complétés</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                   cursor={{fill: '#f8fafc'}}
                   contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} 
                />
                <Bar dataKey="quizzes" fill="#f59e0b" radius={[4, 4, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Recommandations IA</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 rounded-xl bg-blue-50 border border-blue-100 text-blue-800">
            <BrainCircuit className="shrink-0" />
            <p className="text-sm">Tu as bien progressé en <b>Algèbre Linéaire</b>. Je te suggère d'attaquer les matrices inverses aujourd'hui !</p>
          </div>
          <div className="flex items-center gap-4 p-4 rounded-xl bg-amber-50 border border-amber-100 text-amber-800">
            <Clock className="shrink-0" />
            <p className="text-sm">N'oublie pas de réviser ton quiz de <b>Physique Optique</b>. C'est le bon moment pour consolider tes acquis.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
