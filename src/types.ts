export type BrandTone = "Thought Leadership" | "Storytelling" | "Inspirational" | "Professional" | "Casual";

export interface Preset {
  name: string;
  profession: string;
  industry: string;
  experienceLevel: string;
  achievement: string;
  goal: string;
  tone: BrandTone;
}

export const PRESETS: Preset[] = [
  {
    name: "🚀 Startup Founder",
    profession: "Founder & CEO",
    industry: "Tech Startup & Venture Capital",
    experienceLevel: "Executive / Founder",
    achievement: "Bootstrapped our SaaS to $50K MRR in 12 months with absolute zero ad spend.",
    goal: "Attract inbound seed investors and capture developer audience mindshare.",
    tone: "Storytelling",
  },
  {
    name: "💻 Staff Software Engineer",
    profession: "Staff Distributed Systems Engineer",
    industry: "Fintech & Cloud Architecture",
    experienceLevel: "Staff / Director",
    achievement: "Re-architected payment ledger API, cutting transaction latency by 45% and saving $1.2M annually.",
    goal: "Establish industry thought leadership and advocate for modern system safety.",
    tone: "Thought Leadership",
  },
  {
    name: "📈 Growth Marketing Manager",
    profession: "Senior Product Growth Lead",
    industry: "E-Commerce & Digital Media",
    experienceLevel: "Senior Level",
    achievement: "Executed dynamic testing matrix that increased landing page retention by 280% on 3M monthly visitors.",
    goal: "Share practical tactical growth playbooks and attract talented marketing recruits.",
    tone: "Inspirational",
  },
];

export interface GeneratedAlternatives {
  professional: string;
  storytelling: string;
  inspirational: string;
}

export interface GeneratedHashtags {
  niche: string[];
  trending: string[];
}

export interface GeneratedEngagementStrategy {
  bestPostingTime: string;
  firstCommentIdea: string;
  audienceToTag: string;
  tactics: string[];
}

export interface GeneratedBrandAnalysis {
  keyStrengths: string[];
  keywords: string[];
  pillars: string[];
}

export interface CalendarItem {
  day: string;
  title: string;
  description: string;
  keyMessage: string;
}

export interface ProfileSuggestions {
  headline: string;
  about: string;
  featured: string[];
}

export interface PersonalBrandKit {
  primaryPost: string;
  alternatives: GeneratedAlternatives;
  headlines: string[];
  hashtags: GeneratedHashtags;
  engagementStrategy: GeneratedEngagementStrategy;
  brandAnalysis: GeneratedBrandAnalysis;
  contentCalendar: CalendarItem[];
  profileSuggestions: ProfileSuggestions;
}
