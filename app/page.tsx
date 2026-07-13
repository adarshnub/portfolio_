import { ArrowDownRight, ArrowUpRight, Download, Github, Linkedin, Mail } from "lucide-react";
import { ProjectRail } from "@/components/project-rail";
import { Reveal } from "@/components/reveal";
import { ScrollSequence } from "@/components/scroll-sequence";
import { SystemSequence } from "@/components/system-sequence";

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
        <SystemSequence />
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
