import { Terminal } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border py-8">
    <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2 font-heading text-xs text-muted-foreground">
        <Terminal className="h-4 w-4 text-primary" />
        <span>© 2025 Panshul Vempalli. Built from scratch.</span>
      </div>
      <p className="font-mono text-[10px] text-muted-foreground">
        Designed & coded as a living portfolio project.
      </p>
    </div>
  </footer>
);

export default Footer;
