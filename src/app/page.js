"use client";
import Image from "next/image";
import Navbar from "./components/Navbar";
import { useState, useEffect, useRef } from "react";
import translations from "../translations";
import { useLang } from "../context/langContext";


const competences = [
  { nom: "JavaScript", img: "/javascripticon.svg" },
  { nom: "TypeScript", img: "/Typescript_logo_2020.svg.png" },
  { nom: "Java", img: "/Java_Logo.svg.png" },
  { nom: "PHP", img: "/phpicon.svg" },
  { nom: "C#", img: "/images.jpg" },
  { nom: "React", img: "/reacticon.svg" },
  { nom: "Angular", img: "/Angular_full_color_logo.svg.png" },
  { nom: "Vue.js", img: "/vueicon.svg" },
  { nom: "Node.js", img: "/nodejs-icon.svg" },
  { nom: "Spring Boot", img: "/Spring_Boot.svg.png" },
  { nom: "Laravel", img: "/laravelicon.svg" },
  { nom: "Symfony", img: "/symfonyicon.svg" },
  { nom: "MySQL", img: "/mysql-icon.svg" },
  { nom: "Firebase", img: "/firebase-icon.svg" },
  { nom: "Docker", img: "/docker-icon.svg" },
  { nom: "Git", img: "/git-scm-icon.svg" },
  { nom: "Ionic", img: "/ionicframework-icon.svg" },
  { nom: "React Native", img: "/VectorWiki-F79rZ__react-native.svg" },
];


export default function Home() {
  const [activeIndex, setActiveIndex] = useState(2);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef(null);
  const { lang } = useLang();
  const t = translations[lang];
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });



  useEffect(() => {
    if (!isHovered) {
      intervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % projets.length);
      }, 4000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isHovered]);

  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast({ show: false, message: "", type: "" });
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [toast]);


  const projets = t.projectList.map((proj, index) => ({
    ...proj,
    technos:
      index === 0
        ? [
          "Spring_Boot.svg.png",
          "Java_Logo.svg.png",
          "Angular_full_color_logo.svg.png",
          "Typescript_logo_2020.svg.png",
          "mysql-icon.svg",
          "firebase-icon.svg",
          "ionicframework-icon.svg",
        ]
        : index === 1
          ? ["vueicon.svg", "javascripticon.svg"]
          : ["images.jpg", "reacticon.svg", "javascripticon.svg", "mysql-icon.svg"],
  }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value.trim();
    const email = e.target.email.value.trim();
    const message = e.target.message.value.trim();

    if (!name || !email || !message) {
      setToast({ show: true, message: "Tous les champs sont requis", type: "error" });
      return;
    }

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    });

    if (res.ok) {
      setToast({ show: true, message: "Message envoyé", type: "success" });
      e.target.reset();
    } else {
      setToast({ show: true, message: "Erreur lors de l’envoi", type: "error" });
    }
  };

  return (
    <>
      <Navbar />
      <div id="top" className="min-h-screen bg-white dark:bg-gray-900">

        {/* Compétences Section */}
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
              href="/BENKADA_CV_ALTERNANCE.pdf"
              download="BENKADA_CV_ALTERNANCE.pdf"
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



        {/* Projets Section */}
        <section id="projets" className="min-h-screen bg-gradient-to-r from-[#f7d7f7] to-[#c9e4ff] text-white flex flex-col items-center justify-center px-4 py-10">
          <h2 className="text-4xl text-gray-900 font-bold mb-10">{t.projects}</h2>
          <div className="w-full overflow-x-scroll scroll-smooth snap-x snap-mandatory flex gap-6 px-4 py-4">
  {projets.map((projet, index) => (
    <div
      key={index}
      className="flex-shrink-0 w-[85%] sm:w-[500px] md:w-[600px] lg:w-[700px] snap-center bg-[#1a2036] p-6 md:p-10 rounded-2xl shadow-2xl border border-[#232a47] text-white"
    >
      <h3 className="text-xl md:text-2xl font-bold mb-4">{projet.titre}</h3>
      <p className="text-sm">{projet.description}</p>
      <span className="mt-6 font-semibold text-white text-md md:text-lg">{t.tech}</span>
      <div className="flex flex-wrap gap-4 mt-2">
        {projet.technos.map((tech, i) => (
          <div key={i} className="w-8 h-8 relative">
            <Image src={`/${tech}`} alt={`Logo ${tech}`} fill className="object-contain" />
          </div>
        ))}
      </div>
    </div>
  ))}
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
              <form onSubmit={handleSubmit} className="w-full lg:w-1/2 bg-white/70 dark:bg-gray-900/40 backdrop-blur-md rounded-xl shadow-xl p-8 space-y-6 border border-white/30">
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
              {toast.show && (
                <div
                  className={`fixed top-8 right-8 z-50 flex items-center gap-4 px-8 py-6 
      border shadow-2xl rounded-2xl w-[480px] max-w-full transition-all duration-500 
      ${toast.type === "success"
                      ? "bg-green-50 border-green-400 text-green-800 animate-fade-slide-in"
                      : "bg-red-50 border-red-400 text-red-800 animate-fade-slide-in"
                    }`}
                >
                  {toast.type === "success" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-red-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                  <span className="text-lg font-medium">{toast.message}</span>
                </div>
              )}





            </div>
          </div>
        </section>




      </div>
    </>
  );
}

