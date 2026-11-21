import type { ReactNode } from "react";
import { Download, Mail, Github, Globe } from "lucide-react";
import { profile, education, research, skills } from "@/data/content";

const H = ({ children }: { children: ReactNode }) => (
  <h2 className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.2em] uppercase text-[#cf3a2b] mt-8 mb-3">
    {children}
    <span className="flex-1 h-px bg-[#e7e2da]" />
  </h2>
);

const Item = ({ title, meta, sub, children }: { title: ReactNode; meta?: string; sub?: string; children?: ReactNode }) => (
  <div className="avoid-break mb-4">
    <div className="flex flex-wrap items-baseline justify-between gap-x-4">
      <h3 className="text-[14.5px] font-semibold text-[#111]">{title}</h3>
      {meta && <span className="text-[12px] text-[#6b6b6b] italic">{meta}</span>}
    </div>
    {sub && <p className="text-[13px] text-[#555]">{sub}</p>}
    {children && <ul className="mt-1.5 space-y-1 list-disc pl-5 marker:text-[#c9c3ba]">{children}</ul>}
  </div>
);

const L = ({ children }: { children: ReactNode }) => <li className="text-[13.5px] leading-[1.55] text-[#2a2a2a]">{children}</li>;

const awards: [string, string][] = [
  ["VEX Robotics World Championship 2026, Judges Award", "for design and innovation (Team 34071B Habs-Gliders, the first mixed team between the boys' and girls' schools)"],
  ["#1 VEX Virtual Robot programme in the UK", "across Middle and High School, ranking 11th globally in Middle School (2026)"],
  ["Research Scholarship Award", "Haberdashers' Boys' School, for my research into AI in engineering"],
  ["High Honors Award, Veritas AI International High School Hackathon", "1,000+ projects from 75+ countries, with a $1,250 scholarship"],
  ["VEX Robotics Regional Judges Award 2025", "for engineering excellence"],
  ["Greenpower International Finals 2025 (F24+ Electric Racing)", "finished 25th internationally, after winning the Portfolio Award at Regionals for engineering documentation"],
  ["CREST Bronze Award", "British Science Association, 2024; and Duke of Edinburgh Bronze Award (2025)"],
];

const CV = () => (
  <div className="pt-12 pb-10 md:pt-16 print:pt-0">
    <div className="no-print wrap max-w-[860px] flex flex-wrap items-center justify-between gap-4 mb-6">
      <div>
        <p className="label">Sheet 07 · Curriculum vitae</p>
        <p className="text-[14px] text-[var(--ink-2)] mt-1">Always up to date. Print or save as PDF for an A4 copy.</p>
      </div>
      <button onClick={() => window.print()} className="btn-ink">
        <Download className="h-4 w-4" /> Download PDF
      </button>
    </div>

    <article className="print-sheet mx-auto max-w-[860px] sheet text-[#111] px-6 py-9 sm:px-12 sm:py-12 mx-4 sm:mx-auto" style={{ fontFamily: "var(--body)" }}>
      <header className="flex flex-wrap items-end justify-between gap-6 pb-6 border-b-2 border-[#111]">
        <div>
          <h1 className="text-[34px] sm:text-[40px] font-semibold tracking-[-0.03em] leading-none" style={{ fontFamily: "var(--serif)" }}>{profile.name}</h1>
          <p className="text-[13.5px] text-[#555] mt-2">Student engineer · Robotics, software and AI research · London</p>
        </div>
        <ul className="text-[12.5px] text-[#333] space-y-1 sm:text-right">
          <li><a href={`mailto:${profile.email}`} className="inline-flex items-center gap-1.5 hover:text-[#cf3a2b]"><Mail className="h-3.5 w-3.5 no-print" />{profile.email}</a></li>
          <li><a href={profile.github} className="inline-flex items-center gap-1.5 hover:text-[#cf3a2b]"><Github className="h-3.5 w-3.5 no-print" />github.com/{profile.githubHandle}</a></li>
          <li><a href={`https://${profile.site}`} className="inline-flex items-center gap-1.5 hover:text-[#cf3a2b]"><Globe className="h-3.5 w-3.5 no-print" />{profile.site}</a></li>
        </ul>
      </header>

      <H>Profile</H>
      <p className="text-[13.5px] leading-[1.65] text-[#2a2a2a]">{profile.summary}</p>

      <H>Education</H>
      <Item title={education.school} meta={education.period}>
        <L>{education.detail}</L>
      </Item>

      <H>Awards & achievements</H>
      <ul className="space-y-1.5 list-disc pl-5 marker:text-[#c9c3ba]">
        {awards.map(([b, r]) => (
          <L key={b}><span className="font-semibold text-[#111]">{b}</span> {r}</L>
        ))}
      </ul>

      <H>Research & academic experience</H>
      <Item title={<>Research project: "{research.question}"</>} sub="Haberdashers' Boys' School" meta="Current">
        <L>Research supported by a school research scholarship, examining whether AI is changing how engineers design or only speeding up existing methods</L>
      </Item>
      <Item title="Shadowing a PhD student" sub="Brunel University" meta="Current">
        <L>Gaining first-hand insight into postgraduate research, alongside my own research project</L>
      </Item>
      <Item title="Engineering Course" sub="Oxford Scholastica Academy" meta="July 2026">
        <L>Two-week course covering mathematical modelling, electronics, computing, aerodynamics, hydraulics and thermodynamics, ending with a 2035 engineering challenge presentation</L>
        <L>Named among the top performers in the cohort; tutor's letter of recommendation praised my teamwork and leadership (available on request)</L>
      </Item>

      <H>Projects</H>
      <Item title="Quanta" sub="AI-powered learning platform · Founder & Lead Developer" meta="2025 – Present">
        <L>Building an international interactive learning platform from scratch, leading software development, design and user experience</L>
      </Item>
      <Item title="VEX Virtual Robot programme" sub="Team 34071B Habs-Gliders" meta="2026">
        <L>Built the top-ranked VEX Virtual Robot programme in the UK across Middle and High School, ranking 11th globally in Middle School</L>
      </Item>
      <Item title="CanSat Project" sub="Working with Arm" meta="2025 – Present">
        <L>Developing a miniature satellite system, with Arm engaged as an industry partner and further outreach ongoing</L>
      </Item>
      <Item title="GitHub & Web Development" sub="github.com/PanshulVempalli">
        <L>660+ followers; portfolio of live projects, including my personal site and websites built for student organisations and engineering teams</L>
      </Item>

      <H>Engineering & industry experience</H>
      <Item title="VEX V5 Robotics" sub="Team 34071B Habs-Gliders" meta="2024 – 2026">
        <L>Pioneered the first mixed VEX team between the boys' and girls' schools</L>
        <L>Designed, built, programmed and tested competition robots; competed regionally, nationally and at VEX Worlds 2026</L>
      </Item>
      <Item title="Greenpower Electric Racing: Founder" sub="HABS Powerstrike" meta="2024 – 2025">
        <L>Founded the school's Greenpower team to build a lasting engineering legacy; finished 25th at the international finals</L>
        <L>Worked on engineering, testing, documentation and race-day operations for an electric racing car in the F24+ series</L>
      </Item>
      <Item title="Industry collaboration">
        <L>Worked with QinetiQ (defence and security technology) and Airobot Dynamics (UK UAV manufacturer) through engineering project work</L>
        <L>Springpod virtual work experience, April 2026: Amazon Robotics Fulfilment Centre; Motorsport Engineering with the University of Huddersfield</L>
      </Item>

      <H>Leadership & extracurricular</H>
      <ul className="space-y-1 list-disc pl-5 marker:text-[#c9c3ba]">
        <L><b>Co-Lead, AI & ML Society</b> at Haberdashers' Boys' School</L>
        <L><b>Committee Member, Engineering Society and Geography Society</b></L>
        <L><b>Charity Society</b> member, helping raise funds for charity</L>
        <L><b>VEX IQ & V5 Robotics Mentor</b>, 2025 – Present: coaching school teams in robot design, programming and competition strategy</L>
        <L><b>British Parliamentary Debating</b>, 2025 – Present: finished in the top 15 at the Birmingham Schools Debating Competition; coach Year 7–9 students in argument and public speaking</L>
      </ul>

      <H>Courses & certifications</H>
      <Item title="FreedomWithAI" sub="AI Education Programme" meta="In progress">
        <L>Building applied knowledge of AI concepts, tools and real-world applications</L>
      </Item>

      <H>Skills & interests</H>
      <div className="space-y-1.5 text-[13.5px] text-[#2a2a2a]">
        <p><b>Technical:</b> Python, C++, JavaScript, HTML & CSS, Git & GitHub, web deployment, AI tools, technical documentation</p>
        <p><b>Languages:</b> {skills.languages.map((l) => `${l.name} (${l.level === "GCSE" ? l.level : l.level.toLowerCase()})`).join(", ")}</p>
        <p><b>Interests:</b> Piano (ABRSM Grade 8), violin (ABRSM Grade 5), cricket (OMT cricket academy and club)</p>
      </div>

      <p className="text-[12px] italic text-[#777] mt-8">References available on request.</p>
    </article>
  </div>
);

export default CV;
