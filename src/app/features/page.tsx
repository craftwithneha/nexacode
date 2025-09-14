
'use client';

import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    title: "AI Code Assistance",
    description: "Generate, debug, and explain code instantly across multiple languages.",
    points: [
      "Real-time coding support",
      "Multi-language compatibility",
      "Quick debugging solutions",
    ],
  },
  {
    title: "Smart Suggestions",
    description: "Write cleaner code with intelligent, context-aware recommendations.",
    points: [
      "Reduces repetitive tasks",
      "Improves overall code quality",
      "Learns from your coding style",
    ],
  },
  {
    title: "Team Collaboration",
    description: "Build together with powerful AI tools designed for teams.",
    points: [
      "Share sessions with teammates",
      "Seamless GitHub integration",
      "Perfect for remote workflows",
    ],
  },
];

export default function FeaturesPage() {
  return (
    <section className="py-24 px-6 md:px-16 border-t border-zinc-800 bg-black">
      <div className="max-w-6xl mx-auto text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl font-bold mb-4"
        >
          <span className="bg-gradient-to-r from-[rgb(96,252,182)] via-emerald-300 to-emerald-400 bg-clip-text text-transparent">
            Powerful Features
          </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-zinc-400 max-w-2xl mx-auto"
        >
          Everything you need to code smarter, faster, and better.  
          NexaCode AI adapts to your workflow and supercharges your productivity.
        </motion.p>
      </div>

      <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            whileHover={{ scale: 1.05, rotate: 1 }}
            className="p-10 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_0_30px_rgba(96,252,182,0.15)] hover:shadow-[0_0_45px_rgba(96,252,182,0.3)] transition-all cursor-pointer group"
          >
            {/* Icon */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-r from-[rgb(96,252,182)] to-emerald-400 text-black mb-6 group-hover:scale-110 transition-transform"
            >
              <CheckCircle size={28} />
            </motion.div>

            {/* Title & Description */}
            <h3 className="text-2xl font-semibold mb-3 text-emerald-300 group-hover:text-emerald-400 transition-colors">
              {feature.title}
            </h3>
            <p className="text-zinc-400 mb-6">{feature.description}</p>

            {/* Points */}
            <ul className="space-y-3">
              {feature.points.map((point, idx) => (
                <li key={idx} className="flex items-start space-x-2 text-zinc-300">
                  <CheckCircle className="text-green-400 mt-1" size={18} />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            {/* Glow Effect */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-emerald-400/20 blur-3xl rounded-full opacity-40 group-hover:opacity-70 transition-all" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
