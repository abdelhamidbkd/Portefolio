"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useLang } from "../../context/langContext";
import translations from "../../translations";
import { FaBars, FaTimes } from "react-icons/fa";

const navItems = [
  { id: "top", key: "home" },
  { id: "competences", key: "skills" },
  { id: "projets", key: "projects" },
  { id: "contact", key: "contact" },
];

export default function Navbar() {
  const { lang, setLang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const t = translations[lang];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navClasses = `fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 
    ${scrolled
      ? "bg-white shadow-md px-6 py-2 rounded-2xl backdrop-blur-sm"
      : "bg-white/30 backdrop-blur-sm px-8 py-3 rounded-full"}`;

  return (
    <>
      <nav className={navClasses}>
        <div className="flex items-center justify-between w-full">
          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center space-x-8 text-sm md:text-base font-semibold">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="text-black/60 hover:text-black transition duration-200"
                >
                  {t[item.key]}
                </a>
              </li>
            ))}
            <li>
              <button
                onClick={() => setLang(lang === "fr" ? "en" : "fr")}
                className="flex items-center gap-2 px-3 py-1 bg-black/10 text-black rounded-full hover:bg-black/20 transition"
              >
                <Image
                  src={lang === "fr" ? "/w20/us.png" : "/w20/fr.png"}
                  alt={lang === "fr" ? "English flag" : "Drapeau français"}
                  width={20}
                  height={20}
                />
                <span className="text-xs font-semibold">
                  {lang === "fr" ? "EN" : "FR"}
                </span>
              </button>
            </li>
          </ul>

          {/* Mobile Menu Button centré */}
          <div className="md:hidden flex w-full justify-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-black text-2xl"
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu centré */}
      {menuOpen && (
        <div className="md:hidden fixed top-20 left-1/2 -translate-x-1/2 bg-white shadow-lg rounded-xl p-6 z-40 text-center space-y-4 w-[90%] max-w-sm">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setMenuOpen(false)}
              className="block text-black font-medium hover:text-blue-500"
            >
              {t[item.key]}
            </a>
          ))}
          <button
            onClick={() => {
              setLang(lang === "fr" ? "en" : "fr");
              setMenuOpen(false);
            }}
            className="mx-auto flex items-center justify-center gap-2 px-4 py-2 bg-black/10 text-black rounded-full hover:bg-black/20 transition"
          >
            <Image
              src={lang === "fr" ? "/w20/us.png" : "/w20/fr.png"}
              alt={lang === "fr" ? "EN" : "FR"}
              width={20}
              height={20}
            />
            <span className="text-sm font-semibold">{lang === "fr" ? "EN" : "FR"}</span>
          </button>
        </div>
      )}
    </>
  );
}
