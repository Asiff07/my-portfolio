import { Code2, Server, Boxes, Cloud, GitBranch, Network } from "lucide-react"

const section = (title: string, Icon: any, items: string[]) => (
  <div className="card-tint rounded-xl border border-border/60 p-4">
    <div className="mb-3 flex items-center gap-2">
      <Icon className="h-5 w-5 text-muted-foreground" aria-hidden />
      <h3 className="text-base font-medium text-foreground">{title}</h3>
    </div>
    <ul className="flex flex-wrap gap-2">
      {items.map((s) => (
        <li
          key={s}
          className="rounded-md border border-border/60 bg-muted/15 px-2.5 py-1.5 text-xs text-muted-foreground"
        >
          {s}
        </li>
      ))}
    </ul>
  </div>
)

export default function SkillsGrid() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-4 py-12">
      <header className="mb-6">
        <h2 className="text-balance text-2xl font-semibold text-foreground md:text-3xl">Skills</h2>
        <p className="text-muted-foreground">Technologies and tools I use.</p>
      </header>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {section("Frontend", Code2, [
          "HTML",
          "CSS",
          "JavaScript",
          "React.js",
          "Next.js",
          "Redux",
          "Tailwind CSS",
          "Material UI",
          "Hero UI",
          "ShadCN",
          "Bootstrap",
        ])}
        {section("Backend", Server, ["Node.js", "Express.js", "MongoDB", "SQL", "PostgreSQL"])}
        {section("DevOps & Deployment", Boxes, [
          "Docker",
          "Kubernetes",
          "CI/CD",
          "GitHub Actions",
          "Jenkins",
          "Blue/Green Deployments",
        ])}
        {section("Cloud & Hosting", Cloud, ["AWS EC2", "Vercel", "Render", "Netlify", "Heroku"])}
        {section("Version Control", GitBranch, ["Git", "GitHub"])}
        {section("Concepts", Network, ["TCP/UDP", "OSI Model", "Performance Optimization", "Deployment Strategies"])}
      </div>
    </section>
  )
}
