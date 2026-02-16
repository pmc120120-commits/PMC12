
import React, { useState, useEffect } from 'react';
import { Search, GraduationCap, ArrowRight, CheckCircle2, XCircle, RefreshCcw, Loader2 } from 'lucide-react';
import { QuizQuestion } from '../types';
import { generateQuiz } from '../services/geminiService';

interface QuizModuleProps {
  initialSubject?: string;
}

const QuizModule: React.FC<QuizModuleProps> = ({ initialSubject }) => {
  const [topic, setTopic] = useState(initialSubject || '');
  const [loading, setLoading] = useState(false);
  const [quiz, setQuiz] = useState<QuizQuestion[] | null>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (initialSubject) {
      startQuiz();
    }
  }, [initialSubject]);

  const startQuiz = async () => {
    const subjectToUse = topic || initialSubject;
    if (!subjectToUse?.trim()) return;
    
    setLoading(true);
    try {
      const generated = await generateQuiz(subjectToUse);
      setQuiz(generated);
      setAnswers([]);
      setCurrentIdx(0);
      setShowResults(false);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (optionIdx: number) => {
    const newAnswers = [...answers];
    newAnswers[currentIdx] = optionIdx;
    setAnswers(newAnswers);

    if (currentIdx < (quiz?.length || 0) - 1) {
      setTimeout(() => setCurrentIdx(currentIdx + 1), 300);
    } else {
      setTimeout(() => setShowResults(true), 300);
    }
  };

  const reset = () => {
    setQuiz(null);
    setTopic('');
  };

  if (loading) {
    return (
      <div className="h-96 flex flex-col items-center justify-center space-y-4">
        <Loader2 size={48} className="text-blue-600 animate-spin" />
        <h3 className="text-xl font-semibold">Génération de ton quiz sur {topic || initialSubject}...</h3>
        <p className="text-slate-500">L'IA PMC12 prépare des questions pertinentes pour toi.</p>
      </div>
    );
  }

  if (showResults && quiz) {
    const score = answers.reduce((acc, ans, idx) => acc + (ans === quiz[idx].correctAnswer ? 1 : 0), 0);
    return (
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-slate-200 animate-in zoom-in duration-300">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 text-blue-600 mb-4">
            <GraduationCap size={40} />
          </div>
          <h2 className="text-3xl font-bold text-slate-900">Quiz Terminé !</h2>
          <p className="text-slate-500 mt-2">Sujet : <span className="font-semibold text-blue-600">{topic || initialSubject}</span></p>
        </div>

        <div className="bg-slate-50 rounded-2xl p-6 mb-8 flex justify-around">
          <div className="text-center">
            <p className="text-sm text-slate-500 uppercase tracking-wider font-bold">Score</p>
            <p className="text-4xl font-black text-blue-600">{Math.round((score / quiz.length) * 100)}%</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-slate-500 uppercase tracking-wider font-bold">Réponses</p>
            <p className="text-4xl font-black text-slate-900">{score} / {quiz.length}</p>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          {quiz.map((q, i) => (
            <div key={q.id} className="p-4 border border-slate-100 rounded-xl bg-slate-50">
              <div className="flex items-start gap-3">
                {answers[i] === q.correctAnswer ? (
                  <CheckCircle2 className="text-emerald-500 shrink-0 mt-1" size={18} />
                ) : (
                  <XCircle className="text-red-500 shrink-0 mt-1" size={18} />
                )}
                <div>
                  <p className="text-sm font-semibold text-slate-900 mb-1">{q.question}</p>
                  <p className="text-xs text-slate-500 italic">{q.explanation}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-4">
          <button onClick={reset} className="flex-1 py-3 px-6 rounded-xl border-2 border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
            <RefreshCcw size={18} /> Recommencer
          </button>
          <button onClick={() => setQuiz(null)} className="flex-1 py-3 px-6 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
            Autre Sujet
          </button>
        </div>
      </div>
    );
  }

  if (quiz) {
    const q = quiz[currentIdx];
    return (
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <span className="text-sm font-bold text-blue-600 uppercase tracking-widest">Question {currentIdx + 1} de {quiz.length}</span>
          <div className="w-48 h-2 bg-slate-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-600 transition-all duration-500" 
              style={{ width: `${((currentIdx + 1) / quiz.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 animate-in slide-in-from-right-4 duration-300">
          <h3 className="text-2xl font-bold text-slate-900 mb-8 leading-tight">{q.question}</h3>
          
          <div className="space-y-3">
            {q.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                className="w-full text-left p-5 rounded-2xl border-2 border-slate-100 hover:border-blue-200 hover:bg-blue-50 transition-all flex items-center justify-between group"
              >
                <span className="text-slate-700 font-medium group-hover:text-blue-700">{opt}</span>
                <ArrowRight size={18} className="text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto pt-12 text-center">
      <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-amber-100 text-amber-600 mb-8">
        <GraduationCap size={48} />
      </div>
      <h2 className="text-4xl font-brand text-slate-900 mb-4">Générateur de Quiz intelligent</h2>
      <p className="text-slate-500 text-lg mb-12 max-w-xl mx-auto">
        Saisis un sujet de ton programme (ex: Chimie organique, Machinisme) et notre IA créera un test pour évaluer tes connaissances.
      </p>

      <div className="relative max-w-lg mx-auto">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && startQuiz()}
          placeholder="Ex: Botanique, Agrométéorologie..."
          className="w-full bg-white border-2 border-slate-100 rounded-2xl px-6 py-4 pr-16 shadow-lg text-lg focus:border-blue-500 transition-all outline-none"
        />
        <button 
          onClick={startQuiz}
          disabled={!topic.trim()}
          className="absolute right-2 top-2 bottom-2 bg-blue-600 text-white px-4 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          <Search size={24} />
        </button>
      </div>

      <div className="mt-12 flex flex-wrap justify-center gap-3">
        {['Chimie minérale', 'Agronomie générale', 'Moteurs', 'Zoologie'].map(t => (
          <button 
            key={t}
            onClick={() => setTopic(t)}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 text-sm font-semibold rounded-full transition-colors"
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizModule;
