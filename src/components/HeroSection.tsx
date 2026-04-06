import { Github, Linkedin, ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img src={heroBg} alt="" className="h-full w-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 cyber-grid opacity-20 z-0" />

      <div className="relative z-10 container mx-auto px-4 pt-20">
        <div className="max-w-3xl animate-slide-up">
          {/* Status badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 mb-8">
            <span className="h-2 w-2 rounded-full bg-terminal-green glow-dot" />
            <span className="font-mono text-xs text-terminal-green">Available for Summer 2026 placements</span>
          </div>

          <h1 className="font-heading text-4xl md:text-6xl font-bold leading-tight mb-4">
            <span className="text-foreground">Panshul</span>{" "}
            <span className="text-primary glow-text">Vempalli</span>
          </h1>

          <p className="font-heading text-lg md:text-xl text-muted-foreground mb-2">
            Aspiring Robotics & Visual Computing Engineer
          </p>

          <p className="text-secondary-foreground/80 max-w-xl leading-relaxed mb-8 text-sm md:text-base">
            Year 10 student at Haberdashers' Boys' School with a focus on autonomous systems.
            Lead Programmer for VEX Robotics and Software Lead for CanSat.
            Building the future of intelligent machines — one PID loop at a time.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-4 mb-12">
            <Button asChild className="gap-2 font-mono text-xs uppercase tracking-wider">
              <a href="#projects">
                View Projects <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button variant="outline" asChild className="gap-2 font-mono text-xs uppercase tracking-wider border-border hover:border-primary hover:text-primary">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" /> GitHub
              </a>
            </Button>
            <Button variant="outline" asChild className="gap-2 font-mono text-xs uppercase tracking-wider border-border hover:border-primary hover:text-primary">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <ChevronDown className="h-6 w-6 text-muted-foreground" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
