import Image from "next/image";

interface TeamMember {
  name: string;
  role: string;
  credentials?: string;
  bio: string;
  image: string;
}

const  TEAM: TeamMember[] = [
  {
    name: "Dr. Elena Marsh",
    role: "Lead Dentist & Founder",
    credentials: "DDS, University of Michigan",
    bio: "15+ years designing smiles with a gentle, detail-obsessed approach to modern dentistry.",
    image: "/team/elena-marsh.png",
  },
  {
    name: "Dr. Marcus Cole",
    role: "Orthodontist",
    credentials: "DMD, Board Certified",
    bio: "Specializes in Invisalign and complex bite correction for patients of every age.",
    image: "/team/marcus-cole.png",
  },
  {
    name: "Priya Anand",
    role: "Dental Hygienist",
    credentials: "RDH",
    bio: "Believes preventive care and patient education are the foundation of a healthy smile.",
    image: "/team/priya-anand.png",
  },
  {
    name: "Sofia Bennett",
    role: "Patient Care Coordinator",
    bio: "Makes sure every visit — from scheduling to check-out — feels effortless and warm.",
    image: "/team/sofia-bennett.png",
  },
];

export default function AboutUs() {
  const lead = TEAM[0];

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-cyan-600">
            About Us
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-clinic-ink sm:text-4xl">
            Dentistry Built Around You
          </h2>
          <p className="mt-4 text-slate-600">
            UI Dentist started with a simple idea: a dental visit should feel
            calm, unhurried, and genuinely cared for. What began as a single treatment
            room has grown into a full studio-style clinic, but the philosophy hasn&apos;t
            changed — every space, every appointment, and every material choice is
            designed around your comfort.
          </p>
          <blockquote className="mt-6 rounded-2xl border-l-4 border-sky-600 bg-sky-50 px-5 py-4 text-clinic-ink">
            <p className="font-medium">
              &ldquo;Our mission is to make world-class dental care feel human —
              precise clinically, warm personally.&rdquo;
            </p>
          </blockquote>
        </div>

        <div className="rounded-2xl bg-slate-50 p-6 sm:p-8">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Lead Clinician
          </h3>
          <div className="mt-4 flex items-center gap-4">
            <Image
              src={lead.image}
              alt={lead.name}
              width={80}
              height={80}
              className="h-20 w-20 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold text-clinic-ink">{lead.name}</p>
              <p className="text-sm text-slate-600">{lead.credentials}</p>
            </div>
          </div>
          <ul className="mt-6 space-y-2 text-sm text-slate-600">
            <li className="flex gap-2">
              <span className="text-sky-600">•</span> American Dental Association,
              Active Member
            </li>
            <li className="flex gap-2">
              <span className="text-sky-600">•</span> Certified in Advanced Cosmetic
              Dentistry
            </li>
            <li className="flex gap-2">
              <span className="text-sky-600">•</span> 15+ years of clinical experience
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-16">
        <h3 className="text-center text-2xl font-semibold tracking-tight text-clinic-ink">
          Meet the Team
        </h3>
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((member) => (
            <div key={member.name} className="text-center">
              <Image
                src={member.image}
                alt={member.name}
                width={112}
                height={112}
                className="mx-auto h-28 w-28 rounded-full object-cover"
              />
              <p className="mt-4 font-semibold text-clinic-ink">{member.name}</p>
              <p className="text-sm text-sky-600">{member.role}</p>
              <p className="mt-2 text-sm text-slate-600">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
