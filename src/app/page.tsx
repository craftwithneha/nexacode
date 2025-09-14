'use client';

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { ArrowRight, Bot, Terminal, RotateCcw, Zap, MessageSquare, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

type Message = {
  sender: "user" | "ai";
  type: "text" | "code";
  text?: string;
};

const conversation: Message[] = [
  { sender: "user", type: "text", text: "Hey AI, can you help me write a React hook?" },
  { sender: "ai", type: "text", text: "Of course! Here’s a reusable custom hook for fetching data..!" },
  { sender: "ai", type: "code" },
  { sender: "user", type: "text", text: "Nice! Can you explain this error in my code?" },
  { sender: "ai", type: "text", text: "Sure.! it looks like a missing dependency in your useEffect array." },
  { sender: "user", type: "text", text: "What’s the difference between REST and GraphQL?" },
  { sender: "ai", type: "text", text: "Great question 🌐 — REST exposes fixed endpoints, while GraphQL lets clients query exactly what they need." },
  { sender: "user", type: "text", text: "Do you think AI will replace programmers?" },
  { sender: "ai", type: "text", text: "Not replace, but empower ⚡ — AI helps with boilerplate, debugging, and brainstorming so humans can focus on creativity." },
];

const codeSnippet = `
import { useState, useEffect } from "react";

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      });
  }, [url]);

  return { data, loading };
}
`;

export default function HomePage() {
  const [index, setIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [aiTyping, setAiTyping] = useState(false);
  const [finished, setFinished] = useState(false);

  // Animate conversation
  useEffect(() => {
    if (index >= conversation.length) {
      setFinished(true);
      return;
    }

    const current = conversation[index];
    if (current.sender === "ai" && current.type === "text") {
      setAiTyping(true);
      const timer = setTimeout(() => {
        setAiTyping(false);
        setIndex((prev) => prev + 1);
      }, 2000);
      return () => clearTimeout(timer);
    }

    if (current.type === "code") {
      let i = 0;
      const interval = setInterval(() => {
        setTyped(codeSnippet.slice(0, i));
        i++;
        if (i > codeSnippet.length) {
          clearInterval(interval);
          setTimeout(() => setIndex((prev) => prev + 1), 1500);
        }
      }, 35);
      return () => clearInterval(interval);
    }

    const timer = setTimeout(() => {
      setIndex((prev) => prev + 1);
    }, 2000);

    return () => clearTimeout(timer);
  }, [index]);

  const restartConversation = () => {
    setIndex(0);
    setTyped("");
    setAiTyping(false);
    setFinished(false);
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-black text-white overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(96,252,182,0.12)_0%,transparent_70%)]" />
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-[rgb(96,252,182)] opacity-10 blur-[100px] animate-spin-slow rounded-full" />
        <div className="absolute bottom-20 right-1/4 w-60 h-60 bg-emerald-400 opacity-10 blur-[80px] animate-ping rounded-full" />
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 w-full border-b border-zinc-800 bg-black/60 backdrop-blur-xl z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link
            href="/"
            className="text-2xl font-extrabold bg-gradient-to-r from-[rgb(96,252,182)] via-emerald-300 to-emerald-400 bg-clip-text text-transparent"
          >
            NexaCode
          </Link>
          <div className="hidden md:flex gap-6 text-sm">
            {["Features", "Pricing", "Docs"].map((link, i) => (
              <Link
                key={i}
                href={`/${link.toLowerCase()}`}
                className="text-zinc-400 hover:text-white transition"
              >
                {link}
              </Link>
            ))}
          </div>
          <div className="hidden md:flex gap-3">
            <Link href="/sign-in">
              <Button
                variant="outline"
                className="rounded-xl border border-emerald-500/30 bg-black/30 text-emerald-300 hover:bg-emerald-500/20 hover:text-white cursor-pointer"
              >
                Sign In
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button className="rounded-xl bg-gradient-to-r from-[rgb(96,252,182)] to-emerald-400 hover:from-emerald-300 hover:to-emerald-500 text-black font-medium shadow-lg cursor-pointer">
                Get Started <ArrowRight className="ml-1 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-24 px-24 md:px-28 flex flex-col md:flex-row items-center gap-16">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2 space-y-8 text-center md:text-left"
        >
          <motion.h1
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="text-6xl md:text-7xl font-extrabold tracking-tight"
          >
            <span className="bg-gradient-to-r from-[rgb(96,252,182)] via-emerald-300 to-emerald-400 bg-clip-text text-transparent animate-gradient">
              AI That Codes With You
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg text-zinc-400 max-w-lg mx-auto md:mx-0"
          >
            NexaCode AI generates snippets, explains errors, and chats about tech like your best coding partner.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
          className="w-full md:w-1/2 flex justify-center max-w-md mx-auto"
        >
          <motion.div
            animate={{ rotate: [0, 2, -2, 0] }}
            transition={{ repeat: Infinity, duration: 6 }}
          >
            <Image src="/neonchatbot.png" alt="AI Assistant" width={420} height={450} className="object-contain drop-shadow-[0_0_30px_rgba(96,252,182,0.5)]" />
          </motion.div>
        </motion.div>
      </section>

      {/* Assistant Section */}
      <section className="py-20 px-6 md:px-12 bg-zinc-950/60 backdrop-blur-lg border-t border-zinc-800">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl font-bold mb-4"
          >
            <span className="bg-gradient-to-r from-[rgb(96,252,182)] via-emerald-300 to-emerald-400 bg-clip-text text-transparent">
              Your AI Programming Assistant
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-zinc-400"
          >
            Ask technical questions, debug errors, or discuss tech trends.  
            NexaCode AI is here to help developers at every step.
          </motion.p>
        </div>

        {/* Chat Simulation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative w-full max-w-2xl mx-auto flex flex-col gap-3 p-6 rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_0_40px_rgba(96,252,182,0.2)]"
        >
          {conversation.slice(0, index + 1).map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: msg.sender === "ai" ? -40 : 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className={`flex items-start gap-3 ${msg.sender === "ai" ? "self-start" : "self-end flex-row-reverse"} max-w-[85%]`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md shrink-0
                ${msg.sender === "ai"
                    ? "bg-emerald-500/20 border border-emerald-400/50 text-emerald-300"
                    : "bg-zinc-800 border border-zinc-700 text-zinc-200"
                  }`}
              >
                {msg.sender === "ai" ? <Bot size={20} /> : <Terminal size={20} />}
              </div>

              {msg.type === "code" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="rounded-xl overflow-hidden border border-emerald-500/30 w-full"
                >
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900 border-b border-zinc-800">
                    <span className="w-3 h-3 rounded-full bg-red-500"></span>
                    <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                    <span className="w-3 h-3 rounded-full bg-green-500"></span>
                    <span className="ml-3 text-xs text-zinc-400">useFetch.js</span>
                  </div>
                  <SyntaxHighlighter
                    language="javascript"
                    style={vscDarkPlus}
                    customStyle={{
                      margin: 0,
                      padding: "1rem",
                      fontSize: "0.8rem",
                      background: "rgba(24,24,27,0.95)",
                    }}
                    wrapLines
                  >
                    {typed + (typed.length < codeSnippet.length ? "|" : "")}
                  </SyntaxHighlighter>
                </motion.div>
              ) : (
                <div
                  className={`px-4 py-3 rounded-2xl text-sm ${msg.sender === "ai"
                      ? "bg-emerald-500/20 border border-emerald-400/40 text-emerald-100"
                      : "bg-zinc-800/60 border border-zinc-700/50 text-zinc-100"
                    }`}
                >
                  {msg.text}
                </div>
              )}
            </motion.div>
          ))}

          {aiTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="flex items-start gap-3 self-start max-w-[85%]"
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center shadow-md bg-emerald-500/20 border border-emerald-400/50 text-emerald-300">
                <Bot size={20} />
              </div>
              <div className="px-4 py-3 rounded-2xl text-sm bg-emerald-500/20 border border-emerald-400/40">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" />
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce delay-150" />
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce delay-300" />
                </div>
              </div>
            </motion.div>
          )}

          {finished && (
            <div className="flex justify-center mt-6">
              <Button
                onClick={restartConversation}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[rgb(96,252,182)] to-emerald-400 text-black font-semibold shadow-lg hover:from-emerald-300 hover:to-emerald-500"
              >
                <RotateCcw size={16} /> Restart Conversation
              </Button>
            </div>
          )}
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 md:px-16 border-t border-zinc-800">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl font-bold mb-4"
          >
            <span className="bg-gradient-to-r from-[rgb(96,252,182)] via-emerald-300 to-emerald-400 bg-clip-text text-transparent">
              Why Choose NexaCode AI?
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-zinc-400 max-w-2xl mx-auto"
          >
            Built for developers who want speed, clarity, and coding superpowers.
          </motion.p>
        </div>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            { icon: <Zap className="w-10 h-10 text-emerald-400" />, title: "Lightning Fast", desc: "Get instant responses to coding questions and error fixes." },
            { icon: <MessageSquare className="w-10 h-10 text-emerald-400" />, title: "Natural Conversations", desc: "Chat like you would with a mentor or coding buddy." },
            { icon: <Shield className="w-10 h-10 text-emerald-400" />, title: "Secure & Reliable", desc: "Your code stays private with enterprise-grade security." },
          ].map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              whileHover={{ scale: 1.05, rotate: 1 }}
              className="p-10 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_0_30px_rgba(96,252,182,0.15)] hover:shadow-[0_0_45px_rgba(96,252,182,0.3)] transition-all"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="mb-6"
              >
                {f.icon}
              </motion.div>
              <h3 className="text-xl font-semibold mb-3">{f.title}</h3>
              <p className="text-zinc-400">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
