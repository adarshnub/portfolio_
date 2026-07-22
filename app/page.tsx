import {
  ArrowDownRight,
  ArrowUpRight,
  Brain,
  Download,
  GitBranch,
  Github,
  Linkedin,
  Mail,
  MessageCircle,
  Network,
  ShieldCheck,
} from "lucide-react";
import { ProjectRail } from "@/components/project-rail";
import { Reveal } from "@/components/reveal";
import { ScrollSequence } from "@/components/scroll-sequence";

const projects = [
  {
    number: "01",
    title: "Orbita",
    label: "AI agents / WhatsApp / Mobile + Web",
    summary:
      "An AI task-management platform where agents turn conversations into tasks, reminders, follow-ups, and team workflows across WhatsApp and Orbita Messenger.",
    color: "lime",
  },
  {
    number: "02",
    title: "Infinite Nexus",
    label: "Realtime collaboration / AI film",
    summary:
      "A Figma-like production environment for AI-assisted filmmaking with model orchestration, scene management, permissions, and realtime collaborative editing.",
    color: "blue",
  },
  {
    number: "03",
    title: "Care & Cure",
    label: "OpenAI / Next.js / MongoDB / AWS",
    summary:
      "A bill-validation system that reads PDF bills, applies rate-card rules, catches missing charges and pricing errors, and explains every correction.",
    color: "orange",
  },
  {
    number: "04",
    title: "Video Engine",
    label: "Remotion / SQS / Lambda / FFmpeg",
    summary:
      "A browser video editor with voice transformation, captions, overlays, transitions, and a horizontally scalable render pipeline designed for live production use.",
    color: "pink",
  },
];

const independentProjects = [
  {
    number: "01",
    title: "Tracefy",
    category: "Developer tooling",
    summary:
      "A local-first debugging companion that connects VS Code, browser, terminal, and code context into one redacted timeline for AI-assisted diagnosis and patch previews.",
    stack: ["TypeScript", "VS Code", "Chrome", "OpenAI"],
    color: "lime",
    repo: "https://github.com/adarshnub/tracefy",
    live: "https://tracefy-website.vercel.app",
  },
  {
    number: "02",
    title: "Agent OS",
    category: "Agent runtime",
    summary:
      "A local AI desktop runtime with scoped capabilities, shared memory, brokered device access, audit logs, and rollback snapshots before agents modify a workspace.",
    stack: ["React", "Electron", "Express", "Playwright"],
    color: "blue",
    repo: "https://github.com/adarshnub/agent-os",
  },
  {
    number: "03",
    title: "Kingdom MMO",
    category: "Distributed game systems",
    summary:
      "A server-authoritative mobile 4X foundation with realtime messaging, building queues, map viewports, march dispatch, deterministic combat, workers, and deployment infrastructure.",
    stack: ["NestJS", "Unity", "WebSockets", "Terraform"],
    color: "orange",
    repo: "https://github.com/adarshnub/kingdom-mmo",
  },
  {
    number: "04",
    title: "Textify",
    category: "Speech tooling",
    summary:
      "A Python CLI that turns audio into structured transcripts with word-level timestamps, confidence scores, speaker diarization, and automatic CPU or GPU selection.",
    stack: ["Python", "WhisperX", "Pyannote", "FFmpeg"],
    color: "paper",
    repo: "https://github.com/adarshnub/textify",
  },
  {
    number: "05",
    title: "Conceptly",
    category: "AI education",
    summary:
      "An interactive learning product with short AI lessons, authored wrong-answer feedback, sequential unlocks, XP, streaks, replay, and optional AI coaching.",
    stack: ["Next.js", "Drizzle", "Supabase", "OpenAI"],
    color: "pink",
    repo: "https://github.com/adarshnub/Conceptly",
  },
  {
    number: "06",
    title: "Plotverse",
    category: "AI real estate",
    summary:
      "A multi-agent automation studio that finds, analyzes, and matches real-estate properties with potential clients while keeping each workflow and recommendation inspectable.",
    stack: ["Next.js", "Multi-agent", "Supabase", "OpenAI"],
    color: "navy",
    repo: "https://github.com/adarshnub/plotverse",
  },
];

const ownedProducts = [
  {
    number: "01",
    title: "Org Brain",
    status: "Private beta",
    label: "Operational memory for AI teams",
    summary:
      "A workspace brain that turns GitHub, Linear, chat, code, and project activity into approved operational memory, temporal graph facts, and evidence-backed agent plans.",
    stack: ["React", "Socket.IO", "GitHub indexing", "Linear", "RAG", "Context graph"],
    capabilities: [
      { icon: Brain, label: "@brain answers with code, chat, tickets, and memory" },
      { icon: ShieldCheck, label: "Memory Inbox keeps humans in the approval loop" },
      { icon: Network, label: "Context Graph maps repos, owners, workflows, tools, and decisions" },
      { icon: GitBranch, label: "@agent drafts shadow-mode plans before any execution" },
      { icon: MessageCircle, label: "Realtime workspace chat becomes searchable team context" },
    ],
  },
];

const systemNodes = [
  {
    id: "01",
    title: "Product",
    detail: "Real user intent, constraints, and success criteria.",
    tone: "pink",
  },
  {
    id: "02",
    title: "Interface",
    detail: "Fast controls, visible state, and direct feedback.",
    tone: "lime",
  },
  {
    id: "03",
    title: "Models",
    detail: "Grounded reasoning with context, tools, and guardrails.",
    tone: "blue",
  },
  {
    id: "04",
    title: "Queues",
    detail: "Reliable jobs, retries, progress, and cost awareness.",
    tone: "orange",
  },
  {
    id: "05",
    title: "Render",
    detail: "Outputs that can be inspected, shipped, and improved.",
    tone: "paper",
  },
];

const experience = [
  {
    period: "MAY 2026 - NOW",
    company: "Ant Venture",
    role: "AI Engineer",
    place: "Abu Dhabi, UAE",
    detail: "Agentic task systems, emergency-response software, and AI-assisted healthcare operations.",
  },
  {
    period: "SEP 2025 - MAY 2026",
    company: "TGH Technologies",
    role: "SDE 2",
    place: "Kochi, Kerala",
    detail: "AI video synthesis, realtime creative tooling, polygon masking, and scalable rendering infrastructure.",
  },
  {
    period: "JAN 2024 - AUG 2025",
    company: "TGH Technologies",
    role: "Frontend Developer",
    place: "Kochi, Kerala",
    detail: "Shipped production Next.js products, complex workflows, animation systems, and authentication flows.",
  },
];

const stack = [
  "NEXT.JS", "TYPESCRIPT", "REACT", "SUPABASE", "OPENAI", "REMOTION", "FFMPEG",
  "AWS LAMBDA", "SQS + DLQ", "LIVEBLOCKS", "REACT FLOW", "MONGODB", "FRAMER MOTION",
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="V Adarsh, back to top">VA<span>.</span></a>
        <nav aria-label="Primary navigation">
          <a href="#work">Work</a>
          <a href="#independent">Labs</a>
          <a href="#products">Products</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="availability" href="mailto:adarshmanjady@gmail.com">
          <span className="status-dot" aria-hidden="true" /> Available for ambitious builds
        </a>
      </header>

      <section id="top" className="hero-shell">
        <ScrollSequence />
      </section>

      <section id="about" className="manifesto section-pad">
        <Reveal>
          <p className="eyebrow">AI ENGINEER / FULLSTACK</p>
          <h2>I make complex AI systems feel <span>direct, visual, and alive.</span></h2>
        </Reveal>
        <Reveal delay={0.12} className="manifesto-copy">
          <p>
            I&apos;m V Adarsh, an engineer from Kerala building agentic products, realtime creative tools,
            and video infrastructure that survives contact with real users.
          </p>
          <a className="cutout-link" href="/adarsh-v-resume.pdf" download>
            <Download size={18} /> Resume.pdf
          </a>
        </Reveal>
      </section>

      <section className="system-section" aria-labelledby="system-title">
        <div className="system-copy section-pad">
          <p className="eyebrow light">HOW I THINK</p>
          <h2 id="system-title">One connected system.<br />No black boxes.</h2>
          <p>
            Product, interface, models, queues, and rendering are designed as one continuous experience.
          </p>
        </div>
        <div className="system-map" aria-label="Connected product system map">
          <div className="system-map-board">
            <div className="system-map-line system-line-a" aria-hidden="true" />
            <div className="system-map-line system-line-b" aria-hidden="true" />
            <div className="system-map-line system-line-c" aria-hidden="true" />
            <div className="system-map-line system-line-d" aria-hidden="true" />
            <div className="system-map-line system-line-e" aria-hidden="true" />

            <div className="system-core-node">
              <Brain size={38} aria-hidden="true" />
              <span>SYSTEM<br />CORE</span>
            </div>

            {systemNodes.map((node) => (
              <div className={`system-node system-node-${node.tone}`} key={node.id}>
                <div>
                  <span>{node.id}</span>
                  <strong>{node.title}</strong>
                </div>
                <p>{node.detail}</p>
              </div>
            ))}
          </div>

          <div className="system-pipeline" aria-label="Pipeline stages">
            {systemNodes.map((node) => (
              <div className={`system-pipeline-step system-pipeline-${node.tone}`} key={node.title}>
                <span>{node.id}</span>
                <strong>{node.title}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="products" className="product-lab section-pad" aria-labelledby="products-title">
        <div className="product-lab-intro">
          <div>
            <p className="eyebrow light">OWNED PRODUCTS</p>
            <h2 id="products-title">A shelf for products I&apos;m building end to end.</h2>
          </div>
          <p>
            This is where my own products live, separate from client and company systems. Org Brain is
            the first one: a real operating layer for teams that want AI agents to understand how work
            actually happens.
          </p>
        </div>

        <div className="owned-product-grid">
          {ownedProducts.map((product, index) => (
            <Reveal className="owned-product-card" key={product.title} delay={index * 0.08}>
              <div className="owned-product-copy">
                <div className="owned-product-meta">
                  <span>{product.number}</span>
                  <span>{product.status}</span>
                </div>
                <p className="owned-product-label">{product.label}</p>
                <h3>{product.title}</h3>
                <p className="owned-product-summary">{product.summary}</p>
                <div className="owned-product-stack" aria-label={`${product.title} stack`}>
                  {product.stack.map((item) => <span key={item}>{item}</span>)}
                </div>
              </div>

              <div className="owned-product-map" aria-label={`${product.title} capabilities`}>
                <div className="product-core">
                  <Brain size={34} aria-hidden="true" />
                  <span>MEMORY<br />CORE</span>
                </div>
                <div className="product-signal product-signal-chat">CHAT</div>
                <div className="product-signal product-signal-code">CODE</div>
                <div className="product-signal product-signal-ticket">LINEAR</div>
                <div className="product-signal product-signal-agent">AGENT</div>
                <div className="product-signal-line line-one" aria-hidden="true" />
                <div className="product-signal-line line-two" aria-hidden="true" />
                <div className="product-signal-line line-three" aria-hidden="true" />
                <div className="product-signal-line line-four" aria-hidden="true" />
              </div>

              <div className="owned-product-capabilities">
                {product.capabilities.map(({ icon: Icon, label }) => (
                  <div className="capability-row" key={label}>
                    <Icon size={17} aria-hidden="true" />
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          ))}

          <div className="product-index" aria-label="Future product index">
            <div className="product-index-head">
              <span>Product index</span>
              <span>{String(ownedProducts.length).padStart(2, "0")} live</span>
            </div>
            <div className="product-index-row is-active">
              <span>01</span>
              <strong>Org Brain</strong>
              <em>Operational memory</em>
            </div>
            <div className="product-index-row">
              <span>02</span>
              <strong>Next product</strong>
              <em>Reserved</em>
            </div>
            <div className="product-index-row">
              <span>03</span>
              <strong>Next product</strong>
              <em>Reserved</em>
            </div>
          </div>
        </div>
      </section>

      <section id="work" className="work-section">
        <div className="section-heading section-pad">
          <div>
            <p className="eyebrow">SELECTED SYSTEMS / 2024-2026</p>
            <h2>Work that moves.</h2>
          </div>
          <ArrowDownRight size={52} strokeWidth={1.5} aria-hidden="true" />
        </div>
        <ProjectRail projects={projects} />
      </section>

      <section
        id="independent"
        className="independent-projects section-pad"
        aria-labelledby="independent-title"
      >
        <div className="independent-intro">
          <div>
            <p className="eyebrow light">SIDE QUESTS / OPEN SOURCE</p>
            <h2 id="independent-title">Independent builds.</h2>
          </div>
          <div className="independent-intro-copy">
            <p>
              Useful tools, ambitious systems, and experiments I built because the problem was too
              interesting to leave alone.
            </p>
            <a href="https://github.com/adarshnub?tab=repositories" target="_blank" rel="noreferrer">
              <Github size={18} aria-hidden="true" /> All repositories <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="independent-grid">
          {independentProjects.map((project, index) => (
            <Reveal className="independent-card-reveal" key={project.title} delay={(index % 2) * 0.08}>
              <article className={`independent-card ${project.color}`}>
                <div className="independent-card-meta">
                  <span>{project.number} / 06</span>
                  <span>{project.category}</span>
                </div>

                <div className="independent-card-copy">
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                </div>

                <div className="independent-card-stack" aria-label={`${project.title} technology stack`}>
                  {project.stack.map((item) => <span key={item}>{item}</span>)}
                </div>

                <div className="independent-card-links">
                  <a href={project.repo} target="_blank" rel="noreferrer">
                    <Github size={17} aria-hidden="true" /> Source <ArrowUpRight size={16} aria-hidden="true" />
                  </a>
                  {project.live && (
                    <a href={project.live} target="_blank" rel="noreferrer">
                      Live project <ArrowUpRight size={16} aria-hidden="true" />
                    </a>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="experience section-pad" aria-labelledby="experience-title">
        <div className="experience-intro">
          <p className="eyebrow">FIELD NOTES</p>
          <h2 id="experience-title">Experience</h2>
        </div>
        <div className="timeline">
          {experience.map((item, index) => (
            <Reveal className="timeline-row" key={`${item.company}-${item.role}`} delay={index * 0.06}>
              <p className="timeline-period">{item.period}</p>
              <div>
                <h3>{item.company}</h3>
                <p className="role">{item.role} / {item.place}</p>
              </div>
              <p className="timeline-detail">{item.detail}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="stack-band" aria-label="Technical stack">
        <div className="stack-track">
          {[...stack, ...stack].map((item, index) => <span key={`${item}-${index}`}>{item}<i /></span>)}
        </div>
      </section>

      <section id="contact" className="contact section-pad">
        <p className="eyebrow">START A CONVERSATION</p>
        <h2>Have a hard problem?<br /><span>Bring it here.</span></h2>
        <div className="contact-actions">
          <a className="contact-primary" href="mailto:adarshmanjady@gmail.com">
            <Mail size={24} /> adarshmanjady@gmail.com <ArrowUpRight size={24} />
          </a>
          <div className="socials">
            <a href="https://github.com/adarshnub" target="_blank" rel="noreferrer" aria-label="GitHub"><Github /></a>
            <a href="https://www.linkedin.com/in/adarsh-viswam-95161016b/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin /></a>
          </div>
        </div>
        <footer>
          <p>V ADARSH / KOTTAYAM, KERALA</p>
          <p>BUILT FRAME BY FRAME / 2026</p>
        </footer>
      </section>
    </main>
  );
}
