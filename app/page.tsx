"use client";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, FileText, Sparkles, LayoutDashboard, ChevronRight, CheckCircle2 } from "lucide-react";

const loadingSteps = [
  "Extracting text from PDF...",
  "Analyzing skills and experience...",
  "Consulting HR knowledge base...",
  "Drafting final evaluation...",
];

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);
  const [loadingTextIndex, setLoadingTextIndex] = useState(0);

  // Cycle through loading text to make it look highly advanced
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading) {
      interval = setInterval(() => {
        setLoadingTextIndex((prev) => (prev + 1) % loadingSteps.length);
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a PDF resume first!");
      return;
    }

    setLoading(true);
    setLoadingTextIndex(0);
    const formData = new FormData();
    formData.append("file", file);

    // --- SMART URL LOGIC ---
    // If you are on localhost, use the local Python server. 
    // If you are on the internet, use the Render server.
    const backendUrl = window.location.hostname === "localhost" 
      ? "http://localhost:8000/analyze" 
      : "https://ats-brain.onrender.com/analyze";

    try {
      const response = await fetch(backendUrl, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Server responded with an error");

      const data = await response.json();
      setResult(data.analysis);
      setStep(2);
    } catch (error) {
      console.error(error);
      alert("Error connecting to Python server. Make sure your backend is running!");
    }

    setLoading(false);
  };
  const handleReset = () => {
    setFile(null);
    setResult("");
    setStep(1);
  };

  return (
    <main className="min-h-screen bg-[#09090b] text-slate-200 font-sans selection:bg-blue-500/30 overflow-x-hidden relative">
      
      {/* 10/10 UPGRADE: Animated Aurora Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full mix-blend-screen animate-pulse duration-10000" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full mix-blend-screen animate-pulse duration-7000" />
      </div>

      <div className={`relative z-10 mx-auto transition-all duration-700 ${step === 1 ? 'max-w-2xl flex items-center justify-center min-h-screen p-6' : 'max-w-6xl p-6 md:p-12 min-h-screen'}`}>
        <AnimatePresence mode="wait">
          
          {/* ================= VIEW 1: PREMIUM UPLOAD ================= */}
          {step === 1 && (
            <motion.div 
              key="upload"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.5 }}
              className="w-full"
            >
              <div className="text-center space-y-4 mb-12">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", bounce: 0.5 }} className="inline-flex items-center justify-center p-3 bg-white/5 border border-white/10 rounded-2xl mb-4 shadow-2xl">
                  <Sparkles className="w-8 h-8 text-blue-400" />
                </motion.div>
                
                {/* 👉 CHANGE YOUR PROJECT NAME HERE 👈 */}
                <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-slate-200 to-slate-500 tracking-tight">
                  AI Resume Pro
                </h1>
                <p className="text-slate-400 text-lg max-w-lg mx-auto">Upload a resume and let our machine learning pipeline generate a comprehensive HR evaluation in seconds.</p>
              </div>

              <div className="bg-[#18181b]/80 backdrop-blur-2xl p-2 rounded-[2rem] shadow-2xl border border-white/5 ring-1 ring-white/10">
                <div className="bg-[#09090b] rounded-[1.8rem] p-8 md:p-12 border border-white/5 relative group overflow-hidden">
                  
                  {/* Glowing hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative flex flex-col items-center justify-center border-2 border-dashed border-slate-700/50 hover:border-blue-500/50 rounded-2xl p-12 transition-all duration-300 bg-white/[0.02]">
                    <UploadCloud className="w-20 h-20 text-slate-500 group-hover:text-blue-400 group-hover:-translate-y-2 transition-all duration-500 mb-6" />
                    <input 
                      type="file" accept=".pdf"
                      onChange={(e) => setFile(e.target.files?.[0] || null)}
                      className="block w-full text-sm text-slate-400 file:mr-4 file:py-3 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-white/10 file:text-white hover:file:bg-white/20 cursor-pointer transition-all mx-auto max-w-[280px]"
                    />
                    {file && <p className="mt-4 text-emerald-400 font-medium flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> {file.name} selected</p>}
                  </div>

                  <button 
                    onClick={handleUpload}
                    disabled={loading || !file}
                    className="w-full mt-8 py-5 px-6 bg-white text-black text-lg font-bold rounded-2xl shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex justify-center items-center gap-3 relative overflow-hidden"
                  >
                    {loading ? (
                      <AnimatePresence mode="wait">
                        <motion.span key={loadingTextIndex} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex items-center gap-2">
                          <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                          {loadingSteps[loadingTextIndex]}
                        </motion.span>
                      </AnimatePresence>
                    ) : (
                      <>Generate Analysis <ChevronRight className="w-5 h-5" /></>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* ================= VIEW 2: RESULTS DASHBOARD ================= */}
          {step === 2 && (
            <motion.div 
              key="results"
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              {/* Sleek Header */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                <div className="flex items-center gap-5">
                  <div className="p-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md shadow-xl">
                    <LayoutDashboard className="w-8 h-8 text-blue-400" />
                  </div>
                  <div>
                    <h2 className="text-4xl font-black text-white tracking-tight">Executive Report</h2>
                    <p className="text-slate-400 mt-1">AI-generated HR insights & analytics</p>
                  </div>
                </div>
                <button onClick={handleReset} className="py-3 px-6 bg-white/5 hover:bg-white/10 text-white font-medium rounded-xl border border-white/10 transition-all flex items-center gap-2 backdrop-blur-md">
                  Analyze Another Document
                </button>
              </div>

              {/* The Masterpiece Results Card */}
              <div className="bg-[#18181b]/60 backdrop-blur-3xl p-8 md:p-14 rounded-[2.5rem] shadow-2xl border border-white/10 ring-1 ring-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />
                
                <div className="relative z-10 text-slate-300 leading-relaxed text-lg">
                  <ReactMarkdown 
                    components={{
                      h2: ({node, ...props}) => <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 mb-10 pb-6 border-b border-white/10 inline-block" {...props} />,
                      h3: ({node, ...props}) => <h3 className="text-2xl font-bold text-white mt-16 mb-8 flex items-center gap-3" {...props} />,
                      strong: ({node, ...props}) => <strong className="font-bold text-white bg-white/10 px-1.5 py-0.5 rounded-md" {...props} />,
                      ul: ({node, ...props}) => <ul className="grid grid-cols-1 gap-4 mb-10 mt-6" {...props} />,
                      li: ({ children }) => (
                        <motion.li 
                          initial={{ opacity: 0, x: -20 }} 
                          animate={{ opacity: 1, x: 0 }} 
                          transition={{ duration: 0.5 }} 
                          className="bg-black/40 p-6 md:p-8 rounded-2xl border border-white/5 hover:border-white/15 transition-colors shadow-lg leading-relaxed text-slate-300 flex flex-col gap-2"
                        >
                          {children}
                        </motion.li>
                      ),
                      p: ({node, ...props}) => <p className="mb-6 text-slate-400 text-[1.1rem] leading-loose max-w-4xl" {...props} />
                    }}
                  >
                    {result}
                  </ReactMarkdown>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </main>
  );
}