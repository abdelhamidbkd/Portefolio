"use client";
import Image from "next/image";
import Navbar from "./components/Navbar";
import { useState, useEffect, useRef } from "react";
import translations from "../translations";
import { useLang } from "../context/langContext";


const competences = [
  { nom: "JavaScript", img: "/javascripticon.svg" },
  { nom: "TypeScript", img: "/Typescript_logo_2020.svg.png" },
  { nom: "Java", img: "/java_logo.svg.png" },
  { nom: "PHP", img: "/phpicon.svg" },
  { nom: "C#", img: "/images.jpg" },
  { nom: "Spring Boot", img: "/Spring_Boot.svg.png" },
  { nom: "Laravel", img: "/laravelicon.svg" },
  { nom: "Symfony", img: "/symfonyicon.svg" },
  { nom: "React", img: "/reacticon.svg" },
  { nom: "Angular", img: "/Angular_full_color_logo.svg.png" },
  { nom: "Vue.js", img: "/vueicon.svg" },
];

const projets = [
  {
    titre: "Goldrush",
    description: "Goldrush est un serveur de jeu Minecraft...",
    technos: ["/laravelicon.svg", "/vueicon.svg"]
  },
  {
    titre: "API Spring Boot",
    description: "API RESTful sécurisée avec Spring Boot.",
    technos: ["/Spring_Boot.svg.png", "/java_logo.svg.png"]
  },
  {
    titre: "Application Laravel",
    description: "Application web complète avec Laravel.",
    technos: ["/laravelicon.svg", "/phpicon.svg"]
  },
  {
    titre: "Dashboard React",
    description: "Dashboard interactif avec React et Chart.js.",
    technos: ["/reacticon.svg", "/javascripticon.svg"]
  },
  {
    titre: "Site Vitrine Vue.js",
    description: "Site vitrine responsive avec Vue.js.",
    technos: ["/vueicon.svg", "/javascripticon.svg"]
  },
];

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(2);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef(null);
  const { lang } = useLang();
  const t = translations[lang];


  useEffect(() => {
    if (!isHovered) {
      intervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % projets.length);
      }, 4000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isHovered]);

  return (
    <>
      <Navbar />
      <div id="top" className="min-h-screen bg-white dark:bg-gray-900">
      <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-[#f7d7f7] to-[#c9e4ff] text-gray-900 text-center px-4 scroll-mt-20">
  <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-lg mb-6">
    <Image
      src="/photo.jpeg"
      alt="Abdelhamid Benkada"
      width={160}
      height={160}
      className="object-cover w-full h-full"
    />
  </div>
  <h1 className="text-4xl md:text-6xl font-bold mb-4">{t.welcome}</h1>
  <p className="text-xl md:text-2xl font-semibold mb-4">{t.role}</p>
  <p className="max-w-xl text-lg md:text-xl mb-8">{t.about}</p>
  <div className="flex flex-col sm:flex-row gap-4">
    <a
      href="/cv-abdelhamid.pdf"
      download
      className="px-6 py-3 bg-white text-black border border-white rounded-full font-semibold transition hover:bg-transparent hover:text-black"
    >
      {t.downloadCV}
    </a>
    <a
      href="#contact"
      className="px-6 py-3 bg-white text-black border border-white rounded-full font-semibold transition hover:bg-transparent hover:text-black"
    >
      {t.contact}
    </a>
  </div>
</section>



        {/* Compétences Section */}
        <section id="competences" className="py-20 bg-gray-100 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
              {t.skills}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 justify-items-center">
              {competences.map((comp) => (
                <div
                  key={comp.nom}
                  className="group bg-white dark:bg-gray-700 rounded-xl shadow-md p-6 flex flex-col items-center w-full max-w-[150px] transition-all transform duration-300 hover:scale-105 hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="relative w-16 h-16 mb-4">
                    <Image
                      src={comp.img}
                      alt={comp.nom}
                      fill
                      className="object-contain transition-transform duration-500 group-hover:rotate-[360deg]"
                    />
                  </div>
                  <span className="text-base font-semibold text-gray-800 dark:text-white text-center">
                    {comp.nom}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>



        {/* Projets Section (carrousel custom) */}
        <section id="projets" className="min-h-screen bg-gradient-to-r from-[#f7d7f7] to-[#c9e4ff] text-white flex flex-col items-center justify-center px-4">
          <h2 className="text-4xl text-gray-900 font-bold mb-10">{t.projects}</h2>

          <div className="relative w-full max-w-6xl h-[450px] flex items-center justify-center overflow-hidden">
            {projets.map((projet, index) => {
              const offset = index - activeIndex;
              const isActive = offset === 0;
              const isHidden = Math.abs(offset) > 2;

              return (
                <div
                  key={index}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className={`
    absolute transition-all duration-500 ease-in-out
    ${isHidden ? "opacity-0 scale-75 z-0" : ""}
    ${isActive ? "scale-100 z-20" : "scale-90 z-10"}
    ${offset === -1 ? "-translate-x-[60%]" : ""}
    ${offset === 1 ? "translate-x-[60%]" : ""}
    ${offset <= -2 ? "-translate-x-[100%]" : ""}
    ${offset >= 2 ? "translate-x-[100%]" : ""}
    hover:scale-105 hover:shadow-2xl
  `}
                  style={{
                    width: isActive ? "700px" : "500px", // ← largeur augmentée
                    height: "80%", // ← prend toute la hauteur de son conteneur
                    maxHeight: "100%", // ← limite haute facultative
                  }}
                >
                  <div className="bg-[#1a2036] h-full w-full p-10 rounded-2xl shadow-2xl border border-[#232a47] flex flex-col justify-between">
                    <h3 className="text-2xl font-bold mb-4">{projet.titre}</h3>
                    <p className="text-sm">{projet.description}</p>
                    <span className="mt-6 font-semibold text-white text-lg">Technologies utilisées</span>
                    <div className="flex gap-4 mt-2">
                      {projet.technos.map((tech, i) => (
                        <div key={i} className="w-8 h-8 relative">
                          <Image src={tech} alt="tech logo" fill className="object-contain" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}

            <button
              onClick={() => setActiveIndex((prev) => Math.max(prev - 1, 0))}
              className="absolute left-4 top-1/2 -translate-y-1/2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full z-30"
            >
              ◀
            </button>
            <button
              onClick={() => setActiveIndex((prev) => Math.min(prev + 1, projets.length - 1))}
              className="absolute right-4 top-1/2 -translate-y-1/2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full z-30"
            >
              ▶
            </button>
          </div>
        </section>


        {/* Contact Section */}
        <section
  id="contact"
  className="relative min-h-screen flex items-center bg-gradient-to-r from-[#f7d7f7] to-[#c9e4ff]"
>
  {/* Overlay pour assombrir légèrement le fond */}
  <div className="absolute inset-0 bg-black/10 z-0" />

  {/* Contenu de la section */}
  <div className="relative z-10 container mx-auto px-4">
    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
      {t.contact}
    </h2>

    <div className="flex flex-col lg:flex-row justify-center items-start gap-10">
      {/* Bloc de code animé */}
      <div className="bg-[#1a2036] text-green-400 font-mono p-6 rounded-xl shadow-xl w-full lg:w-1/2 h-full min-h-[500px] flex items-center relative overflow-hidden">
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="w-3 h-3 bg-red-400 rounded-full"></span>
          <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
          <span className="w-3 h-3 bg-green-400 rounded-full"></span>
        </div>
        <code className="whitespace-pre-wrap text-base leading-relaxed mt-6">
{`// 🚀 Spreading Stardust...
import { useState } from "react"

const [sender, setSender] = useState("👨‍💻")
const [to, setTo] = useState("🌍")
const [subject, setSubject] = useState("✨")
const [message, setMessage] = useState("Hi there!")

sendEmail({ from: sender, to, subject, message })`}
        </code>
      </div>

      {/* Formulaire stylisé */}
      <form className="w-full lg:w-1/2 bg-white/70 dark:bg-gray-900/40 backdrop-blur-md rounded-xl shadow-xl p-8 space-y-6 border border-white/30">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
            {t.name}
          </label>
          <input
            type="text"
            id="name"
            className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="exemple@mail.com"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
            Message
          </label>
          <textarea
            id="message"
            rows="4"
            className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Votre message..."
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-md hover:brightness-110 transition"
        >
          {t.send}
        </button>
      </form>
    </div>
  </div>
</section>




      </div>
    </>
  );
}
