import { Mail, Github, Linkedin, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 bg-surface/30">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-12">
          <p className="font-mono text-xs uppercase tracking-widest text-primary mb-2">// Contact</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">Get In Touch</h2>
          <p className="text-muted-foreground max-w-md mx-auto text-sm">
            Open to conversations with university PIs, industry professionals, and fellow robotics enthusiasts.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild className="gap-2 font-mono text-xs uppercase tracking-wider">
            <a href="mailto:panshul@example.com">
              <Mail className="h-4 w-4" /> Email Me
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

        {/* Current Goal widget */}
        <div className="mt-16 inline-block rounded-lg border border-primary/30 bg-card p-6 text-left max-w-md glow-border">
          <p className="font-mono text-[10px] uppercase tracking-widest text-primary mb-2">Current Goal</p>
          <p className="text-sm text-foreground leading-relaxed">
            Securing a 3-day shadowing placement in a Computer Vision lab for July 2026.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
