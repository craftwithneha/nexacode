// "use client";

// import { useState } from "react";
// import { Loader2, Send } from "lucide-react";
// import { Input } from "./ui/input";
// import { Button } from "./ui/button";

// export default function AIChat() {
//   const [prompt, setPrompt] = useState("");
//   const [response, setResponse] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!prompt.trim()) return;

//     setLoading(true);
//     setResponse("");

//     const res = await fetch("/api/ai", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ prompt }),
//     });

//     const data = await res.json();
//     setResponse(data.message);
//     setLoading(false);
//   };

//   return (
//     <div className="mt-8 w-full max-w-3xl mx-auto px-4 sm:px-6">
//       <div className="bg-zinc-900 rounded-2xl shadow-xl border border-zinc-800 p-6">
//         {/* Chat Box */}
//         <div className="h-80 overflow-y-auto space-y-4 p-2 bg-zinc-950 rounded-lg border border-zinc-800">
//           {/* User Message */}
//           {prompt && (
//             <div className="flex justify-end">
//               <div className="bg-blue-600 text-white px-4 py-2 rounded-lg max-w-sm">
//                 {prompt}
//               </div>
//             </div>
//           )}

//           {/* AI Message */}
//           {loading && (
//             <div className="flex items-center gap-2 text-gray-400">
//               <Loader2 className="h-4 w-4 animate-spin" />
//               <p>Codemate AI is thinking...</p>
//             </div>
//           )}
//           {response && (
//             <div className="flex justify-start">
//               <div className="bg-gray-800 text-green-400 px-4 py-2 rounded-lg max-w-sm whitespace-pre-wrap">
//                 {response}
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Input Box */}
//         <form
//           onSubmit={handleSubmit}
//           className="mt-4 flex items-center gap-2"
//         >
//           <Input
//             className="flex-1 p-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Ask Codemate AI..."
//             value={prompt}
//             onChange={(e) => setPrompt(e.target.value)}
//           />
//           <Button
//             type="submit"
//             disabled={loading}
//             className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white flex items-center gap-2 disabled:opacity-50"
//           >
//             <Send className="w-4 h-4" /> Send
//           </Button>
//         </form>
//       </div>
//     </div>
//   );
// }


'use client';

import { useState, useRef, useEffect } from "react";
import { Loader2, Send, Copy, Check } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

type Message = {
  role: "user" | "ai";
  content: string;
};

export default function AIChat() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    const userMsg: Message = { role: "user", content: prompt };
    setMessages((prev) => [...prev, userMsg]);
    setPrompt("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      const aiMsg: Message = { role: "ai", content: data.message };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (content: string, idx: number) => {
    navigator.clipboard.writeText(content);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  return (
    <div className="mt-8 w-full max-w-3xl mx-auto px-4 sm:px-6 flex flex-col h-[600px]">
      <div className="flex-1 flex flex-col bg-black/70 border border-emerald-500/20 rounded-2xl shadow-xl overflow-hidden">
        {/* Chat Area */}
        <div
          ref={chatRef}
          className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-emerald-500 scrollbar-track-transparent"
        >
          {messages.length === 0 && !loading && (
            <div className="text-center text-zinc-400 mt-24">
              <p className="text-lg font-medium">💬 Welcome to CodeMate AI</p>
              <p className="text-sm mt-1">Ask your first question to get started 🚀</p>
            </div>
          )}

          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} relative group`}
            >
              {/* Avatar */}
              {msg.role === "ai" && (
                <div className="w-8 h-8 rounded-full bg-emerald-500/30 flex items-center justify-center text-xs shadow-md mr-2">
                  🤖
                </div>
              )}

              {/* Message Bubble */}
              <div
                className={`relative max-w-[70%] px-4 py-3 rounded-2xl shadow-xl backdrop-blur-xl transition hover:scale-[1.02] ${
                  msg.role === "user"
                    ? "bg-gradient-to-r from-emerald-400 to-emerald-300 text-black"
                    : "bg-gradient-to-br from-white/10 via-emerald-500/5 to-transparent border border-emerald-400/20 text-emerald-100"
                }`}
              >
                <div className="text-sm whitespace-pre-wrap">{msg.content}</div>

                {/* Copy Button */}
                {msg.role === "ai" && (
                  <Button
                    onClick={() => copyToClipboard(msg.content, idx)}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition bg-black/40 hover:bg-black/60 p-1.5 rounded-lg"
                  >
                    {copiedIndex === idx ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4 text-emerald-300" />
                    )}
                  </Button>
                )}

                {/* Neon Glow */}
                {msg.role === "ai" && (
                  <div className="absolute -top-4 -right-4 w-20 h-20 bg-emerald-500/20 blur-3xl rounded-full opacity-40 animate-pulse"></div>
                )}
              </div>
            </div>
          ))}

          {/* Loading */}
          {loading && (
            <div className="flex items-center gap-2 text-emerald-400 animate-fadeIn">
              <Loader2 className="h-4 w-4 animate-spin" />
              <p>CodeMate AI is thinking...</p>
            </div>
          )}
        </div>

        {/* Input */}
        <form
          onSubmit={handleSubmit}
          className="flex px-4 py-3 border-t border-emerald-500/20 bg-black/80 backdrop-blur-md gap-2"
        >
          <Input
            placeholder="Ask CodeMate AI..."
            className="flex-1 rounded-xl bg-zinc-900/90 border border-zinc-700 text-white placeholder-zinc-500 focus:ring-2 focus:ring-emerald-500"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <Button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-emerald-400 to-emerald-300 hover:from-emerald-500 hover:to-emerald-400 rounded-xl px-4 py-2 flex items-center gap-2 disabled:opacity-50"
          >
            <Send className="w-4 h-4" /> Send
          </Button>
        </form>
      </div>
    </div>
  );
}
