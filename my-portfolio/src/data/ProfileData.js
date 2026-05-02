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
    { type: "prompt", text: "$ inference --start --model=portfolio.v4" },
    { type: "system", text: "loading model weights..." },
    { type: "system", text: "context_window: 8192 tokens" },
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
      role: "QA Automation Engineer",
      company: "Current Role",
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
    "AI / ML": ["Python", "PyTorch", "TensorFlow", "OpenAI API", "LangChain", "RAG"],
    "MLOps": ["Docker", "Kubernetes", "MLflow", "GitHub Actions", "FastAPI", "Pinecone"],
    "QA & Testing": ["Playwright", "Selenium", "Cypress", "Postman", "API Testing"],
    "Languages": ["Python", "TypeScript", "JavaScript", "Java", "C++", "SQL"],
    "Frontend": ["React", "Next.js", "Tailwind CSS", "Framer Motion"],
    "Backend & Data": ["Node.js", "Django", "Flask", "PostgreSQL", "MongoDB", "Redis"],
  },

  projects: [
    {
      idx: "I",
      title: "CI/CD Test Pipeline for Portfolio",
      category: "QA",
      status: "In Operation",
      description:
        "End-to-end automated test suite covering UI, navigation, responsiveness, mobile nav, and social links. Runs on every push via GitHub Actions.",
      technologies: ["Playwright", "Selenium", "GitHub Actions"],
      githubLink: "https://github.com/Larsenvini/portfolio-tests-ci-cd",
      previewImage: "/img/ci-cd.png",
      featured: true,
    },
    {
      idx: "II",
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
      idx: "III",
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
      idx: "IV",
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
      idx: "V",
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
      idx: "VI",
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
      idx: "VII",
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
      idx: "VIII",
      title: "RAG Pipeline + Evaluation Framework",
      category: "MLOps",
      status: "In Formation",
      description:
        "End-to-end RAG system with a labeled evaluation set, automated quality scoring, and CI integration. The AI project that proves QA + AI are the same skill.",
      technologies: ["LangChain", "RAGAS", "Pinecone", "FastAPI", "GitHub Actions"],
    },
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
