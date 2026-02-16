
import { GoogleGenAI, Type } from "@google/genai";
import { QuizQuestion } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const COURSE_LIST = [
  "Chimie minérale", "Chimie organique", "Physique", "Informatique appliquée I", 
  "Chimie appliquée I", "Botanique I", "Zoologie", "Botanique II", 
  "Agronomie générale", "Productions végétales I", "Economie financière et sociale I", 
  "Agrométéorologie", "Sciences du sol", "Introduction aux problèmes environnementaux", 
  "Moteurs", "Machinisme", "Dessin", "Techniques de communication", 
  "Anglais I", "Biologie animale"
];

export const getTutorResponse = async (history: { role: string, parts: { text: string }[] }[], prompt: string) => {
  const model = ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: [...history, { role: 'user', parts: [{ text: prompt }] }],
    config: {
      systemInstruction: `Tu es un tuteur académique expert pour la plateforme PMC12 Academy. 
      Ton expertise couvre spécifiquement le programme suivant : ${COURSE_LIST.join(', ')}.
      Ton but est d'aider les élèves à comprendre ces concepts de manière simple et encourageante. 
      Structure tes réponses avec du Markdown. Si l'élève pose une question hors sujet, ramène-le doucement vers ses objectifs académiques.`,
    }
  });
  return (await model).text;
};

export const generateQuiz = async (topic: string): Promise<QuizQuestion[]> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Génère un quiz de 5 questions sur le sujet suivant: ${topic}. 
    C'est un cours de niveau universitaire. Réponds uniquement en format JSON.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            question: { type: Type.STRING },
            options: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            correctAnswer: { type: Type.INTEGER, description: "Index de la bonne réponse (0-3)" },
            explanation: { type: Type.STRING }
          },
          required: ["id", "question", "options", "correctAnswer", "explanation"]
        }
      }
    }
  });

  try {
    return JSON.parse(response.text || "[]");
  } catch (e) {
    console.error("Failed to parse quiz JSON", e);
    return [];
  }
};
