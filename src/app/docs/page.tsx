'use client';

import {
  BookOpen,
  Sparkles,
  Code2,
  Layers,
  HelpCircle,
  LifeBuoy,
} from 'lucide-react';
import { ReactElement } from 'react';
import { motion } from 'framer-motion';

type DocItem = {
  title: string;
  desc: string;
  points: string[];
  icon: ReactElement;
};

export default function DocsPage() {
  const items: DocItem[] = [
    {
      title: 'Getting Started',
      desc: 'Set up CodeMate AI in your project in minutes.',
      points: ['Installation guide', 'Basic configuration', 'Running your first AI command'],
      icon: <BookOpen className="w-7 h-7 text-purple-400" />,
    },
    {
      title: 'Features Guide',
      desc: 'Explore powerful AI features for coding and debugging.',
      points: ['Code generation', 'Error explanations', 'Productivity tools'],
      icon: <Sparkles className="w-7 h-7 text-pink-400" />,
    },
    {
      title: 'API Reference',
      desc: 'Dive deep into API endpoints, methods, and responses.',
      points: ['Authentication', 'Endpoints overview', 'Example requests & responses'],
      icon: <Code2 className="w-7 h-7 text-blue-400" />,
    },
    {
      title: 'Examples',
      desc: 'Step-by-step coding examples with AI integration.',
      points: ['Frontend with React', 'Backend with Node.js', 'Full-stack workflows'],
      icon: <Layers className="w-7 h-7 text-green-400" />,
    },
    {
      title: 'FAQ',
      desc: 'Find answers to common questions about CodeMate AI.',
      points: ['Account setup', 'Usage limits', 'Troubleshooting tips'],
      icon: <HelpCircle className="w-7 h-7 text-yellow-400" />,
    },
    {
      title: 'Support',
      desc: 'Get help from our community and support team.',
      points: ['Join Discord', 'Contact support', 'Report an issue'],
      icon: <LifeBuoy className="w-7 h-7 text-red-400" />,
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Soft Neon Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-10 left-1/4 w-72 h-72 bg-[rgb(96,252,182)] opacity-5 blur-[120px] animate-spin-slow rounded-full" />
        <div className="absolute bottom-20 right-1/4 w-60 h-60 bg-pink-400 opacity-5 blur-[80px] animate-pulse rounded-full" />
        <div className="absolute top-1/3 right-1/3 w-80 h-80 bg-purple-400 opacity-3 blur-[150px] rounded-full animate-pulse" />
      </div>

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-6 pt-32 pb-20 text-center relative z-10">
        <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-[rgb(96,252,182)] via-emerald-300 to-emerald-400 bg-clip-text text-transparent animate-gradient">
          NexaCode AI Docs
        </h1>
        <p className="mt-6 text-lg text-zinc-400 max-w-2xl mx-auto">
          Explore professional guides, API references, and examples to integrate NexaCode AI into your workflow efficiently.
        </p>
      </section>

      {/* Docs Cards */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-20 relative z-10">
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            whileHover={{ scale: 1.03 }}
            className="group bg-black/50 backdrop-blur-md p-8 rounded-3xl border border-white/10 shadow-[0_0_40px_rgba(96,252,182,0.15)] hover:shadow-[0_0_60px_rgba(96,252,182,0.3)] hover:border-[rgb(96,252,182)] cursor-default flex flex-col min-h-[280px] transition-all"
          >
            <div className="flex items-center gap-4 mb-5">
              {item.icon}
              <h3 className="text-2xl font-semibold group-hover:text-[rgb(96,252,182)] transition-colors">
                {item.title}
              </h3>
            </div>
            <p className="text-zinc-300 text-base">{item.desc}</p>
            <ul className="mt-5 text-zinc-400 text-sm space-y-2 list-disc list-inside">
              {item.points.map((point, idx) => (
                <li key={idx} className="hover:text-[rgb(96,252,182)] transition-colors">{point}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </section>
    </div>
  );
}
