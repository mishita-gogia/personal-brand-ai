import React, { useState } from "react";
import {
  Sparkles,
  Calendar,
  TrendingUp,
  Copy,
  RotateCcw,
  Check,
  FileText,
  Users,
  Award,
  Shield,
  Target,
  MessageSquare,
  Edit,
  ExternalLink,
  ChevronRight,
  Info,
  CheckCircle,
  AlertCircle
} from "lucide-react";

import { BrandTone, PersonalBrandKit } from "./types";
import { DEFAULT_BRAND_KIT } from "./defaultKit";
import BrandingForm from "./components/BrandingForm";
import LinkedInMockup from "./components/LinkedInMockup";
import LoadingSteps from "./components/LoadingSteps";

export default function App() {
  // Input parameters tracking (matches defaults in form)
  const [activeFormInput, setActiveFormInput] = useState({
    userName: "Alex Morgan",
    profession: "Staff Distributed Systems Engineer",
    experienceLevel: "Staff / Director",
    industry: "Fintech & Cloud Architecture",
    achievement: "Re-architected payment ledger API, cutting transaction latency by 45% and saving $1.2M annually.",
    goal: "Establish industry thought leadership and advocate for modern system safety.",
    tone: "Thought Leadership" as BrandTone,
  });

  const [brandKit, setBrandKit] = useState<PersonalBrandKit>(DEFAULT_BRAND_KIT);
  const [selectedPostVersion, setSelectedPostVersion] = useState<"primary" | "professional" | "storytelling" | "inspirational">("primary");
  const [selectedHeadlineIndex, setSelectedHeadlineIndex] = useState<number>(0);
  const [selectedCalendarDay, setSelectedCalendarDay] = useState<number>(0);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ text: string; type: "success" | "info" } | null>(null);

  // Active user details to show in mockup
  const [displayUserName, setDisplayUserName] = useState("Alex Morgan");

  // Show floating toast notifications
  const triggerNotification = (text: string, type: "success" | "info" = "success") => {
    setNotification({ text, type });
    setTimeout(() => {
      setNotification((prev) => (prev?.text === text ? null : prev));
    }, 3000);
  };

  // Safe copying utilities
  const handleCopyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    triggerNotification(`Copied ${label} to clipboard!`);
  };

  // Submit handler calling backend server express api
  const handleGenerateBrand = async (inputs: {
    userName: string;
    profession: string;
    achievement: string;
    experienceLevel: string;
    industry: string;
    goal: string;
    tone: BrandTone;
  }) => {
    setIsLoading(true);
    setErrorMessage(null);
    setActiveFormInput(inputs);
    setDisplayUserName(inputs.userName);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          profession: inputs.profession,
          achievement: inputs.achievement,
          experienceLevel: inputs.experienceLevel,
          industry: inputs.industry,
          goal: inputs.goal,
          tone: inputs.tone,
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `Server responded with status code ${response.status}`);
      }

      const generatedKit = await response.json();
      setBrandKit(generatedKit);
      setSelectedPostVersion("primary");
      setSelectedHeadlineIndex(0);
      setSelectedCalendarDay(0);
      triggerNotification("New Brand Kit structured successfully!", "success");
    } catch (err: any) {
      console.error(err);
      setErrorMessage(
        err.message || "Unable to reach the branding API. Please make sure your server is running and your GEMINI_API_KEY is configured in Settings."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Dynamic calculations for the "Authority Score" dial
  const calculateAuthorityScore = () => {
    let score = 70;
    if (activeFormInput.achievement && activeFormInput.achievement.length > 40) score += 12;
    if (activeFormInput.profession && activeFormInput.profession.length > 15) score += 5;
    if (activeFormInput.goal && activeFormInput.goal.length > 25) score += 5;
    if (activeFormInput.industry) score += 6;
    return Math.min(score, 98);
  };

  const authorityScore = calculateAuthorityScore();

  // Active post copy selector based on state
  const getActivePostContent = () => {
    if (selectedPostVersion === "primary") return brandKit.primaryPost;
    return brandKit.alternatives[selectedPostVersion] || brandKit.primaryPost;
  };

  // Active custom selected headline to bind on mockup profile preview
  const getActiveMockupHeadline = () => {
    if (brandKit.headlines && brandKit.headlines[selectedHeadlineIndex]) {
      return brandKit.headlines[selectedHeadlineIndex];
    }
    return activeFormInput.profession || "Senior Professional";
  };

  return (
    <div className="bg-[#F3F2EF] min-h-screen w-full flex flex-col font-sans text-slate-800">
      
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl text-xs font-semibold animate-fade-in-up border border-slate-700">
          <CheckCircle size={15} className="text-emerald-400 shrink-0" />
          <span>{notification.text}</span>
        </div>
      )}

      {/* Header bar - Matching LinkedIn/Professional Polish navigation style */}
      <header className="bg-white border-b border-slate-200 px-4 md:px-8 py-3.5 flex justify-between items-center sticky top-0 z-40 shadow-xs shrink-0">
        <div className="flex items-center gap-3">
          <div className="bg-[#0077B5] text-white font-bold px-2 py-1.5 rounded-md text-sm tracking-widest flex items-center justify-center">
            PB
          </div>
          <div>
            <h1 className="text-lg font-extrabold text-slate-800 tracking-tight flex items-center gap-1.5">
              PersonalBrand <span className="text-[#0077B5]">AI</span>
              <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200">
                Lnk-v4
              </span>
            </h1>
            <p className="text-[10px] text-slate-400 font-medium hidden sm:block">
              LinkedIn Authority Modeling & Copywriter Engine
            </p>
          </div>
        </div>

        <div className="flex gap-4 items-center">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-slate-800">
              {displayUserName}
            </p>
            <p className="text-[9px] text-[#0077B5] font-bold uppercase tracking-wider">
              {activeFormInput.experienceLevel}
            </p>
          </div>
          <div className="w-9 h-9 bg-[#E7F3FF] ring-2 ring-[#0077B5]/20 text-[#0077B5] rounded-full border border-[#0077B5]/10 flex items-center justify-center font-bold text-sm select-none">
            {displayUserName.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()}
          </div>
        </div>
      </header>

      {/* Main Grid View */}
      <main className="flex-1 max-w-[1550px] w-full mx-auto p-4 md:p-6 lg:p-8 flex flex-col gap-6">
        
        {/* API Error Warning Banner */}
        {errorMessage && (
          <div className="bg-rose-50 border-l-4 border-rose-600 p-4 rounded-xl shadow-xs text-sm text-slate-800 flex gap-3 items-start">
            <AlertCircle className="text-rose-600 shrink-0 mt-0.5" size={18} />
            <div className="flex-1">
              <span className="font-bold text-rose-900">Branding Blueprint Generation Halted</span>
              <p className="text-xs text-rose-800 mt-1">
                {errorMessage}
              </p>
              <div className="mt-2 text-xs font-semibold text-slate-600">
                💡 <span className="underline">How to configure</span>: Go to the <span className="font-bold">Secrets panel (gear icon)</span> in the top right, add <code className="bg-rose-100 px-1 py-0.5 rounded text-rose-900 font-mono text-[11px]">GEMINI_API_KEY</code>, then re-submit.
              </div>
            </div>
          </div>
        )}

        {/* TOP LEVEL DUAL CONFIG: Brand Inputs & Generation Trigger */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
          
          {/* L: The Prompt / Form Setup Panel */}
          <div className="xl:col-span-5 flex flex-col gap-5">
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 bg-blue-50 text-[#0077B5] rounded-lg flex items-center justify-center">
                  <Edit size={14} />
                </div>
                <div>
                  <h2 id="ref-brand-specs" className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                    Persona & Strategy Core
                  </h2>
                  <p className="text-[11px] text-slate-500">
                    Provide real achievements to optimize the authority metrics.
                  </p>
                </div>
              </div>
              <BrandingForm onSubmit={handleGenerateBrand} isLoading={isLoading} />
            </div>

            {/* Quick Informational Tip Box - Part of Professional Polish Sidebar Style */}
            <div className="bg-[#E7F3FF] rounded-2xl border border-blue-200 p-5">
              <div className="flex gap-2.5 items-start">
                <Info size={16} className="text-[#0077B5] shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs font-bold text-[#0077B5] uppercase tracking-wider">
                    Personal Brand Strategy Tip
                  </h3>
                  <p className="text-xs text-slate-700 leading-relaxed mt-1.5">
                    LinkedIn's algorithm prioritizes metric-driven, real accomplishments over generic corporate buzzwords. By quantifying your key achievement (e.g., "$1.2M saved," "saved 40h weekly"), you establish instant authority and rise high in professional feeds.
                  </p>
                  <button 
                    onClick={() => {
                      triggerNotification("Algorithmic guide copied! Refer to About section suggestions below.");
                    }}
                    className="mt-3 text-[10px] font-bold text-[#0077B5] uppercase underline hover:text-[#005582] flex items-center gap-1 cursor-pointer"
                  >
                    <span>Read algorithm playbook</span>
                    <ChevronRight size={10} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* R: Dynamic Feed Preview & Advanced Strategy Sheets */}
          <div className="xl:col-span-7 flex flex-col gap-6">
            
            {/* If backend generation is rolling, show steps instead of stale views */}
            {isLoading ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 shadow-xs transition-all flex items-center justify-center min-h-[500px]">
                <LoadingSteps isLoading={isLoading} />
              </div>
            ) : (
              // Main Interactive Dashboard View
              <div className="space-y-6 animate-fade-in">
                
                {/* 1. MOCK CONTAINER CARD */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
                  
                  {/* Top Bar showing Version Tabs */}
                  <div className="px-4 py-3 bg-slate-50 border-b border-slate-100 flex flex-wrap gap-2 items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold uppercase text-slate-500 tracking-wider">
                        Copy Quality Engine
                      </span>
                      <span className="text-[10px] bg-blue-100 text-[#0077B5] font-semibold px-2 py-0.5 rounded">
                        {activeFormInput.tone} Optimized
                      </span>
                    </div>

                    {/* Quick switch to alternative drafts generated by AI */}
                    <div className="flex flex-wrap gap-1 bg-slate-100 p-1 rounded-lg">
                      <button
                        onClick={() => setSelectedPostVersion("primary")}
                        className={`text-[11px] font-bold px-2.5 py-1.5 rounded-md transition-all cursor-pointer ${
                          selectedPostVersion === "primary"
                            ? "bg-white text-[#0077B5] shadow-xs"
                            : "text-slate-500 hover:text-slate-800"
                        }`}
                      >
                        Primary Post
                      </button>
                      <button
                        onClick={() => setSelectedPostVersion("storytelling")}
                        className={`text-[11px] font-bold px-2.5 py-1.5 rounded-md transition-all cursor-pointer ${
                          selectedPostVersion === "storytelling"
                            ? "bg-white text-[#0077B5] shadow-xs"
                            : "text-slate-500 hover:text-slate-800"
                        }`}
                      >
                        Storytelling
                      </button>
                      <button
                        onClick={() => setSelectedPostVersion("professional")}
                        className={`text-[11px] font-bold px-2.5 py-1.5 rounded-md transition-all cursor-pointer ${
                          selectedPostVersion === "professional"
                            ? "bg-white text-[#0077B5] shadow-xs"
                            : "text-slate-700 hover:text-slate-800"
                        }`}
                      >
                        Professional
                      </button>
                      <button
                        onClick={() => setSelectedPostVersion("inspirational")}
                        className={`text-[11px] font-bold px-2.5 py-1.5 rounded-md transition-all cursor-pointer ${
                          selectedPostVersion === "inspirational"
                            ? "bg-white text-[#0077B5] shadow-xs"
                            : "text-slate-700 hover:text-slate-800"
                        }`}
                      >
                        Inspirational
                      </button>
                    </div>
                  </div>

                  {/* Main feed presentation wrapper */}
                  <div className="p-4 md:p-6 bg-[#F3F2EF]">
                    <LinkedInMockup
                      userName={displayUserName}
                      userHeadline={getActiveMockupHeadline()}
                      postContent={getActivePostContent()}
                    />
                  </div>

                  {/* Draft performance tags footer */}
                  <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex flex-wrap justify-between items-center gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-slate-400 font-bold uppercase">
                        SEO Metadata tags:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {brandKit.hashtags.niche.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="bg-white border border-slate-200 text-slate-600 text-[10px] font-medium px-2 py-0.5 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => handleCopyText(getActivePostContent(), "Active Draft")}
                      className="text-xs bg-[#0077B5] hover:bg-[#005582] text-white px-4 py-2 font-bold rounded-lg shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Copy size={13} />
                      <span>Copy Output</span>
                    </button>
                  </div>
                </div>

                {/* 2. DUAL ROW: SCORE DIAL & STRATEGIC BRAND ANALYSIS */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  
                  {/* Brand Authority Score Circle dial */}
                  <div className="bg-white rounded-2xl border border-slate-200 p-5 md:col-span-4 flex flex-col items-center justify-center text-center relative overflow-hidden">
                    <h3 className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider mb-4">
                      Authority Score Index
                    </h3>
                    
                    {/* Circle layout */}
                    <div className="relative flex items-center justify-center w-28 h-28">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle
                          cx="56"
                          cy="56"
                          r="48"
                          className="stroke-slate-100"
                          strokeWidth="8"
                          fill="transparent"
                        />
                        <circle
                          cx="56"
                          cy="56"
                          r="48"
                          className="stroke-[#0077B5] transition-all duration-1000 ease-out"
                          strokeWidth="8"
                          fill="transparent"
                          strokeDasharray={301.6}
                          strokeDashoffset={301.6 - (301.6 * authorityScore) / 100}
                        />
                      </svg>
                      <span className="absolute text-3xl font-extrabold text-slate-800">
                        {authorityScore}
                        <span className="text-xs text-slate-400 font-bold">%</span>
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-500 font-medium uppercase mt-4">
                      Engagement Potential
                    </p>
                    <p className="text-[10px] text-emerald-600 font-extrabold bg-emerald-50 px-2 py-0.5 rounded mt-1">
                      High Visibility Forecast
                    </p>
                  </div>

                  {/* Brand Analysis Table: Key Strengths, Keywords, Pillars */}
                  <div className="bg-white rounded-2xl border border-slate-200 p-5 md:col-span-8 flex flex-col justify-between">
                    <div>
                      <h3 className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider mb-3">
                        Personal Authority Analysis
                      </h3>
                      
                      {/* Strength bullet list */}
                      <div className="space-y-2">
                        <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wide">
                          Highlighted Core Strengths
                        </p>
                        <div className="space-y-1.5">
                          {brandKit.brandAnalysis.keyStrengths.map((str, idx) => (
                            <div key={idx} className="flex gap-2 items-start text-xs text-slate-700 font-medium">
                              <span className="text-[#0077B5] font-bold">0{idx + 1}.</span>
                              <span>{str}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Content Pillars */}
                    <div className="mt-4 pt-4 border-t border-slate-100">
                      <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wide mb-2">
                        Strategic Content Pillars
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {brandKit.brandAnalysis.pillars.map((pillar) => (
                          <span
                            key={pillar}
                            className="bg-blue-50 text-[#0077B5] text-[10px] font-bold px-2.5 py-1.5 rounded-full border border-blue-100"
                          >
                            💡 {pillar}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>

                {/* 3. HEADLINE SELECTION SHEET (INTERACTIVE BANNER RE-BIND) */}
                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                  <div className="p-4 bg-slate-50 border-b border-slate-100">
                    <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Interactive Profile Headlines
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      We modeled 5 bespoke headlines for your banner page. Click any headline below to load it into the live simulated poster feed above!
                    </p>
                  </div>

                  <div className="p-3 divide-y divide-slate-100">
                    {brandKit.headlines.map((headline, idx) => {
                      const isSelected = selectedHeadlineIndex === idx;
                      return (
                        <div
                          key={idx}
                          onClick={() => {
                            setSelectedHeadlineIndex(idx);
                            triggerNotification(`Interactive mockup headline set to Option ${idx + 1}!`);
                          }}
                          className={`p-3 text-xs font-medium text-slate-700 flex gap-3 items-start hover:bg-slate-50 cursor-pointer transition-all ${
                            isSelected ? "bg-[#E7F3FF]/70 border-l-4 border-[#0077B5]" : "border-l-4 border-transparent"
                          }`}
                        >
                          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                            isSelected ? "bg-[#0077B5] text-white" : "bg-slate-100 text-slate-500"
                          }`}>
                            {idx + 1}
                          </span>
                          <p className="flex-1 font-semibold leading-relaxed">
                            {headline}
                          </p>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCopyText(headline, `Headline Option ${idx + 1}`);
                            }}
                            className="p-1 text-slate-400 hover:text-slate-600 rounded transition"
                            title="Copy Headline"
                          >
                            <Copy size={13} />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 4. CONTENT CALENDAR: INTERACTIVE 7-DAY VISUAL ROADMAP */}
                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                  
                  {/* Calendar Top bar */}
                  <div className="p-4 bg-slate-50 border-b border-slate-100">
                    <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Sustainable 7-Day Publishing Sequence
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      A high-retention calendar mapping the follow-up rhythm for your core authority profile.
                    </p>
                  </div>

                  {/* Day tabs row */}
                  <div className="p-4 bg-white grid grid-cols-4 sm:grid-cols-7 gap-2 border-b border-slate-100">
                    {brandKit.contentCalendar.map((item, idx) => {
                      const isSelected = selectedCalendarDay === idx;
                      return (
                        <button
                          key={idx}
                          onClick={() => setSelectedCalendarDay(idx)}
                          className={`py-2 px-1 rounded-xl text-center cursor-pointer transition-all border ${
                            isSelected
                              ? "bg-[#E7F3FF] border-[#0077B5] text-[#0077B5]"
                              : "bg-slate-50 border-slate-200 text-slate-500 hover:border-slate-300"
                          }`}
                        >
                          <span className="block text-[9px] font-extrabold uppercase tracking-wide">
                            {item.day}
                          </span>
                          <span className="block text-[10px] font-bold mt-1 line-clamp-1 px-1">
                            {item.title}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Highlighted Selected Day Panel */}
                  <div className="p-5 bg-[#E7F3FF]/40 border-l-4 border-[#0077B5] flex flex-col sm:flex-row gap-5 justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black bg-[#0077B5] text-white px-2 py-0.5 rounded">
                          {brandKit.contentCalendar[selectedCalendarDay].day.toUpperCase()} TOPIC
                        </span>
                        <h4 className="text-xs font-bold text-[#0077B5] uppercase">
                          {brandKit.contentCalendar[selectedCalendarDay].title}
                        </h4>
                      </div>
                      
                      <p className="text-xs text-slate-700 leading-relaxed font-semibold mt-2.5">
                        {brandKit.contentCalendar[selectedCalendarDay].description}
                      </p>

                      <div className="mt-3 text-[11px] text-slate-600 flex gap-1.5 items-center bg-white/70 p-2 rounded-lg border border-slate-100">
                        <strong className="text-slate-800 font-extrabold tracking-tight">Key Takeaway:</strong>
                        <span>{brandKit.contentCalendar[selectedCalendarDay].keyMessage}</span>
                      </div>
                    </div>

                    <div className="shrink-0 flex items-end">
                      <button
                        onClick={() => {
                          const item = brandKit.contentCalendar[selectedCalendarDay];
                          const draftPrompt = `Create a LinkedIn post on the topic "${item.title}". Detail: ${item.description}. Key Takeaway: ${item.keyMessage}.`;
                          handleCopyText(draftPrompt, `${item.day} Draft Prompt`);
                        }}
                        className="text-[10px] uppercase font-extrabold text-[#0077B5] bg-white border border-[#0077B5]/20 hover:bg-slate-50 px-3.5 py-2.5 rounded-lg transition"
                      >
                        Copy Prompt For Custom Draft →
                      </button>
                    </div>
                  </div>

                </div>

                {/* 5. BIO BUILDER & PROFILE SECTIONS IMPROVEMENTS */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  
                  {/* LinkedIn About Biography Block with quick customizable copies */}
                  <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col justify-between">
                    <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                      <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                        Search-Optimized About bio
                      </h3>
                      <button
                        onClick={() => handleCopyText(brandKit.profileSuggestions.about, "Optimized About Bio")}
                        className="text-[11px] font-bold text-[#0077B5] hover:underline flex items-center gap-1"
                      >
                        <Copy size={12} />
                        <span>Copy Bio</span>
                      </button>
                    </div>

                    <div className="p-4 flex-1">
                      <p className="text-[11px] text-slate-400 italic mb-2">
                        Customize and copy this ready-to-use search-optimized LinkedIn summary bio block:
                      </p>
                      <textarea
                        readOnly
                        value={brandKit.profileSuggestions.about}
                        rows={11}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 scrollbar-thin text-xs text-slate-700 font-mono leading-relaxed outline-none resize-none"
                      />
                    </div>
                  </div>

                  {/* Profile Layout and Featured Section Guidelines */}
                  <div className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col justify-between gap-5">
                    
                    {/* Header Improvement guidelines */}
                    <div>
                      <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
                        Profile Elements Alignment
                      </h3>
                      
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs text-slate-600 leading-relaxed">
                        <strong className="text-slate-800 block mb-1">Headline Rules Strategy:</strong>
                        {brandKit.profileSuggestions.headline}
                      </div>
                    </div>

                    {/* Featured items section suggested links */}
                    <div className="space-y-3">
                      <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                        <FileText size={12} className="text-[#0077B5]" />
                        <span>Recommended "Featured" media items:</span>
                      </p>

                      <div className="space-y-2">
                        {brandKit.profileSuggestions.featured.map((item, idx) => (
                          <div
                            key={idx}
                            className="bg-sky-50/50 hover:bg-sky-50 border border-sky-100 p-3 rounded-xl flex items-start gap-2.5 transition"
                          >
                            <span className="w-5 h-5 bg-[#0077B5] text-white shrink-0 font-bold rounded-sm text-[10px] flex items-center justify-center">
                              PDF
                            </span>
                            <p className="text-xs text-slate-700 font-semibold leading-relaxed">
                              {item}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Active target engagements suggestions */}
                    <div className="pt-4 border-t border-slate-100">
                      <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                        Engagement Delivery Roadmap
                      </h4>
                      <p className="text-xs text-slate-700 font-medium leading-relaxed">
                        <strong className="text-[#0077B5]">Scheduled Window:</strong> {brandKit.engagementStrategy.bestPostingTime}
                      </p>
                      
                      <div className="mt-2.5 bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <p className="text-[10px] font-extrabold text-slate-500 uppercase">
                          Discussion Starter (First Comment)
                        </p>
                        <p className="text-xs text-slate-600 font-mono italic select-all cursor-pointer hover:bg-slate-100 p-1.5 rounded mt-1">
                          {brandKit.engagementStrategy.firstCommentIdea}
                        </p>
                      </div>

                      <div className="mt-3.5 space-y-1">
                        <p className="text-[10px] font-bold text-slate-400 uppercase">
                          Recommended Accounts & Titles to engage
                        </p>
                        <p className="text-xs text-[#0077B5] font-semibold">
                          {brandKit.engagementStrategy.audienceToTag}
                        </p>
                      </div>
                    </div>

                  </div>

                </div>

                {/* 6. ADVANCED TACTICAL STRATEGIES ROADMAP */}
                <div className="bg-slate-900 text-white rounded-2xl p-5 md:p-6 overflow-hidden shadow-md flex flex-col md:flex-row gap-5 items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="text-sm font-extrabold uppercase tracking-widest text-[#E7F3FF]">
                      Active Reach Multipliers
                    </h3>
                    <p className="text-xs text-slate-300 max-w-xl">
                      Configure your distribution process according to standard seed hacks mapped directly to your niche audience:
                    </p>
                  </div>
                  <div className="space-y-2 w-full md:w-auto">
                    {brandKit.engagementStrategy.tactics.map((tactic, idx) => (
                      <div key={idx} className="flex gap-2.5 items-start text-xs text-slate-200 bg-white/5 border border-white/10 px-3.5 py-2 rounded-xl">
                        <span className="text-[#0077B5] font-bold">★</span>
                        <span>{tactic}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reset button back to configuration */}
                <div className="flex items-center justify-center pt-2">
                  <button
                    onClick={() => {
                      const elm = document.getElementById("ref-brand-specs");
                      if (elm) {
                        elm.scrollIntoView({ behavior: "smooth" });
                      }
                      triggerNotification("Configure your profile variables above.");
                    }}
                    className="text-xs text-slate-500 hover:text-slate-800 hover:underline flex items-center gap-1.5 font-semibold cursor-pointer"
                  >
                    <RotateCcw size={13} />
                    <span>Back to Persona inputs / edit credentials</span>
                  </button>
                </div>

              </div>
            )}

          </div>

        </div>

      </main>

      {/* Styled Footer Status Bar with Professional details */}
      <footer className="bg-white border-t border-slate-200 px-6 py-4 flex flex-col sm:flex-row justify-between items-center shrink-0 mt-auto text-center sm:text-left gap-2.5 text-[11px]">
        <div className="flex flex-wrap gap-4 text-slate-500 justify-center">
          <span className="flex items-center gap-1.5 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            PB-AI Strategy Engine Online
          </span>
          <span>•</span>
          <span className="font-semibold text-slate-600">Model: gemini-3.5-flash LTS</span>
        </div>
        <p className="text-slate-400 italic font-medium">
          PersonalBrand AI is built for elite LinkedIn professionals. Designed in California.
        </p>
      </footer>
    </div>
  );
}
