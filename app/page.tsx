"use client";

import type React from "react";
import { useState } from "react";
import { Typewriter } from "@/components/typewriter";
import { SiteNavbar } from "@/components/site-navbar";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Code2,
  Server,
  Boxes,
  Cloud,
  GitBranch,
  Briefcase,
  GraduationCap,
  School,
  FileDown,
} from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { IconType } from "react-icons";
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiRedux,
  SiTailwindcss,
  SiMui,
  SiShadcnui,
  SiBootstrap,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiMongoose, // Added Mongoose
  SiPostgresql,
  SiDocker,
  SiKubernetes,
  SiGithubactions,
  SiJenkins,
  SiVercel,
  SiRender,
  SiNetlify,
  SiHeroku,
  SiGit,
  SiGithub,
  SiX,
  SiEjs,
  SiPassport,
  SiAxios, // Added Axios
  SiSocketdotio, // Added Socket.IO
  SiPm2, // Added PM2
} from "react-icons/si";
import { MdEmail } from "react-icons/md";
import { FaAws, FaGithub, FaLinkedin, FaServer } from "react-icons/fa"; // Added FaServer
import { BsShieldLockFill } from "react-icons/bs"; // Added BsShieldLockFill
import { DiNodejsSmall } from "react-icons/di"; // Added DiNodejsSmall
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

const skillIconMap: Record<string, IconType> = {
  // Frontend
  HTML: SiHtml5,
  CSS: SiCss3,
  JavaScript: SiJavascript,
  "React.js": SiReact,
  "Next.js": SiNextdotjs,
  Redux: SiRedux,
  "Tailwind CSS": SiTailwindcss,
  "Material UI": SiMui,
  ShadCN: SiShadcnui,
  Bootstrap: SiBootstrap,
  EJS: SiEjs,
  Axios: SiAxios, // Added Axios
  "Socket.IO": SiSocketdotio, // Added Socket.IO (using same for client/server for simplicity)
  // Backend
  "Node.js": SiNodedotjs,
  "Express.js": SiExpress,
  MongoDB: SiMongodb,
  Mongoose: SiMongoose, // Added Mongoose
  SQL: SiPostgresql, // representative icon
  PostgreSQL: SiPostgresql,
  "Passport.js(Auth)": SiPassport,
  "RESTful APIs": Code2,
  "MVC Architecture": Server,
  Bcrypt: BsShieldLockFill, // Added Bcrypt
  Crypto: BsShieldLockFill, // Added Crypto
  Nodemon: DiNodejsSmall, // Added Nodemon
  PM2: SiPm2, // Added PM2
  "HTTP-Status": FaServer, // Added HTTP-Status
  // DevOps & Deployment
  Docker: SiDocker,
  Kubernetes: SiKubernetes,
  "CI/CD": SiGithubactions,
  "GitHub Actions": SiGithubactions,
  Jenkins: SiJenkins,
  "Green-Blue Deployment": SiKubernetes,
  // Cloud/VCS/Concepts
  "AWS EC2": FaAws,
  Vercel: SiVercel,
  Render: SiRender,
  Netlify: SiNetlify,
  Heroku: SiHeroku,
  Git: SiGit,
  GitHub: SiGithub,
};

const skillBrandColors: Record<string, string> = {
  // Frontend
  HTML: "#E34F26",
  CSS: "#1572B6",
  JavaScript: "#F7DF1E",
  "React.js": "#61DAFB",
  "Next.js": "#FFFFFF", // Next is monochrome
  Redux: "#764ABC",
  "Tailwind CSS": "#38B2AC",
  "Material UI": "#007FFF",
  ShadCN: "#FFFFFF", // monochrome
  Bootstrap: "#7952B3",
  EJS: "#A91E50",
  Axios: "#5A29E4", // Added Axios
  // Backend
  "Node.js": "#339933",
  "Express.js": "#FFFFFF", // monochrome
  MongoDB: "#47A248",
  Mongoose: "#880000", // Added Mongoose
  SQL: "#336791",
  PostgreSQL: "#336791",
  "Passport.js(Auth)": "#34E27A",
  "RESTful APIs": "#FFFFFF",
  "MVC Architecture": "#FFFFFF",
  "Socket.IO": "#FFFFFF", // Added Socket.IO (Monochrome)
  Bcrypt: "#6C757D", // Added Bcrypt (Neutral)
  Crypto: "#6C757D", // Added Crypto (Neutral)
  Nodemon: "#76D04B", // Added Nodemon
  PM2: "#2B037A", // Added PM2
  "HTTP-Status": "#6C757D", // Added HTTP-Status (Neutral)
  // DevOps & Deployment
  Docker: "#2496ED",
  Kubernetes: "#326CE5",
  "CI/CD": "#2088FF", // GitHub Actions blue
  "GitHub Actions": "#2088FF",
  Jenkins: "#D24939",
  "Green-Blue Deployment": "#34D399",
  // Cloud/VCS/Concepts
  "AWS EC2": "#FF9900",
  Vercel: "#FFFFFF", // monochrome
  Render: "#46E3B7",
  Netlify: "#00C7B7",
  Heroku: "#430098",
  Git: "#F05032",
  GitHub: "#F5F5F5", // GitHub brand is black; use off‑white on dark
};

const socialBrandColors = {
  email: "#D1D5DB", // muted gray
  github: "#F5F5F5",
  linkedin: "#0A66C2",
  x: "#FFFFFF", // X is monochrome
};

function SkillPill({ name }: { name: string }) {
  const Icon = skillIconMap[name];
  const color = skillBrandColors[name];
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-foreground/5 px-2 py-1 text-xs text-muted-foreground">
      {Icon ? (
        <Icon
          aria-hidden
          className="h-3.5 w-3.5"
          style={color ? { color } : undefined}
        />
      ) : (
        <Code2 aria-hidden className="h-3.5 w-3.5" />
      )}
      <span>{name}</span>
    </span>
  );
}

function handleAnchorClick(e: React.MouseEvent, href: string) {
  if (!href.startsWith("#")) return;
  const id = href.slice(1);
  const el = document.getElementById(id);
  if (!el) return;
  e.preventDefault();
  const header = document.querySelector("header");
  const offset = header?.offsetHeight ?? 72;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: "smooth" });
  history.replaceState?.(null, "", href);
}

export default function HomePage() {
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 600], [0, -120]);
  const yImg = useTransform(scrollY, [0, 600], [0, -40]);
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast({
          title: "Message sent!",
          description: "I'll get back to you as soon as possible.",
        });
        (event.target as HTMLFormElement).reset();
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteNavbar />
      <Toaster />

      {/* Hero */}
      <section
        id="home"
        className="relative isolate overflow-hidden mx-auto max-w-6xl px-4 pt-12 md:pt-20"
      >
        <motion.div
          style={{ y: yBg }}
          aria-hidden
          className="parallax-bg absolute inset-0 -z-10"
        />
        <div className="flex flex-col-reverse items-start gap-8 md:flex-row md:items-center">
          <div className="flex-1">
            <h1 className="text-balance text-3xl font-semibold leading-tight md:text-4xl">
              Sk Asif Ahmed —{" "}
              <Typewriter
                className="text-primary"
                words={[
                  "Full‑Stack Developer ",
                  "Data Structures & Algorithms ",
                  "LeetCode Solver",
                  "Backend Learner",
                  "DevOps Explorer",
                ]}
              />
            </h1>
            <p className="mt-4 text-pretty text-muted-foreground md:text-lg">
              I build scalable web applications and love experimenting with
              modern frameworks and deployment strategies. I’m growing my backend
              expertise while staying grounded in strong frontend fundamentals.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Button asChild className="hover-elevate">
                <Link
                  href="#projects"
                  onClick={(e) => handleAnchorClick(e, "#projects")}
                >
                  See Projects
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="hover-elevate border-border bg-transparent hover:bg-foreground/5"
              >
                <a
                  href="#contact"
                  onClick={(e) => handleAnchorClick(e, "#contact")}
                >
                  Get in touch
                </a>
              </Button>
            </div>

            <div className="mt-6 flex items-center gap-4 text-muted-foreground">
              <a
                href="mailto:skasifahmedofficial@gmail.com"
                className="inline-flex items-center gap-2 hover:text-foreground"
                aria-label="Email"
              >
                <MdEmail
                  className="h-4 w-4"
                  aria-hidden="true"
                  style={{ color: socialBrandColors.email }}
                />{" "}
                <span className="sr-only">Email</span>
              </a>
              <a
                href="https://github.com/Asiff07"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 hover:text-foreground"
                aria-label="GitHub"
              >
                <FaGithub
                  className="h-4 w-4"
                  aria-hidden="true"
                  style={{ color: socialBrandColors.github }}
                />{" "}
                <span className="sr-only">GitHub</span>
              </a>
              <a
                href="https://linkedin.com/in/skasifahmed"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 hover:text-foreground"
                aria-label="LinkedIn"
              >
                <FaLinkedin
                  className="h-4 w-4"
                  aria-hidden="true"
                  style={{ color: socialBrandColors.linkedin }}
                />{" "}
                <span className="sr-only">LinkedIn</span>
              </a>
              <a
                href="https://x.com/skasif_ahmed1"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 hover:text-foreground"
                aria-label="X (Twitter)"
              >
                <SiX
                  className="h-4 w-4"
                  aria-hidden="true"
                  style={{ color: socialBrandColors.x }}
                />{" "}
                <span className="sr-only">X (Twitter)</span>
              </a>
            </div>
          </div>

          {/* Profile image */}
          <motion.div style={{ y: yImg }} className="flex-1 w-full md:w-auto">
            <div className="relative mx-auto md:mx-0">
              {/* Decorative background layers behind the portrait */}
              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-[-12%] -z-10 rounded-[28px]"
                style={{ y: yImg }}
              >
                <div
                  className="absolute inset-0 rounded-[28px]"
                  style={{
                    background:
                      "radial-gradient(60% 60% at 50% 40%, color-mix(in oklab, var(--color-primary) 22%, transparent) 0%, color-mix(in oklab, var(--color-primary) 8%, transparent) 45%, transparent 70%)",
                  }}
                />
                {/* fine grid with fade mask */}
                <div
                  className="absolute inset-0 rounded-[28px] opacity-[0.22]"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, rgba(156,163,175,0.22) 1px, transparent 1px), linear-gradient(to bottom, rgba(156,163,175,0.22) 1px, transparent 1px)",
                    backgroundSize: "14px 14px",
                    maskImage:
                      "radial-gradient(70% 70% at 50% 40%, rgba(0,0,0,0.9) 20%, rgba(0,0,0,0.6) 55%, rgba(0,0,0,0) 75%)",
                    WebkitMaskImage:
                      "radial-gradient(70% 70% at 50% 40%, rgba(0,0,0,0.9) 20%, rgba(0,0,0,0.6) 55%, rgba(0,0,0,0) 75%)",
                  }}
                />
              </motion.div>

              <div className="relative h-40 w-40 overflow-hidden rounded-3xl border border-border md:h-56 md:w-56 hover-elevate">
                <Image
                  src="/images/profile.png"
                  alt="Portrait of Sk Asif Ahmed"
                  width={448}
                  height={448}
                  className="h-full w-full object-cover"
                  priority
                />
                {/* neutral inner ring to replace blue outline */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-3xl"
                  style={{
                    boxShadow: "inset 0 0 0 1px rgba(148,163,184,0.25)",
                  }}
                />
              </div>

              {/* Resume button beside/under the portrait */}
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <Button
                  asChild
                  variant="secondary"
                  className="hover-elevate bg-foreground/10 hover:bg-foreground/20"
                >
                  <a href="/Resume.pdf" download>
                    <FileDown className="mr-2 h-4 w-4" aria-hidden="true" />
                    Download Resume
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="mx-auto mt-16 max-w-6xl px-4 md:mt-24">
        <h2 className="text-balance text-2xl font-semibold md:text-3xl">
          About
        </h2>
        <p className="mt-4 max-w-4xl text-muted-foreground">
          I am Sk Asif Ahmed, an aspiring Full-Stack Developer with a strong
          foundation in Frontend and growing expertise in Backend Development.
          Passionate about building scalable web applications, experimenting with
          modern frameworks, and exploring deployment strategies, I continuously
          sharpen my skills through hands-on projects and real-world learning.
        </p>
      </section>

      {/* Experience */}
      <section id="experience" className="mx-auto mt-16 max-w-6xl px-4 md:mt-24">
        <h2 className="text-balance text-2xl font-semibold md:text-3xl">
          Experience
        </h2>
        <ol role="list" className="mt-6 space-y-6 border-l border-border pl-6">
          <li className="relative">
            {/* marker */}
            <span
              aria-hidden="true"
              className="absolute -left-[7px] top-5 z-10 inline-flex h-3.5 w-3.5 items-center justify-center rounded-full bg-foreground ring-2 ring-ring"
            >
              <Briefcase className="h-2.5 w-2.5 text-background" />
            </span>
            <article className="rounded-lg border bg-card p-5 hover-elevate border-border">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">
                  Full‑Stack Development Journey
                </h3>
                <time className="text-xs text-muted-foreground">
                  2023 — Present
                </time>
              </div>
              <p className="text-sm text-muted-foreground">
                Full‑Stack Development Journey (Ongoing)
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                <li>
                  Completed Frontend projects: Simon Says Game, Tic Tac Toe,
                  Todo List.
                </li>
                <li>
                  Backend with Node.js, Express.js, MongoDB (Sigma 3.0 –
                  Shradha Khapra).
                </li>
                <li>
                  Explored DevOps: CI/CD, containerization, and cloud
                  deployment.
                </li>
              </ul>
            </article>
          </li>

          <li className="relative">
            <span
              aria-hidden="true"
              className="absolute -left-[7px] top-5 z-10 inline-flex h-3.5 w-3.5 items-center justify-center rounded-full bg-foreground ring-2 ring-ring"
            >
              <Briefcase className="h-2.5 w-2.5 text-background" />
            </span>
            <article className="rounded-lg border bg-card p-5 hover-elevate border-border">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">
                  Freelance & Self‑Projects
                </h3>
                <time className="text-xs text-muted-foreground">
                  2021 — Present
                </time>
              </div>
              <p className="text-sm text-muted-foreground">
                Freelance & Self‑Projects
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                <li>
                  Built and deployed projects with React, Next.js, Tailwind,
                  and Vercel.
                </li>
                <li>
                  Experimented with GCam mods, smartphone optimization, and
                  benchmarking tools.
                </li>
              </ul>
            </article>
          </li>
        </ol>
      </section>

      {/* Education */}
      <section id="education" className="mx-auto mt-16 max-w-6xl px-4 md:mt-24">
        <h2 className="text-balance text-2xl font-semibold md:text-3xl">
          Education
        </h2>
        <ol role="list" className="mt-6 space-y-6 border-l border-border pl-6">
          <li className="relative">
            <span
              aria-hidden="true"
              className="absolute -left-[7px] top-5 z-10 inline-flex h-3.5 w-3.5 items-center justify-center rounded-full bg-foreground ring-2 ring-ring"
            >
              <GraduationCap className="h-2.5 w-2.5 text-background" />
            </span>
            <article className="rounded-lg border bg-card p-5 hover-elevate border-border">
              <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                <time>Ongoing</time>
                <span className="hidden md:inline-block">•</span>
                <span>Bachelor’s Degree</span>
              </div>
              <h3 className="mt-1 text-lg font-medium">
                Adamas University — Bachelor’s Degree
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Actively exploring software engineering, web technologies, and
                networking fundamentals.
              </p>
            </article>
          </li>

          <li className="relative">
            <span
              aria-hidden="true"
              className="absolute -left-[7px] top-5 z-10 inline-flex h-3.5 w-3.5 items-center justify-center rounded-full bg-foreground ring-2 ring-ring"
            >
              <School className="h-2.5 w-2.5 text-background" />
            </span>
            <article className="rounded-lg border bg-card p-5 hover-elevate border-border">
              <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                <time>2011 — 2013</time>
                <span className="hidden md:inline-block">•</span>
                <span>Secondary & Higher Secondary</span>
              </div>
              <h3 className="mt-1 text-lg font-medium">
                Egra Public School — (ISCE) Secondary & Higher Secondary
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Completed secondary and higher secondary education, building
                strong academic foundations.
              </p>
            </article>
          </li>

          <li className="relative">
            <span
              aria-hidden="true"
              className="absolute -left-[7px] top-5 z-10 inline-flex h-3.5 w-3.5 items-center justify-center rounded-full bg-foreground ring-2 ring-ring"
            >
              <School className="h-2.5 w-2.5 text-background" />
            </span>
            <article className="rounded-lg border bg-card p-5 hover-elevate border-border">
              <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                <time>2009</time>
                <span className="hidden md:inline-block">•</span>
                <span>Kindergarten</span>
              </div>
              <h3 className="mt-1 text-lg font-medium">
                St James Convent School — Kindergarten (ICSE)
              </h3>
            </article>
          </li>
        </ol>
      </section>

      {/* Skills */}
      <section id="skills" className="mx-auto mt-16 max-w-6xl px-4 md:mt-24">
        <h2 className="text-balance text-2xl font-semibold md:text-3xl">
          Skills
        </h2>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border bg-card p-5 border-border">
            <h3 className="flex items-center gap-2 text-lg font-medium">
              <Code2 className="h-5 w-5 text-primary" aria-hidden="true" />{" "}
              Frontend
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {[
                "HTML",
                "CSS",
                "JavaScript",
                "React.js",
                "Next.js",
                "Redux",
                "Tailwind CSS",
                "Material UI",
                "ShadCN",
                "Bootstrap",
                "EJS",
                "Axios", // Added
                "Socket.IO", // Added
              ].map((name) => (
                <SkillPill key={name} name={name} />
              ))}
            </div>
          </div>

          <div className="rounded-lg border bg-card p-5 border-border">
            <h3 className="flex items-center gap-2 text-lg font-medium">
              <Server className="h-5 w-5 text-primary" aria-hidden="true" />{" "}
              Backend
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {[
                "Node.js",
                "Express.js",
                "MongoDB",
                "Mongoose", // Added
                "SQL",
                "PostgreSQL",
                "Passport.js(Auth)",
                "RESTful APIs",
                "Socket.IO", // Added
                "Bcrypt", // Added
                "Crypto", // Added
                "Nodemon", // Added
                "PM2", // Added
                "HTTP-Status", // Added
              ].map((name) => (
                <SkillPill key={name} name={name} />
              ))}
            </div>
          </div>

          <div className="rounded-lg border bg-card p-5 border-border">
            <h3 className="flex items-center gap-2 text-lg font-medium">
              <Boxes className="h-5 w-5 text-primary" aria-hidden="true" />{" "}
              DevOps & Deployment
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {[
                "Docker",
                "Kubernetes",
                "CI/CD",
                "GitHub Actions",
                "Jenkins",
                "Green-Blue Deployment",
              ].map((name) => (
                <SkillPill key={name} name={name} />
              ))}
            </div>
          </div>

          <div className="rounded-lg border bg-card p-5 border-border">
            <h3 className="flex items-center gap-2 text-lg font-medium">
              <Cloud className="h-5 w-5 text-primary" aria-hidden="true" />{" "}
              Cloud,{" "}
              <GitBranch className="h-5 w-5 text-primary" aria-hidden="true" />{" "}
              VCS & Concepts
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {[
                "AWS EC2",
                "Vercel",
                "Render",
                "Netlify",
                "Heroku",
                "Git",
                "GitHub",
                "Networking (TCP/UDP/OSI)",
                "Deployment Strategies",
                "Performance Optimization",
                "MVC Architecture",
              ].map((name) => (
                <SkillPill key={name} name={name} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="mx-auto mt-16 max-w-6xl px-4 md:mt-24">
        <h2 className="text-balance text-2xl font-semibold md:text-3xl">
          Projects
        </h2>
        <div className="mt-6 grid gap-6">
          {[
            {
              title: "Wanderlust – Hotel Booking Website",
              desc: "A full-stack hotel booking app built using Node.js, Express.js, MongoDB (Mongoose), EJS, Bootstrap, and MVC architecture. Features include hotel browsing, booking, authentication (Passport.js), flash alerts, sessions, Map Features and method-override for RESTful operations. Deployed on Render, with dotenv for secure environment management",
              tech: [
                "JavaScript",
                "Node.js",
                "MongoDB",
                "Mongoose",
                "Express.js",
                "Passport.js(Auth)",
                "EJS",
                "Bootstrap",
                "MVC Architecture",
                "Render",
              ],
              image: "/images/wanderlust.png",
              link: "https://wanderlust-k5em.onrender.com/listings",
            },
            {
              title: "Apna Video Call – Cover the distance",
              desc: "A real-time video conferencing web app built with the MERN stack (MongoDB, Express.js, React.js, Node.js) and Socket.IO for live communication. Includes secure authentication (bcrypt & crypto), instant meeting room creation, real-time chat, and a sleek Material-UI interface. Designed for low-latency, high-quality audio/video calls with a scalable backend architecture.",
              tech: [
                "JavaScript",
                "React.js",
                "Node.js",
                "Express.js",
                "MongoDB",
                "Mongoose",
                "Socket.IO",
                "Material UI",
                "Bcrypt",
                "Crypto",
                "RESTful APIs",
              ],
              image: "/images/zoom1.png",
              link: "https://apna-video-call-frontend-gr05.onrender.com/",
            },
            {
              title: "Personal Portfolio Website",
              desc: "A responsive and animated personal portfolio website built with Next.js, React.js and Tailwind CSS. It showcases my skills, education, projects, and experience, and includes my Resume & a functional contact form using Resend",
              tech: ["Next.js", "React.js","Material UI", "Tailwind CSS", "ShadCN", "Vercel"],
              image: "/images/portfolio.png",
              link: "https://asifff.vercel.app/",
            },
            {
              title: "Simon Says Game",
              desc: "Interactive memory-based game built with JavaScript.",
              tech: ["JavaScript", "HTML", "CSS"],
              image: "/images/simon.png",
              link: "https://simon-says-game-asiff.vercel.app/",
            },
            {
              title: "Todo List",
              desc: "Task app with add, delete, and track functionality.",
              tech: ["React.js", "Tailwind CSS"],
              image: "/images/todolist.png",
              link: "https://todo-list-asifff.vercel.app/",
            },
          ].map((p) => (
            <article
              key={p.title}
              className="flex items-start gap-4 rounded-lg border bg-card p-4 transition-all hover:bg-foreground/5 hover:-translate-y-1 hover-elevate border-border"
            >
              <div className="relative w-24 h-24 flex-shrink-0">
                <Image
                  src={
                    p.image ||
                    `/abstract-geometric-shapes.png?key=82d5n&height=360&width=640&query=${encodeURIComponent(
                      p.title
                    )}%20thumbnail`
                  }
                  alt={`${p.title} thumbnail`}
                  fill // Use fill instead of layout
                  style={{ objectFit: "cover" }} // Use style object for objectFit
                  className="rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <h3 className="text-lg font-medium">{p.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {p.tech?.map((name: string) => (
                    <SkillPill key={name} name={name} />
                  ))}
                </div>
                <div className="mt-2">
                  <a href={p.link} target="_blank" rel="noopener noreferrer">
                    <Button
                      variant="ghost"
                      className="px-0 hover-elevate h-auto py-0 text-sm"
                    >
                      View details →
                    </Button>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Achievements */}
      <section
        id="achievements"
        className="mx-auto mt-16 max-w-6xl px-4 md:mt-24"
      >
        <h2 className="text-balance text-2xl font-semibold md:text-3xl">
          Achievements
        </h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground">
          <li>Completed Frontend Development curriculum (Sigma 3.0).</li>
          <li>
            Developed multiple mini‑projects demonstrating problem‑solving and
            design thinking.
          </li>
          <li>
            Continuously learning and applying modern Full‑Stack & DevOps
            practices.
          </li>
        </ul>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="mx-auto mt-16 max-w-6xl px-4 pb-16 md:mt-24 md:pb-24"
      >
        <div className="rounded-lg border bg-card p-6 border-border">
          <h2 className="text-balance text-2xl font-semibold md:text-3xl">
            Contact
          </h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            I’m open to collaborations and opportunities. Reach out via the form
            or the links below.
          </p>

          {/* Simple form (front-end only) */}
          <form className="mt-6 grid gap-4 md:max-w-lg" onSubmit={handleSubmit}>
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" placeholder="Your name" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Tell me about your project..."
                required
              />
            </div>
            <div>
              <Button type="submit" disabled={loading}>
                {loading ? "Sending..." : "Send"}
              </Button>
            </div>
          </form>

          {/* Direct links */}
          <div className="mt-6 grid gap-3 text-sm">
            <a
              className="inline-flex items-center gap-2 text-primary hover:underline underline-offset-2"
              href="mailto:skasifahmedofficial@gmail.com"
            >
              <MdEmail
                className="h-4 w-4"
                aria-hidden="true"
                style={{ color: socialBrandColors.email }}
              />{" "}
              skasifahmedofficial@gmail.com
            </a>
            <a
              className="inline-flex items-center gap-2 text-primary hover:underline underline-offset-2"
              href="https://github.com/Asiff07"
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub
                className="h-4 w-4"
                aria-hidden="true"
                style={{ color: socialBrandColors.github }}
              />{" "}
              github.com/Asiff07
            </a>
            <a
              className="inline-flex items-center gap-2 text-primary hover:underline underline-offset-2"
              href="https://linkedin.com/in/skasifahmed"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedin
                className="h-4 w-4"
                aria-hidden="true"
                style={{ color: socialBrandColors.linkedin }}
              />{" "}
              linkedin.com/in/skasifahmed
            </a>
            <a
              className="inline-flex items-center gap-2 text-primary hover:underline underline-offset-2"
              href="https://x.com/skasif_ahmed1"
              target="_blank"
              rel="noreferrer"
            >
              <SiX
                className="h-4 w-4"
                aria-hidden="true"
                style={{ color: socialBrandColors.x }}
              />{" "}
              x.com/skasif_ahmed1
            </a>
          </div>
        </div>
        <p className="mt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Sk Asif Ahmed with 🧡
        </p>
      </section>
    </main>
  );
}