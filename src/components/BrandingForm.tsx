import React, { useState } from "react";
import { PRESETS, BrandTone, Preset } from "../types";
import { Sparkles, HelpCircle, User, Award, Shield, Target, MessageSquare } from "lucide-react";

interface BrandingFormProps {
  onSubmit: (data: {
    userName: string;
    profession: string;
    achievement: string;
    experienceLevel: string;
    industry: string;
    goal: string;
    tone: BrandTone;
  }) => void;
  isLoading: boolean;
}

const EXPERIENCE_LEVELS = [
  "Entry Level / Recent Grad",
  "Associate / Mid-Level",
  "Senior Level Professional",
  "Lead / Staff Engineer / Tech Lead",
  "Director / Manager",
  "Executive / VP / C-Suite",
  "Founder / Consultant / Solopreneur",
];

const BRAND_TONES: { value: BrandTone; label: string; desc: string }[] = [
  { value: "Thought Leadership", label: "Thought Leadership", desc: "Authoritative, insightful, educational, and trends-focused." },
  { value: "Storytelling", label: "Storytelling", desc: "Relatable, narrative arcs with lessons, vulnerability, and breakthrough points." },
  { value: "Inspirational", label: "Inspirational", desc: "Empowering, motivating, passion-led, and centered on shared progress." },
  { value: "Professional", label: "Professional", desc: "Corporate, standard trade alignments, sovereign, and balanced with industry keywords." },
  { value: "Casual", label: "Casual", desc: "Warm, lightheaded, peer-to-peer approachability, and open team leader vibes." },
];

export default function BrandingForm({ onSubmit, isLoading }: BrandingFormProps) {
  const [userName, setUserName] = useState("Alex Morgan");
  const [profession, setProfession] = useState("");
  const [achievement, setAchievement] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("Senior Level Professional");
  const [industry, setIndustry] = useState("");
  const [goal, setGoal] = useState("");
  const [tone, setTone] = useState<BrandTone>("Thought Leadership");

  const [validationError, setValidationError] = useState("");

  const handleApplyPreset = (preset: Preset) => {
    setProfession(preset.profession);
    setIndustry(preset.industry);
    setExperienceLevel(preset.experienceLevel);
    setAchievement(preset.achievement);
    setGoal(preset.goal);
    setTone(preset.tone);
    setValidationError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profession.trim()) {
      setValidationError("Please specify your current profession or role (e.g., Staff Systems Designer).");
      return;
    }
    if (!industry.trim()) {
      setValidationError("Please specify your primary industry (e.g., Cybersecurity).");
      return;
    }
    setValidationError("");
    onSubmit({
      userName: userName.trim() || "Alex Morgan",
      profession: profession.trim(),
      achievement: achievement.trim(),
      experienceLevel,
      industry: industry.trim(),
      goal: goal.trim(),
      tone,
    });
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-xs p-6 md:p-8">
      {/* Quick Presets selector row */}
      <div className="mb-6">
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">
          ⚡ Quick Demo Presets (Instant Fill)
        </label>
        <div className="flex flex-wrap gap-2.5">
          {PRESETS.map((preset) => (
            <button
              key={preset.name}
              type="button"
              disabled={isLoading}
              onClick={() => handleApplyPreset(preset)}
              className="bg-slate-50 hover:bg-slate-100 disabled:opacity-50 text-slate-700 text-xs font-semibold px-3.5 py-2.5 rounded-lg border border-slate-200 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>{preset.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="h-px bg-slate-100 my-6" />

      {/* Inputs Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Row 1: Name and Profession */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-1.5 flex items-center gap-1.5">
              <User size={15} className="text-blue-600" />
              <span>Full Name</span>
            </label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Alex Morgan"
              disabled={isLoading}
              className="w-full bg-slate-50 border border-slate-200 focus:border-blue-600 rounded-xl px-4 py-2.5 text-sm text-slate-800 outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-1.5 flex items-center gap-1.5">
              <Award size={15} className="text-blue-600" />
              <span>Profession & Title <span className="text-rose-500">*</span></span>
            </label>
            <input
              type="text"
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
              placeholder="e.g., Lead AI Solutions Architect"
              disabled={isLoading}
              className="w-full bg-slate-50 border border-slate-200 focus:border-blue-600 rounded-xl px-4 py-2.5 text-sm text-slate-800 outline-none transition-colors"
            />
          </div>
        </div>

        {/* Row 2: Industry and Experience Level */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-1.5 flex items-center gap-1.5">
              <Shield size={15} className="text-blue-600" />
              <span>Industry Vertical <span className="text-rose-500">*</span></span>
            </label>
            <input
              type="text"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              placeholder="e.g., Cybersecurity & Venture Capital"
              disabled={isLoading}
              className="w-full bg-slate-50 border border-slate-200 focus:border-blue-600 rounded-xl px-4 py-2.5 text-sm text-slate-800 outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-1.5 flex items-center gap-1.5">
              <Target size={15} className="text-blue-600" />
              <span>Experience Level</span>
            </label>
            <select
              value={experienceLevel}
              onChange={(e) => setExperienceLevel(e.target.value)}
              disabled={isLoading}
              className="w-full bg-slate-50 border border-slate-200 focus:border-blue-600 rounded-xl px-4.5 py-2.5 text-sm text-slate-800 outline-none transition-colors cursor-pointer"
            >
              {EXPERIENCE_LEVELS.map((lvl) => (
                <option key={lvl} value={lvl}>
                  {lvl}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Row 3: Key Achievement or Accomplishment */}
        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-1.5 flex items-center gap-1.5">
            <Award size={15} className="text-blue-600" />
            <span>Key Achievement / Pivot / Breakthrough</span>
            <span className="text-[11px] text-slate-400 font-normal ml-auto flex items-center gap-0.5">
              <HelpCircle size={12} /> Specific facts make post perform 3x better
            </span>
          </label>
          <textarea
            value={achievement}
            onChange={(e) => setAchievement(e.target.value)}
            disabled={isLoading}
            placeholder="e.g., Designed automated pipeline that cut model deployment audits from 5 days to 2 hours, saving 40 hours of manual tech debt weekly."
            rows={3}
            className="w-full bg-slate-50 border border-slate-200 focus:border-blue-600 rounded-xl px-4 py-3 text-sm text-slate-800 outline-none transition-colors resize-none"
          />
        </div>

        {/* Row 4: Primary Goal */}
        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-1.5 flex items-center gap-1.5">
            <Target size={15} className="text-blue-600" />
            <span>Your Personal Brand Goal / Target Outcome</span>
          </label>
          <input
            type="text"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            disabled={isLoading}
            placeholder="e.g., Attract founders needing security consulting or landing speaking roles."
            className="w-full bg-slate-50 border border-slate-200 focus:border-blue-600 rounded-xl px-4 py-2.5 text-sm text-slate-800 outline-none transition-colors"
          />
        </div>

        {/* Row 5: Tone Selector with explanatory cards */}
        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-3 flex items-center gap-1.5">
            <MessageSquare size={15} className="text-blue-600" />
            <span>Desired Communication Tone</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {BRAND_TONES.map(({ value, label, desc }) => {
              const isSelected = tone === value;
              return (
                <button
                  key={value}
                  type="button"
                  disabled={isLoading}
                  onClick={() => setTone(value)}
                  className={`text-left p-3 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? "bg-blue-50/50 border-blue-600 shadow-xs ring-1 ring-blue-600/20"
                      : "bg-slate-50/40 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <span className={`block text-xs font-bold ${isSelected ? "text-blue-700" : "text-slate-800"}`}>
                    {label}
                  </span>
                  <span className="block text-[10px] text-slate-500 leading-normal mt-1 line-clamp-3">
                    {desc}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {validationError && (
          <div className="bg-rose-50 border border-rose-200 text-rose-800 text-xs px-4 py-3 rounded-xl font-medium">
            ⚠️ {validationError}
          </div>
        )}

        {/* CTA Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-4.5 rounded-2xl bg-blue-600 hover:bg-blue-700 disabled:opacity-55 disabled:cursor-not-allowed select-none text-white text-sm font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Analyzing & Modeling Copywriter Strategy...</span>
            </>
          ) : (
            <>
              <Sparkles size={16} />
              <span>Generate Personal Brand Kit & Drafts</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
