import { Code2, Wrench, Brain } from "lucide-react";

const skillCategories = [
  {
    icon: <Code2 className="h-5 w-5" />,
    title: "Languages",
    skills: [
      { name: "C++", level: "Intermediate" },
      { name: "Python", level: "Proficient" },
      { name: "HTML/CSS", level: "Proficient" },
    ],
  },
  {
    icon: <Wrench className="h-5 w-5" />,
    title: "Tools",
    skills: [
      { name: "Git / GitHub", level: "" },
      { name: "VS Code", level: "" },
      { name: "VEX V5 Brain", level: "" },
      { name: "Arduino IDE", level: "" },
    ],
  },
  {
    icon: <Brain className="h-5 w-5" />,
    title: "Concepts",
    skills: [
      { name: "PID Control Loops", level: "" },
      { name: "Sensor Fusion", level: "" },
      { name: "Computer Vision", level: "Learning" },
      { name: "Data Structures", level: "Learning" },
    ],
  },
];

const techMarquee = ["C++", "Python", "PID", "Sensor Fusion", "Git", "Arduino", "V5 Brain", "Computer Vision", "Data Structures", "Telemetry"];

const SkillsSection = () => {
  return (
    <section id="skills" className="py-24">
      <div className="container mx-auto px-4">
        <div className="mb-16">
          <p className="font-mono text-xs uppercase tracking-widest text-primary mb-2">// Skills</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">The Toolbox</h2>
        </div>

        {/* Marquee */}
        <div className="relative overflow-hidden mb-16 border-y border-border py-4">
          <div className="flex marquee whitespace-nowrap">
            {[...techMarquee, ...techMarquee].map((tech, i) => (
              <span key={i} className="mx-6 font-mono text-sm text-muted-foreground">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {skillCategories.map((cat) => (
            <div key={cat.title} className="rounded-lg border border-border bg-card p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="rounded-md bg-surface p-2 text-primary">{cat.icon}</div>
                <h3 className="font-heading text-sm font-semibold text-foreground">{cat.title}</h3>
              </div>

              <div className="space-y-3">
                {cat.skills.map((skill) => (
                  <div key={skill.name} className="flex items-center justify-between">
                    <span className="text-sm text-foreground">{skill.name}</span>
                    {skill.level && (
                      <span className={`font-mono text-[10px] px-2 py-0.5 rounded-sm ${
                        skill.level === "Learning"
                          ? "bg-cyber-amber/10 text-cyber-amber"
                          : skill.level === "Proficient"
                            ? "bg-terminal-green/10 text-terminal-green"
                            : "bg-primary/10 text-primary"
                      }`}>
                        {skill.level}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
