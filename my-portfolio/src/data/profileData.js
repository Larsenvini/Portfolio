const profileData = {
  name: "Vinicius Larsen",
  title: "AI / MLOps Engineer",
  email: "larsenvinicius8@gmail.com",
  location: "Rio de Janeiro, Brazil",

  // Hero copy
  heroLead: "I build, test, and ship",
  heroAccent: "intelligent systems.",
  heroDek:
    "AI Engineer working at the intersection of machine learning, automation, and quality. I treat models as production software — versioned, monitored, and tested like everything else.",

  // The hero terminal commands
  terminalLines: [
    { type: "prompt", text: "$ inference --start --model=portfolio.v5" },
    { type: "system", text: "loading model weights..." },
    { type: "system", text: "eval gates: 14/14 passed" },
    { type: "system", text: "ready. generating output:" },
  ],

  manifesto: [
    { num: "01", text: "Models are software. Test them like software." },
    { num: "02", text: "Pipelines beat prototypes." },
    { num: "03", text: "If it isn't observable, it isn't production." },
    { num: "04", text: "QA isn't downstream. It's the loop." },
  ],

  pillars: [
    {
      label: "AI / ML",
      heading: "I ship models, not demos.",
      body: "RAG pipelines, fine-tuning, agent systems, and the boring infrastructure that keeps them running — versioning, evaluation, observability, retraining.",
    },
    {
      label: "QA Automation",
      heading: "I test what I build.",
      body: "End-to-end suites in Playwright and Selenium, CI/CD pipelines on GitHub Actions, evaluation frameworks for non-deterministic AI outputs.",
    },
    {
      label: "Full Stack",
      heading: "I deploy what I test.",
      body: "Production web applications across React, Next.js, Django, Node — with real users and real feedback loops, not just side projects.",
    },
  ],

  // Flagship system — featured in its own section (EvalReport) and pinned first in Work
  flagship: {
    name: "rag-eval-lab",
    tagline: "A RAG system that fails its own build when quality drops.",
    summary:
      "Production-grade retrieval-augmented generation over Kubernetes documentation, wrapped in the same discipline I'd demand from any software: 41 labeled eval questions scored on every commit, locked baselines for regression detection, and CI that refuses to ship a worse answer.",
    pipeline: [
      { label: "Query", sub: "user question" },
      { label: "Hybrid Retrieval", sub: "BM25 + embeddings + RRF" },
      { label: "Generate", sub: "grounded, cited" },
      { label: "Eval Gate", sub: "14 assertions in CI" },
    ],
    metrics: [
      { label: "faithfulness", baseline: 0.815, current: 0.859, delta: "+4.4%" },
      { label: "answer_relevance", baseline: 0.778, current: 0.846, delta: "+7.0%" },
      { label: "gt_similarity", baseline: 0.61, current: 0.7, delta: "+9.0%" },
    ],
    highlight: { label: "retrieval_misses", baseline: "10/41", current: "3/41", delta: "−70%" },
    facts: [
      "N=3 median runs to tame LLM-judge variance",
      "Locked baselines — regressions fail the build",
      "Daily smoke tests against the live deployment",
      "Ablation studies documented per experiment",
    ],
    technologies: ["Python", "FastAPI", "ChromaDB", "OpenAI", "pytest", "GitHub Actions", "Docker", "Fly.io"],
    githubLink: "https://github.com/Larsenvini/rag-eval-lab",
    liveLink: "https://rag-eval-lab.fly.dev/",
  },

  bioParagraphs: [
    "I'm an AI Engineer based in Rio de Janeiro. My background is QA Automation — which means before I built models, I was building the infrastructure that catches things when they break.",
    "That perspective stuck. Today I work on the full ML stack: RAG pipelines, model evaluation, CI/CD for AI, and the production systems most teams skip until something breaks.",
    "Open to MLOps and AI Engineer roles, full-time or contract. Remote-first.",
  ],

  profileImage: "/img/profile.PNG",
  aboutImage: "/img/about.jpg",

  contacts: {
    linkedin: "https://linkedin.com/in/vinilarsen",
    github: "https://github.com/Larsenvini",
    email: "larsenvinicius8@gmail.com",
  },

  experience: [
    {
      role: "AI / MLOps Engineer",
      company: "Independent",
      period: "2025 — Present",
      description:
        "Designed and shipped rag-eval-lab: a production RAG system with hybrid retrieval (BM25 + embeddings + reciprocal rank fusion), automated LLM-judge evaluation, and CI quality gates that block regressions. Deployed on Fly.io with daily smoke tests.",
      tags: ["FastAPI", "ChromaDB", "OpenAI", "GitHub Actions", "Docker"],
    },
    {
      role: "QA Automation Engineer",
      company: "Carta",
      period: "2023 — Present",
      description:
        "Maintaining E2E test frameworks in Playwright and Selenium, building CI/CD pipelines on GitHub Actions, and shifting QA earlier in the development cycle.",
      tags: ["Playwright", "Selenium", "GitHub Actions", "Python"],
    },
    {
      role: "Full Stack Developer",
      company: "Freelance",
      period: "2022 — Present",
      description:
        "Production web applications for clients — including a soccer academy site, an academic platform, and a real-time sales analytics dashboard with ARIMA forecasting.",
      tags: ["React", "Next.js", "Node.js", "Django"],
    },
    {
      role: "Software Engineering — University",
      company: "Education",
      period: "2020 — 2023",
      description:
        "Software engineering fundamentals, data science, and AI. Side projects ranged from rule-based expert systems in Prolog to time-series forecasting and email automation.",
      tags: ["Python", "Java", "Data Science", "Prolog"],
    },
  ],

  skills: {
    "AI / ML": ["Python", "RAG Pipelines", "LLM Evaluation", "Hybrid Retrieval", "OpenAI API", "PyTorch"],
    "MLOps": ["Docker", "GitHub Actions", "FastAPI", "ChromaDB", "MLflow", "Fly.io"],
    "QA & Testing": ["Playwright", "Selenium", "pytest", "Cypress", "API Testing"],
    "Languages": ["Python", "TypeScript", "JavaScript", "Java", "C++", "SQL"],
    "Frontend": ["React", "Next.js", "Tailwind CSS", "Framer Motion"],
    "Backend & Data": ["Node.js", "Django", "Flask", "PostgreSQL", "MongoDB", "Redis"],
  },

  projects: [
    {
      idx: "I",
      title: "RAG Eval Lab",
      category: "AI",
      status: "Live",
      description:
        "Production RAG over Kubernetes docs with hybrid retrieval. 41 labeled eval questions and 14 CI assertions gate every commit.",
      technologies: ["Python", "FastAPI", "ChromaDB", "OpenAI", "GitHub Actions", "Docker", "Fly.io"],
      githubLink: "https://github.com/Larsenvini/rag-eval-lab",
      liveLink: "https://rag-eval-lab.fly.dev/",
      previewImage: "/img/rag-system.png",
      featured: true,
      metrics: [
        { label: "faithfulness", value: "0.859", delta: "+4.4%" },
        { label: "relevance", value: "0.846", delta: "+7.0%" },
        { label: "retrieval_misses", value: "3/41", delta: "−70%" },
      ],
    },
    {
      idx: "II",
      title: "CI/CD Test Pipeline for Portfolio",
      category: "QA",
      status: "In Operation",
      description:
        "End-to-end automated test suite covering UI, navigation, responsiveness, mobile nav, and social links. Runs on every push via GitHub Actions.",
      technologies: ["Playwright", "Selenium", "GitHub Actions"],
      githubLink: "https://github.com/Larsenvini/portfolio-tests-ci-cd",
      previewImage: "/img/ci-cd.png",
    },
    {
      idx: "III",
      title: "Sales Insights & Forecasting Platform",
      category: "Full Stack",
      status: "In Operation",
      description:
        "Real-time sales analytics dashboard with predictive insights powered by ARIMA models. Charts, time-series forecasting, and live data updates.",
      technologies: ["Python", "Django", "Chart.js", "Pandas", "ARIMA"],
      githubLink: "https://github.com/Larsenvini/Django-Sales-Dashboard",
      previewImage: "/img/2.png",
    },
    {
      idx: "IV",
      title: "Forza Seven — Soccer Academy",
      category: "Full Stack",
      status: "Live",
      description:
        "Production website for an Italian soccer academy. Multilingual, responsive, deployed on Vercel.",
      technologies: ["React", "Next.js", "Tailwind CSS"],
      githubLink: "https://github.com/Larsenvini/PrivateProjects",
      liveLink: "https://forza-seven.vercel.app/en",
      previewImage: "/img/forza.png",
    },
    {
      idx: "V",
      title: "DotGeeks — Academic Platform",
      category: "Full Stack",
      status: "Archived",
      description:
        "Full-stack academic platform with user registration, authentication, and personalized content delivery.",
      technologies: ["TypeScript", "MongoDB", "Node.js"],
      githubLink: "https://github.com/Larsenvini/DotGeeks",
      previewImage: "/img/dotgeeks.png",
    },
    {
      idx: "VI",
      title: "Prolog Expert System",
      category: "AI",
      status: "Archived",
      description:
        "Web interface for a rule-based expert system. Python + Prolog inference engine + Flask. An early dive into symbolic AI before LLMs took over.",
      technologies: ["Python", "Prolog", "Flask"],
      githubLink: "https://github.com/Larsenvini/Prolog_especialist",
      previewImage: "/img/prolog.png",
    },
    {
      idx: "VII",
      title: "RacerMail — Email Automation",
      category: "Automation",
      status: "Archived",
      description:
        "Automated system for sending and scheduling emails with multiple SMTP providers and templating.",
      technologies: ["Python", "SMTP", "Schedule"],
      githubLink: "https://github.com/Larsenvini/RacerMail-Automation",
      previewImage: "/img/email.png",
    },
    {
      idx: "VIII",
      title: "Delivery Management System",
      category: "Full Stack",
      status: "Archived",
      description:
        "Comprehensive Java application for managing deliveries — order registration, tracking, and notifications.",
      technologies: ["Java"],
      githubLink: "https://github.com/Larsenvini/PrivateProjects",
      previewImage: "/img/delivery.png",
    },
  ],

  comingNext: [
    {
      idx: "IX",
      title: "MLflow Pipeline with DVC",
      category: "MLOps",
      status: "In Formation",
      description:
        "Versioned data, experiment tracking, model registry, automated retraining on drift. Containerized and deployed.",
      technologies: ["MLflow", "DVC", "Docker", "FastAPI"],
    },
  ],
};

export default profileData;
