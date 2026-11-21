import { Link } from "react-router-dom";
import { ArrowRight, GraduationCap, Languages, Music, Code2 } from "lucide-react";
import { PageHeader } from "@/components/Layout";
import { Reveal } from "@/components/Reveal";
import { education, skills, profile } from "@/data/content";

const principles = [
  { t: "Build the real thing", b: "A robot either scores or it doesn't. I like work that gets tested on a field, a track or by real users." },
  { t: "Leave something behind", b: "I founded teams so that they'd outlast me: the first mixed VEX team at Habs, and a Greenpower team built to last." },
  { t: "Teach what I learn", b: "I mentor VEX IQ and V5 teams, co-lead the AI & ML Society and coach younger debaters." },
];

const About = () => (
  <>
    <PageHeader eyebrow="About me" title="Engineer first," accent="in every medium.">
      I'm a student at {profile.school} in London. I work across robotics, electric racing, satellites, software and research, and I'm keen to pursue engineering.
    </PageHeader>

    <section className="wrap grid lg:grid-cols-[1.25fr_1fr] gap-12 lg:gap-20">
      <Reveal className="space-y-6 text-[17px] leading-[1.8] text-white/75">
        <p>
          I got into engineering through robotics. I pioneered <span className="text-white">Team 34071B Habs-Gliders</span>, the first mixed VEX team between the Habs boys' and girls' schools, and over two seasons we went from first builds to the <span className="text-white">2026 VEX World Championship</span>, where we won the Judges Award for design and innovation. My VEX Virtual Robot programme ranked first in the UK across Middle and High School, and 11th in the world for Middle School.
        </p>
        <p>
          I also founded <span className="text-white">HABS Powerstrike</span>, the school's Greenpower electric racing team, and took it to the 2025 International Finals. Now I'm developing a <span className="text-white">CanSat</span> with Arm as an industry partner, and I've done engineering project work with QinetiQ and Airobot Dynamics.
        </p>
        <p>
          On the software side, I'm the founder and lead developer of <span className="text-white">Quanta</span>, an AI-powered learning platform, and I build live websites for student organisations and engineering teams. With a school Research Scholarship, I'm researching whether AI is redesigning engineering or just making it faster, while shadowing a PhD student at Brunel University.
        </p>
        <p>
          Outside engineering, I play piano (ABRSM Grade 8) and violin (Grade 5), play cricket at the OMT academy and club, and debate in the British Parliamentary format.
        </p>
        <div className="pt-4 flex flex-wrap gap-3">
          <Link to="/cv" className="btn btn-primary">Read my CV <ArrowRight className="h-4 w-4" /></Link>
          <Link to="/projects" className="btn btn-ghost">See what I've built</Link>
        </div>
      </Reveal>

      <div className="space-y-4">
        <Reveal delay={80} className="card p-6">
          <div className="flex items-center gap-3 mb-4 text-white/60"><GraduationCap className="h-4 w-4" /><span className="eyebrow">Education</span></div>
          <h3 className="text-[17px] font-semibold">{education.school}</h3>
          <p className="font-mono text-[11.5px] text-white/40 mt-1">{education.period}</p>
          <p className="text-[14px] text-white/60 mt-3 leading-relaxed">{education.detail}</p>
        </Reveal>
        <Reveal delay={140} className="card p-6">
          <div className="flex items-center gap-3 mb-4 text-white/60"><Code2 className="h-4 w-4" /><span className="eyebrow">Technical</span></div>
          <div className="flex flex-wrap gap-2">{skills.technical.map((s) => <span key={s} className="chip">{s}</span>)}</div>
        </Reveal>
        <Reveal delay={200} className="card p-6">
          <div className="flex items-center gap-3 mb-4 text-white/60"><Languages className="h-4 w-4" /><span className="eyebrow">Languages</span></div>
          <ul className="grid grid-cols-2 gap-3">
            {skills.languages.map((l) => (
              <li key={l.name}>
                <div className="text-[15px]">{l.name}</div>
                <div className="text-[12.5px] text-white/45">{l.level}</div>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={260} className="card p-6">
          <div className="flex items-center gap-3 mb-4 text-white/60"><Music className="h-4 w-4" /><span className="eyebrow">Interests</span></div>
          <ul className="space-y-1.5 text-[14.5px] text-white/75">{skills.interests.map((s) => <li key={s}>{s}</li>)}</ul>
        </Reveal>
      </div>
    </section>

    <section className="wrap mt-28">
      <Reveal>
        <p className="eyebrow mb-5">How I work</p>
        <h2 className="display text-[36px] sm:text-[52px] mb-12"><span className="dim-text">Three things I </span><span className="grad-text">care about.</span></h2>
      </Reveal>
      <div className="grid md:grid-cols-3 gap-4">
        {principles.map((p, i) => (
          <Reveal key={p.t} delay={i * 90} className="card p-7">
            <span className="num">0{i + 1}</span>
            <h3 className="text-[20px] font-semibold tracking-tight mt-6">{p.t}</h3>
            <p className="text-[14.5px] text-white/55 mt-3 leading-relaxed">{p.b}</p>
          </Reveal>
        ))}
      </div>
    </section>
  </>
);

export default About;
