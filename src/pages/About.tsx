import { Link } from "react-router-dom";
import { SheetHeader } from "@/components/Layout";
import { Reveal } from "@/components/Reveal";
import { Figure, JourneySketch } from "@/components/Sketches";
import { education, skills, profile } from "@/data/content";

const principles = [
  { t: "Build the real thing", b: "A robot either scores or it doesn't. I like work that gets tested on a field, a track or by real users." },
  { t: "Start with what you have", b: "My dad started with £200. I founded teams with nothing in place: the first mixed VEX team at Habs, and a Greenpower team built to outlast me." },
  { t: "Teach what I learn", b: "I mentor VEX IQ and V5 teams, co-lead the AI & ML Society and coach younger debaters." },
];

const About = () => (
  <>
    <SheetHeader no="02 · About" title={<>About the <em className="text-[var(--red)] not-italic">engineer</em></>} note="hi!">
      A student at {profile.school} in London, working across robotics, electric racing, satellites, software and research. Keen to pursue engineering.
    </SheetHeader>

    <section className="wrap">
      <div className="margin-line grid lg:grid-cols-[1.3fr_1fr] gap-12 lg:gap-16 items-start">
        <Reveal className="space-y-6">
          <p className="serif text-[24px] leading-[1.45]">
            I got into engineering through robotics, and I've kept going because I like the moment something you designed works in front of a judge, a timer or a user.
          </p>
          <div className="body-copy space-y-5">
            <p>
              I pioneered <b className="text-[var(--ink)]">Team 34071B Habs-Gliders</b>, the first mixed VEX team between the Habs boys' and girls' schools. We went all the way to the <b className="text-[var(--ink)]">2026 VEX World Championship</b> and won the Judges Award for design and innovation. My VEX Virtual Robot programme ranked first in the UK across Middle and High School, and 11th in the world for Middle School.
            </p>
            <p>
              I also founded <b className="text-[var(--ink)]">HABS Powerstrike</b>, the school's Greenpower electric racing team, and took it to the 2025 International Finals. Now I'm developing a <b className="text-[var(--ink)]">CanSat</b> with Arm as an industry partner, and I've done engineering project work with QinetiQ and Airobot Dynamics.
            </p>
            <p>
              In software, I'm the founder and lead developer of <b className="text-[var(--ink)]">Quanta</b>, an AI-powered learning platform, and I build live websites for student organisations and engineering teams. With a school Research Scholarship, I'm researching whether AI is redesigning engineering or just making it faster, while shadowing a PhD student at Brunel University.
            </p>
            <p>Outside engineering: piano (ABRSM Grade 8), violin (Grade 5), cricket at the OMT academy and club, and British Parliamentary debating.</p>
          </div>
          <div className="flex flex-wrap gap-3 pt-3">
            <Link to="/cv" className="btn-ink">Read my CV →</Link>
            <Link to="/projects" className="btn-line">See what I've built</Link>
          </div>
        </Reveal>

        <Reveal delay={80} className="space-y-6">
          <div className="title-block [&>div]:border-[var(--ink)] [&>div:not(:last-child)]:border-b">
            <div className="!py-3"><div className="tb-k">Education</div><div className="serif text-[20px] mt-1">{education.school}</div><div className="tb-v text-[var(--ink-3)]">{education.period}</div></div>
            <div className="!py-3"><div className="tb-k">GCSEs in progress</div><div className="text-[13.5px] leading-relaxed text-[var(--ink-2)] mt-1">{education.detail.replace("GCSEs in progress: ", "")}</div></div>
            <div className="!py-3">
              <div className="tb-k">Languages</div>
              <ul className="grid grid-cols-2 gap-2 mt-2">
                {skills.languages.map((l) => (
                  <li key={l.name}><span className="serif text-[17px]">{l.name}</span> <span className="text-[12px] text-[var(--ink-3)]">{l.level}</span></li>
                ))}
              </ul>
            </div>
            <div className="!py-3"><div className="tb-k">Technical</div><div className="flex flex-wrap gap-x-3 gap-y-1.5 mt-2">{skills.technical.map((s) => <span key={s} className="tag">{s}</span>)}</div></div>
            <div className="!py-3"><div className="tb-k">Interests</div><ul className="text-[13.5px] text-[var(--ink-2)] mt-1 space-y-0.5">{skills.interests.map((s) => <li key={s}>{s}</li>)}</ul></div>
          </div>
          <p className="red-pen -rotate-1 ml-2">↑ the spec sheet</p>
        </Reveal>
      </div>
    </section>

    <section className="wrap mt-24" id="roots">
      <div className="margin-line">
        <Reveal className="flex flex-wrap items-baseline gap-4 mb-10 pb-4 border-b-[1.5px] border-[var(--ink)]">
          <h2 className="h-display text-[40px] sm:text-[54px]">Where I come from</h2>
          <span className="red-pen -rotate-2">the first entry in the logbook</span>
        </Reveal>
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-start">
          <Reveal className="space-y-6">
            <p className="serif text-[26px] leading-[1.4]">
              In 2005 my dad moved from Chennai to the UK with <span className="text-[var(--red)]">£200</span>. I'm the first generation of my family to grow up here.
            </p>
            <div className="body-copy space-y-5">
              <p>
                That's the starting condition for everything else on this site. He arrived with almost nothing and built a life from it, which is why I can be at Haberdashers', build robots and spend my evenings on research.
              </p>
              <p>
                It's also where my habit of starting things from scratch comes from. When there was no mixed VEX team at Habs, I started one. When the school had no Greenpower team, I founded HABS Powerstrike. When I couldn't find a decent A-level guide, I built one. I'm used to the idea that you don't wait for the right conditions; you start with what you have and make it work.
              </p>
              <p>
                At home there are two cultures side by side: I speak Telugu with family and English everywhere else. Growing up between them taught me to switch perspectives quickly, which turns out to be useful when you're explaining a robot to judges one minute and debugging it with teammates the next.
              </p>
              <p>
                I don't take any of it for granted. £200 doesn't go far, and every opportunity I've had sits on top of the risk he took.
              </p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <Figure caption="Fig. 0 · Chennai → London, 2005" className="rotate-[0.6deg]"><JourneySketch /></Figure>
          </Reveal>
        </div>
      </div>
    </section>

    <section className="wrap mt-24">
      <div className="margin-line">
        <Reveal><h2 className="h-display text-[40px] sm:text-[54px] mb-10">Working principles</h2></Reveal>
        <div className="grid md:grid-cols-3 gap-6">
          {principles.map((p, i) => (
            <Reveal key={p.t} delay={i * 90} className={`sheet p-7 ${i === 1 ? "md:rotate-[0.8deg]" : "md:-rotate-[0.6deg]"}`} style={{ backgroundImage: "repeating-linear-gradient(transparent 0 31px, rgba(31,79,191,0.13) 31px 32px)", backgroundPosition: "0 52px" }}>
              <span className="red-pen text-[28px]">{i + 1}.</span>
              <h3 className="serif text-[24px] leading-tight mt-2">{p.t}</h3>
              <p className="text-[15px] text-[var(--ink-2)] mt-3 leading-[2.1]">{p.b}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default About;
