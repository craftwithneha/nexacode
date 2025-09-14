// "use client";

// import { useState, useRef, useEffect } from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Send, Copy, Check, Bot, Terminal } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { UserButton, useUser } from "@clerk/nextjs";
// import Image from "next/image";
// import ReactMarkdown from "react-markdown";
// import type { ComponentProps } from "react";
// import { motion } from "framer-motion";

// //  Added timestamp to each message
// type Message = {
//   role: "user" | "assistant";
//   content: string;
//   timestamp: string;
// };

// export default function DashboardPage() {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
//   const chatRef = useRef<HTMLDivElement>(null);
//   const { user } = useUser();

//   const getCurrentTime = () => {
//     return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
//   };

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     // Add user message with timestamp
//     const userMessage: Message = { role: "user", content: input, timestamp: getCurrentTime() };
//     setMessages((prev) => [...prev, userMessage]);
//     setInput("");
//     setLoading(true);

//     try {
//       const res = await fetch("/api/ai", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ prompt: input }),
//       });
//       const data = await res.json();

//       // Add assistant message with timestamp
//       const aiMessage: Message = {
//         role: "assistant",
//         content: data.message,
//         timestamp: getCurrentTime(),
//       };

//       setTimeout(() => {
//         setMessages((prev) => [...prev, aiMessage]);
//       }, 400);
//     } catch (error) {
//       console.error("API error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleKeyDown = (e: React.KeyboardEvent) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       sendMessage();
//     }
//   };

//   const copyToClipboard = (content: string, idx: number) => {
//     navigator.clipboard.writeText(content);
//     setCopiedIndex(idx);
//     setTimeout(() => setCopiedIndex(null), 2000);
//   };

//   useEffect(() => {
//     chatRef.current?.scrollTo({
//       top: chatRef.current.scrollHeight,
//       behavior: "smooth",
//     });
//   }, [messages, loading]);

//   return (
//     <div className="flex flex-col h-screen bg-gradient-to-b from-black via-[#0a0a0a] to-[#000000] text-white">
//       {/* Header */}
//       <header className="px-6 py-4 bg-black/60 border-b border-[#60FCB6]/40 shadow-lg backdrop-blur-md flex items-center justify-between neon-glow">
//         <h1 className="text-xl font-extrabold text-[#60FCB6] drop-shadow-[0_0_15px_rgba(96,252,182,0.7)]">
//           CodeMate AI
//         </h1>
//         <UserButton afterSignOutUrl="/" />
//       </header>

//       {/* Chat Container */}
//       <div
//         ref={chatRef}
//         className="flex-1 overflow-y-auto px-4 py-6 space-y-6 scrollbar-thin scrollbar-thumb-[#60FCB6]/50 scrollbar-track-transparent"
//       >
//         {messages.length === 0 && !loading && (
//           <div className="flex flex-col items-center justify-center h-full text-center text-zinc-400 space-y-3">
//             <div className="p-6 rounded-full bg-[#60FCB6]/20 shadow-[0_0_30px_rgba(96,252,182,0.4)]">
//               <Bot size={100} className="text-[#60FCB6]" />
//             </div>
//             <h2 className="text-xl mt-8 font-bold text-[#60FCB6] animate-pulse">
//               Welcome to NexaCode AI
//             </h2>
//           </div>
//         )}

//         {messages.map((msg, idx) => (
//           <motion.div
//             key={idx}
//             initial={{ opacity: 0, y: 15 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.4, ease: "easeOut" }}
//             className={cn(
//               "flex gap-3 items-end",
//               msg.role === "user" ? "justify-end" : "justify-start"
//             )}
//           >
//             {/* Assistant avatar */}
//             {msg.role === "assistant" && (
//               <div className="w-10 h-10 rounded-full bg-[#60FCB6]/20 flex items-center justify-center shadow-lg neon-glow border border-[#60FCB6]/50">
//                 <Bot size={20} className="text-[#60FCB6]" />
//               </div>
//             )}

//             {/* Message bubble + timestamp */}
//             <div className="flex flex-col max-w-[88%] sm:max-w-[75%] md:max-w-[65%]">
//               <div
//                 className={cn(
//                   "relative px-5 py-4 rounded-3xl shadow-lg backdrop-blur-xl text-white",
//                   msg.role === "user"
//                     ? "bg-zinc-800/60 border border-zinc-500/30 text-right"
//                     : "bg-[#0d0d0d]/60 border border-[#60FCB6]/40 shadow-[0_0_15px_rgba(96,252,182,0.4)] text-left"
//                 )}
//               >
//                 {/* Sender label */}
//                 <div
//                   className={cn(
//                     "inline-block text-xs mb-3 px-3 py-1 rounded-full font-semibold backdrop-blur-md border tracking-wide",
//                     msg.role === "user"
//                       ? "bg-zinc-700/60 border-zinc-500/30 text-zinc-300"
//                       : "bg-[#60FCB6]/20 border-[#60FCB6]/40 text-[#60FCB6]"
//                   )}
//                 >
//                   {msg.role === "user" ? user?.username || "You" : "CodeMate AI"}
//                 </div>

//                 {/* Content */}
//                 <div className="prose prose-invert max-w-none text-sm leading-relaxed space-y-2">
//                   <ReactMarkdown
//                     components={{
//                       pre: ({ ...props }: ComponentProps<"pre">) => (
//                         <pre
//                           className="bg-black/40 rounded-lg p-3 overflow-x-auto my-2 border border-[#60FCB6]/30 shadow-inner"
//                           {...props}
//                         />
//                       ),
//                       code: ({ ...props }: ComponentProps<"code">) => (
//                         <code
//                           className="bg-[#111111]/60 rounded px-1 py-0.5 text-[#60FCB6] font-mono text-sm"
//                           {...props}
//                         />
//                       ),
//                     }}
//                   >
//                     {msg.content}
//                   </ReactMarkdown>
//                 </div>

//                 {/* Copy button (assistant only) */}
//                 {msg.role === "assistant" && (
//                   <Button
//                     onClick={() => copyToClipboard(msg.content, idx)}
//                     className="absolute top-2 right-2 bg-black/40 hover:bg-[#111]/70 p-1.5 rounded-lg transition"
//                   >
//                     {copiedIndex === idx ? (
//                       <Check className="w-4 h-4 text-green-400" />
//                     ) : (
//                       <Copy className="w-4 h-4 text-[#60FCB6]" />
//                     )}
//                   </Button>
//                 )}
//               </div>

//               {/* Timestamp */}
//               <p
//                 className={cn(
//                   "text-[10px] mt-1 text-zinc-400 italic",
//                   msg.role === "user" ? "text-left" : "text-right"
//                 )}
//               >
//                 {msg.timestamp}
//               </p>
//             </div>

//             {/* User avatar */}
//             {msg.role === "user" &&
//               (user?.imageUrl ? (
//                 <Image
//                   src={user.imageUrl}
//                   alt="User"
//                   width={40}
//                   height={40}
//                   className="w-10 h-10 rounded-full border-2 border-zinc-400 shadow-lg"
//                 />
//               ) : (
//                 <div className="w-10 h-10 rounded-full bg-zinc-700 flex items-center justify-center shadow-md">
//                   <Terminal size={20} className="text-white" />
//                 </div>
//               ))}
//           </motion.div>
//         ))}
//       </div>

//       {/* Input */}
//       <form
//         onSubmit={(e) => {
//           e.preventDefault();
//           sendMessage();
//         }}
//         className="border-t border-[#60FCB6]/30 px-4 sm:px-6 py-4 flex flex-col sm:flex-row gap-3 bg-black/80 backdrop-blur-lg"
//       >
//         <Input
//           className="flex-1 bg-zinc-900/80 text-white placeholder-zinc-500 border border-zinc-700 rounded-xl focus:ring-2 focus:ring-[#60FCB6] focus:border-[#60FCB6] transition"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={handleKeyDown}
//           placeholder="Ask to NexaCode something..."
//         />
//         <Button
//           type="submit"
//           disabled={loading}
//           className="bg-gradient-to-r from-[#60FCB6] to-[#2de6a3] hover:scale-[1.05] transition-all text-black font-semibold rounded-xl w-full sm:w-auto shadow-lg"
//         >
//           <Send className="w-4 h-4" />
//         </Button>
//       </form>
//     </div>
//   );
// }



"use client";

import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Copy, Check, Bot, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import type { ComponentProps } from "react";
import { motion } from "framer-motion";

// Message type with timestamp
type Message = {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
};

export default function DashboardPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = { role: "user", content: input, timestamp: getCurrentTime() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });
      const data = await res.json();

      // Add assistant message
      const aiMessage: Message = {
        role: "assistant",
        content: data.message,
        timestamp: getCurrentTime(),
      };

      setTimeout(() => {
        setMessages((prev) => [...prev, aiMessage]);
      }, 400);
    } catch (error) {
      console.error("API error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
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
    <div className="flex flex-col h-screen bg-gradient-to-b from-black via-[#0a0a0a] to-[#000000] text-white">
      {/* Header */}
      <header className="px-6 py-4 bg-black/60 border-b border-[#60FCB6]/40 shadow-lg backdrop-blur-md flex items-center justify-between neon-glow">
        <h1 className="text-xl font-extrabold text-[#60FCB6] drop-shadow-[0_0_15px_rgba(96,252,182,0.7)]">
          CodeMate AI
        </h1>
      </header>

      {/* Chat Container */}
      <div
        ref={chatRef}
        className="flex-1 overflow-y-auto px-4 py-6 space-y-6 scrollbar-thin scrollbar-thumb-[#60FCB6]/50 scrollbar-track-transparent"
      >
        {messages.length === 0 && !loading && (
          <div className="flex flex-col items-center justify-center h-full text-center text-zinc-400 space-y-3">
            <div className="p-6 rounded-full bg-[#60FCB6]/20 shadow-[0_0_30px_rgba(96,252,182,0.4)]">
              <Bot size={100} className="text-[#60FCB6]" />
            </div>
            <h2 className="text-xl mt-8 font-bold text-[#60FCB6] animate-pulse">
              Welcome to NexaCode AI
            </h2>
          </div>
        )}

        {messages.map((msg, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={cn(
              "flex gap-3 items-end",
              msg.role === "user" ? "justify-end" : "justify-start"
            )}
          >
            {/* Assistant avatar */}
            {msg.role === "assistant" && (
              <div className="w-10 h-10 rounded-full bg-[#60FCB6]/20 flex items-center justify-center shadow-lg neon-glow border border-[#60FCB6]/50">
                <Bot size={20} className="text-[#60FCB6]" />
              </div>
            )}

            {/* Message bubble + timestamp */}
            <div className="flex flex-col max-w-[88%] sm:max-w-[75%] md:max-w-[65%]">
              <div
                className={cn(
                  "relative px-5 py-4 rounded-3xl shadow-lg backdrop-blur-xl text-white",
                  msg.role === "user"
                    ? "bg-zinc-800/60 border border-zinc-500/30 text-right"
                    : "bg-[#0d0d0d]/60 border border-[#60FCB6]/40 shadow-[0_0_15px_rgba(96,252,182,0.4)] text-left"
                )}
              >
                {/* Sender label */}
                <div
                  className={cn(
                    "inline-block text-xs mb-3 px-3 py-1 rounded-full font-semibold backdrop-blur-md border tracking-wide",
                    msg.role === "user"
                      ? "bg-zinc-700/60 border-zinc-500/30 text-zinc-300"
                      : "bg-[#60FCB6]/20 border-[#60FCB6]/40 text-[#60FCB6]"
                  )}
                >
                  {msg.role === "user" ? "You" : "CodeMate AI"}
                </div>

                {/* Content */}
                <div className="prose prose-invert max-w-none text-sm leading-relaxed space-y-2">
                  <ReactMarkdown
                    components={{
                      pre: ({ ...props }: ComponentProps<"pre">) => (
                        <pre
                          className="bg-black/40 rounded-lg p-3 overflow-x-auto my-2 border border-[#60FCB6]/30 shadow-inner"
                          {...props}
                        />
                      ),
                      code: ({ ...props }: ComponentProps<"code">) => (
                        <code
                          className="bg-[#111111]/60 rounded px-1 py-0.5 text-[#60FCB6] font-mono text-sm"
                          {...props}
                        />
                      ),
                    }}
                  >
                    {msg.content}
                  </ReactMarkdown>
                </div>

                {/* Copy button (assistant only) */}
                {msg.role === "assistant" && (
                  <Button
                    onClick={() => copyToClipboard(msg.content, idx)}
                    className="absolute top-2 right-2 bg-black/40 hover:bg-[#111]/70 p-1.5 rounded-lg transition"
                  >
                    {copiedIndex === idx ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4 text-[#60FCB6]" />
                    )}
                  </Button>
                )}
              </div>

              {/* Timestamp */}
              <p
                className={cn(
                  "text-[10px] mt-1 text-zinc-400 italic",
                  msg.role === "user" ? "text-left" : "text-right"
                )}
              >
                {msg.timestamp}
              </p>
            </div>

            {/* User avatar (default, since no Clerk) */}
            {msg.role === "user" && (
              <div className="w-10 h-10 rounded-full bg-zinc-700 flex items-center justify-center shadow-md">
                <Terminal size={20} className="text-white" />
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage();
        }}
        className="border-t border-[#60FCB6]/30 px-4 sm:px-6 py-4 flex flex-col sm:flex-row gap-3 bg-black/80 backdrop-blur-lg"
      >
        <Input
          className="flex-1 bg-zinc-900/80 text-white placeholder-zinc-500 border border-zinc-700 rounded-xl focus:ring-2 focus:ring-[#60FCB6] focus:border-[#60FCB6] transition"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask to NexaCode something..."
        />
        <Button
          type="submit"
          disabled={loading}
          className="bg-gradient-to-r from-[#60FCB6] to-[#2de6a3] hover:scale-[1.05] transition-all text-black font-semibold rounded-xl w-full sm:w-auto shadow-lg"
        >
          <Send className="w-4 h-4" />
        </Button>
      </form>
    </div>
  );
}
