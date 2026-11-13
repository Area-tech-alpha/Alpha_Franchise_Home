import Image from "next/image";
import { hasPublicFile } from "@/lib/assets";
import { content } from "@/lib/content";

const { lideranca } = content;

export default function Lideranca() {
  const people = lideranca.people.filter((p) => hasPublicFile(p.photo));
  if (people.length === 0) return null;

  return (
    <section id="equipe" aria-labelledby="equipe-titulo" className="relative py-[70px]">
      <div className="container-wide">
        <div className="section-head reveal">
          <span className="eyebrow">{lideranca.eyebrow}</span>
          <h2 id="equipe-titulo">{lideranca.title}</h2>
        </div>
        <ul className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
          {people.map((person) => (
            <li
              key={person.name}
              className="reveal group relative aspect-[4/5] overflow-hidden rounded-[22px] transition-transform duration-400 hover:-translate-y-1.5"
            >
              <Image
                src={person.photo}
                alt={`${person.name}, ${person.role}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover object-[center_20%] grayscale-[.55] transition-[filter,transform] duration-500 group-hover:scale-105 group-hover:grayscale-0"
              />
              <div
                className="absolute inset-0"
                aria-hidden="true"
                style={{
                  background: "linear-gradient(0deg, rgba(0,0,0,.92) 6%, rgba(0,0,0,.15) 55%, transparent 75%)",
                }}
              />
              <div className="absolute right-0 bottom-0 left-0 z-[1] p-5">
                <p className="text-[15.5px] font-semibold text-white">{person.name}</p>
                <p className="mt-1 text-[11.5px] font-semibold tracking-[.06em] text-gold-1 uppercase">
                  {person.role}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
