import React, { useState, useEffect } from "react";
import { Sparkles, Calendar, TrendingUp, ShieldAlert, BadgeCheck } from "lucide-react";

interface LoadingStepsProps {
  isLoading: boolean;
}

const STEPS = [
  { id: 1, text: "Consulting AI Personal Brand Strategist...", icon: Sparkles },
  { id: 2, text: "Analyzing profession keyword search authority...", icon: TrendingUp },
  { id: 3, text: "Synthesizing scroll-stopping hooks & alternatives...", icon: Sparkles },
  { id: 4, text: "Scouting trending professional metadata & hashtags...", icon: ShieldAlert },
  { id: 5, text: "Formatting comprehensive 7-day content calendar...", icon: Calendar },
  { id: 6, text: "Drafting optimized search-safe About bios...", icon: BadgeCheck },
];

export default function LoadingSteps({ isLoading }: LoadingStepsProps) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (!isLoading) {
      setCurrentStep(0);
      return;
    }

    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev < STEPS.length - 1 ? prev + 1 : prev));
    }, 2800);

    return () => clearInterval(interval);
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-slate-50 border border-slate-100 rounded-2xl max-w-xl mx-auto my-12 text-center shadow-xs">
      <div className="relative flex items-center justify-center w-16 h-16 bg-blue-50 text-blue-600 rounded-full animate-pulse mb-6">
        <Sparkles size={28} className="animate-spin-slow text-blue-600" />
      </div>

      <h3 className="text-lg font-bold text-slate-800 tracking-tight">
        PersonalBrand AI is architecting your profile...
      </h3>
      <p className="text-slate-500 text-xs mt-1.5 max-w-sm">
        This takes roughly 8 to 15 seconds. We are modeling bespoke copywriting structures for your LinkedIn audience.
      </p>

      <div className="w-full mt-6 space-y-3.5 max-w-xs text-left">
        {STEPS.map((step, idx) => {
          const StepIcon = step.icon;
          const isDone = idx < currentStep;
          const isActive = idx === currentStep;
          const isPending = idx > currentStep;

          return (
            <div
              key={step.id}
              className={`flex items-center gap-3 transition-opacity duration-300 ${
                isPending ? "opacity-35" : "opacity-100"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  isDone
                    ? "bg-emerald-100 text-emerald-700"
                    : isActive
                    ? "bg-blue-600 text-white animate-pulse"
                    : "bg-slate-200 text-slate-500"
                }`}
              >
                {isDone ? "✓" : step.id}
              </div>
              <span
                className={`text-xs font-medium ${
                  isActive ? "text-slate-900 font-semibold" : "text-slate-500"
                }`}
              >
                {step.text}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
