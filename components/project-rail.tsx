"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

type Project = { number: string; title: string; label: string; summary: string; color: string };

export function ProjectRail({ projects }: { projects: Project[] }) {
  return (
    <div className="project-rail">
      {projects.map((project) => (
        <motion.article
          className={`project-card ${project.color}`}
          key={project.title}
          whileHover={{ y: -10, rotate: project.number === "02" ? 0.6 : -0.4 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <div className="project-meta"><span>{project.number}</span><ArrowUpRight /></div>
          <div>
            <p>{project.label}</p>
            <h3>{project.title}</h3>
          </div>
          <p className="project-summary">{project.summary}</p>
        </motion.article>
      ))}
    </div>
  );
}

