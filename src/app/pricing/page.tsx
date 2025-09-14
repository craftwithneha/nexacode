'use client';

import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    features: [
      "Basic AI code suggestions",
      "Limited daily usage",
      "Community support",
    ],
  },
  {
    name: "Pro",
    price: "$19/month",
    features: [
      "Unlimited AI coding help",
      "Multi-language support",
      "Priority email support",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    features: [
      "Team collaboration tools",
      "Dedicated support",
      "Custom AI training",
    ],
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-black text-white py-20 px-6 relative overflow-hidden">
      {/* Neon Background Orbs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-10 left-1/4 w-72 h-72 bg-[rgb(96,252,182)] opacity-5 blur-[120px] animate-spin-slow rounded-full" />
        <div className="absolute bottom-20 right-1/4 w-60 h-60 bg-purple-400 opacity-5 blur-[80px] animate-pulse rounded-full" />
        <div className="absolute top-1/3 right-1/3 w-80 h-80 bg-pink-400 opacity-3 blur-[150px] rounded-full animate-pulse" />
      </div>

      <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-12 bg-gradient-to-r from-[rgb(96,252,182)] via-emerald-300 to-emerald-400 bg-clip-text text-transparent animate-gradient">
        Pricing Plans
      </h1>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, i) => (
          <div
            key={i}
            className="group bg-black/50 backdrop-blur-md border border-white/10 rounded-3xl p-8 flex flex-col shadow-[0_0_40px_rgba(96,252,182,0.1)] hover:shadow-[0_0_60px_rgba(96,252,182,0.3)] hover:border-[rgb(96,252,182)] transition-all"
          >
            <h2 className="text-2xl font-semibold mb-2">{plan.name}</h2>
            <p className="text-3xl font-bold mb-6 bg-gradient-to-r from-[rgb(96,252,182)] via-emerald-300 to-emerald-400 bg-clip-text text-transparent">
              {plan.price}
            </p>

            <ul className="space-y-3 flex-1">
              {plan.features.map((f, idx) => (
                <li key={idx} className="flex items-start space-x-2 text-zinc-300 group-hover:text-[rgb(96,252,182)] transition-colors">
                  <Check className="text-[rgb(96,252,182)] mt-1" size={18} />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <Button className="mt-6 w-full bg-gradient-to-r from-[rgb(96,252,182)] to-emerald-400 hover:from-emerald-300 hover:to-emerald-500 text-black py-2 rounded-xl font-medium shadow-lg transition-all">
              Choose {plan.name}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
