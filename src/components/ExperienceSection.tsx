import { Bot, Trophy, Briefcase } from "lucide-react";

const experiences = [
  {
    icon: <Bot className="h-5 w-5" />,
    category: "Robotics",
    title: "Lead Programmer — VEX Robotics",
    description: "Designing and programming autonomous routines, PID controllers, and sensor integration for competition robots.",
    period: "2024 — Present",
  },
  {
    icon: <Trophy className="h-5 w-5" />,
    category: "Competitions",
    title: "VEX Robotics Regional",
    description: "Competing in regional VEX tournaments with autonomous and driver-controlled challenges.",
    period: "2024 — Present",
  },
  {
    icon: <Briefcase className="h-5 w-5" />,
    category: "Work Experience",
    title: "Seeking Summer 2026 Shadowing Opportunities",
    description: "Targeting placements in Computer Vision labs and robotics research groups at universities including Imperial College London and Brunel University.",
    period: "Target: July 2026",
  },
];

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-24 bg-surface/30">
      <div className="container mx-auto px-4">
        <div className="mb-16">
          <p className="font-mono text-xs uppercase tracking-widest text-primary mb-2">// Experience</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">The Journey</h2>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[19px] top-0 bottom-0 w-px bg-border md:left-1/2 md:-translate-x-px" />

          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <div key={exp.title} className={`relative flex flex-col md:flex-row ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
                {/* Dot */}
                <div className="absolute left-[12px] top-1 z-10 h-4 w-4 rounded-full border-2 border-primary bg-background md:left-1/2 md:-translate-x-1/2" />

                {/* Content */}
                <div className={`ml-12 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                  <div className="rounded-lg border border-border bg-card p-6 transition-all hover:border-primary/30">
                    <div className={`flex items-center gap-2 mb-2 ${i % 2 === 0 ? "md:justify-end" : ""}`}>
                      <span className="text-primary">{exp.icon}</span>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{exp.category}</span>
                    </div>
                    <h3 className="font-heading text-sm font-semibold text-foreground mb-1">{exp.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-2">{exp.description}</p>
                    <p className="font-mono text-[10px] text-primary">{exp.period}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
