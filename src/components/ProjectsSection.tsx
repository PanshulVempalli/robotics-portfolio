import { ExternalLink, Github, Cpu, Satellite, Code2, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Project {
  title: string;
  problem: string;
  stack: string[];
  status: "complete" | "wip";
  icon: React.ReactNode;
  result?: string;
}

const projects: Project[] = [
  {
    title: "VEX Robotics — PID Controller",
    problem: "Designing a PID controller for consistent 180° turns and autonomous routines using V5 sensors.",
    stack: ["C++", "V5 Brain", "PID", "Sensor Fusion"],
    status: "complete",
    icon: <Cpu className="h-5 w-5" />,
    result: "Achieved ±2° accuracy on autonomous turns at regional competition.",
  },
  {
    title: "CanSat — Atmospheric Data Relay",
    problem: "Building a satellite the size of a soda can to collect and transmit atmospheric data during descent.",
    stack: ["Python", "Arduino", "Telemetry", "Data Logging"],
    status: "wip",
    icon: <Satellite className="h-5 w-5" />,
  },
  {
    title: "C++ Deep Dive — Data Structures",
    problem: "Teaching myself advanced C++ through implementing data structures and algorithms from scratch.",
    stack: ["C++", "STL", "Memory Management"],
    status: "wip",
    icon: <Code2 className="h-5 w-5" />,
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="mb-16 animate-fade-in">
          <p className="font-mono text-xs uppercase tracking-widest text-primary mb-2">// Projects</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
            The Evidence
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.title}
              className="group rounded-lg border border-border bg-card p-6 transition-all duration-300 hover:border-primary/50 hover:glow-border"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-md bg-surface p-2 text-primary">{project.icon}</div>
                  <Badge
                    variant={project.status === "wip" ? "outline" : "default"}
                    className={
                      project.status === "wip"
                        ? "border-cyber-amber text-cyber-amber font-mono text-[10px]"
                        : "bg-terminal-green/20 text-terminal-green border-terminal-green/30 font-mono text-[10px]"
                    }
                  >
                    {project.status === "wip" ? "In Progress" : "Complete"}
                  </Badge>
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
              </div>

              <h3 className="font-heading text-base font-semibold text-foreground mb-2">{project.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{project.problem}</p>

              {project.result && (
                <p className="text-xs text-terminal-green mb-4 font-mono">→ {project.result}</p>
              )}

              {/* Stack */}
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-sm bg-surface px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
