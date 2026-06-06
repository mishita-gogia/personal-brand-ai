import { PersonalBrandKit } from "./types";

export const DEFAULT_BRAND_KIT: PersonalBrandKit = {
  primaryPost: `I failed my first three major system migrations. Here’s why it was the best thing for my career in Fintech. 📉\n\nEarly in my journey, I thought perfect whiteboards and strict specs guaranteed flawless production runs. I was wrong.\n\nThe edge cases, late-night rollbacks, and database locks taught me more about real-world resilience than any textbook or architecture seminar ever could.\n\nNow, after scaling payment routers to 40,000 requests per second, I treat failure as a design parameter rather than an anomaly.\n\nKey rules we live by now:\n• Recovery speed trumps uptime perfection.\n• Telemetry is your best feedback loop, not post-mortems.\n• Keep architectures relentlessly simple.\n\nPragmatic design is built in the trenches, not in sterile diagrams.\n\nWhat is the biggest design lesson you’ve learned from a production setback? Let's discuss below.`,
  alternatives: {
    professional: `Reflecting on distributed ledger patterns in fintech after surviving three major database migrations.\n\nIn high-frequency payments, system safety isn't an academic goal—it is a daily operational budget. Reducing API latency by 45% meant stripping out legacy wrappers and embracing robust retry safety patterns. \n\nLessons for technical leads:\n1. Fail-fast options save compute overhead.\n2. Empathy for operations is more valuable than complex abstractions.\n3. Design for eventual consistency first.\n\nLet's discuss: Do you prioritize strict transaction boundaries or ultimate performance?`,
    storytelling: `It was 3:15 AM on a Sunday. \n\nOur transaction throughput spiked 10x, and the core routing database locked up. \n\nPanic? Yes. But the real lesson was how we recovered. By decoupling our batch ledger queues and adopting idempotent request keys, we cleared the bottleneck in under 4 minutes with zero lost writes.\n\nThat setback taught us that technical masteries aren't proved when everything works—they are forged when the engine fails.\n\nKeep your configurations declarative, your limits tested, and your alerts noisy.`,
    inspirational: `Architecture isn’t about building the perfect, untouchable system. It is about building software that survives reality. 🚀\n\nWhen we took on the payment pipeline rewrite, our primary goal was to save costs. Over 12 months, we cut latency by 45% and saved $1.2M. But the true reward was watching our junior devs gain deep operational confidence.\n\nDon't fear system setbacks. Every bug is a paid lesson in reliability. Keep building, keep scaling.`,
  },
  headlines: [
    "Staff Distributed Systems Engineer | Decoupling FinTech Payment Architecture | Saving $1.2M in annual cloud overhead",
    "Technical Leader & Systems Architect | Fintech Pioneer | Scaling Core Infrastructure to 40K+ TPS",
    "Staff Engineer @ FinTech Corp | Simplifying Distributed Complexity | Real-Time Scaling & Ledger Resilience",
    "Systems Architect | Building Idempotent High-Frequency Transactions | Developer Mentor & Speaker",
    "Distributed Infrastructure Specialist | Reducing Latency & Cloud Cost | High-Throughput Fintech Systems",
  ],
  hashtags: {
    niche: ["#DistributedSystems", "#FintechArchitecture", "#Idempotency", "#LatencyReduction", "#CloudEngineering"],
    trending: ["#SoftwareEngineering", "#SystemDesign", "#CloudArchitecture", "#TechLeadership", "#Scale"],
  },
  engagementStrategy: {
    bestPostingTime: "Tuesday, 8:45 AM EST (Peak developer & fintech director transit window)",
    firstCommentIdea: "👇 I wrote a short, deep-dive article covering the actual idempotency code examples we used. Link is in the comments! Feedback is very welcome.",
    audienceToTag: "Principal Developers, Director of Platform Engineering, Fintech CTOs",
    tactics: [
      "Reply to every comment within the first 45 minutes of posting to trigger the LinkedIn priority feed multiplier.",
      "Send the post link to your internal engineering Slack channel for natural initial team endorsements.",
      "Engage with 3 other Systems Engineer posts (under #SystemDesign) prior to hitting publish to prime your social algorithm.",
    ],
  },
  brandAnalysis: {
    keyStrengths: [
      "Distributed Fintech Scaling & Ledger Decoupling",
      "Pragmatic System Design & Operational Resilience",
      "High-Impact Cloud Cost and Performance Optimization ($1.2M saved)",
    ],
    keywords: ["Distributed Systems", "Fintech Scaling", "Latency Reduction", "Cloud Architecture", "Ledger Safety"],
    pillars: ["System Architecture Tales", "Operational Failures & Recoveries", "Cloud Optimization Playbooks"],
  },
  contentCalendar: [
    {
      day: "Day 1",
      title: "The Silent Cost of Microservices",
      description: "Explain why single-instance database bounds saved us after overcomplicating with microservices.",
      keyMessage: "Premature microservices invite network partition failures.",
    },
    {
      day: "Day 2",
      title: "Designing for Idempotency",
      description: "Share a clean, bite-sized flowchart graphic or code sample illustrating unique checkout token keys.",
      keyMessage: "Every critical endpoint must handle retries safely.",
    },
    {
      day: "Day 3",
      title: "Post-Mortem of a $1.2M Cloud Saving",
      description: "Break down the exact CPU cycle reductions and garbage collection tweaks that halved our telemetry bill.",
      keyMessage: "Infrastructure efficiency comes from better algorithms, not bigger machines.",
    },
    {
      day: "Day 4",
      title: "Interactive Poll: Ledger Integrity",
      description: "Ask your peer audience whether they prefer optimistic or pessimistic database locking schemes for financial systems.",
      keyMessage: "Crowdsource community engineering tradeoffs to boost high-reach comments.",
    },
    {
      day: "Day 5",
      title: "My Standard Developer Testing Standard",
      description: "A checklist describing why we mandate integration-sandbox tests over superficial 100% unit specs.",
      keyMessage: "Real coverage mimics production networks.",
    },
    {
      day: "Day 6",
      title: "Scale is Not a Badge of Honor",
      description: "Contrast complex architecture with simple, single-thread SQLite speed for smaller business scales.",
      keyMessage: "Choose the simplest database that satisfies target latency.",
    },
    {
      day: "Day 7",
      title: "Mentor Lessons: Elevating Juniors",
      description: "A celebratory post highlighting how your junior developer team successfully shipped their first automated failover run.",
      keyMessage: "Building people builds the distributed system.",
    },
  ],
  profileSuggestions: {
    headline: "Formulas applied: '[Role] | [Benefit/Value statement] | [Niche proof of authority]'. Avoid wordy tags like 'Passionate about coding' or 'Multi-tasking wizard'. Use a vertical separator pipe (|) to index keywords cleanly.",
    about: `🚀 I design, audit, and scale resilient distributed systems for high-throughput fintech ledgers.

As a Staff Systems Architect with 10+ years of engineering experience, I specialize in reducing core transaction latency, simplifying over-engineered microservice platforms, and slashing operational cloud overhead. 

Key Milestones:
💡 Re-architected financial API transaction pathways, cutting latency by 45% ($1.2M saved annually).
💡 Built idempotent request handling to guarantee zero lost transactions across 40K peak requests/sec.
💡 Built, mentored, and scaled 15+ member world-class platform engineering departments.

Core Expertise: Distributed ledger safety | API Perf | Cloud Costs Optimization | Systems Engineering | Tech Mentorship.

Let's discuss scaling bounds or system audits: DM me or mail at: alex@example.com`,
    featured: [
      "Case Study PDF: How We Saved $1.2M Annually (Step-By-Step Optimization Blueprint)",
      "Technical Deep Dive: Decoupling Batch Ledger Queues Without Write Starvation",
      "Interactive Guide: Quick Idempotent Key Generator & Best Practice Rules",
    ],
  },
};
