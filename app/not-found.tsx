"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function NotFound() {
  return (
    <main
      className="relative min-h-screen flex flex-col items-center justify-center text-white overflow-hidden"
      style={{
        background:
          "linear-gradient(165deg, #03050a 0%, #020208 48%, #010101 100%)",
      }}
    >
      {/* Ambient glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 700,
          height: 700,
          borderRadius: "50%",
          background:
            "radial-gradient(circle at center, rgba(249,115,22,0.07) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          filter: "blur(2px)",
        }}
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative flex flex-col items-center text-center px-6"
      >
        {/* 404 */}
        <motion.p
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-black italic uppercase tracking-tighter leading-none select-none"
          style={{ fontSize: "clamp(120px, 22vw, 220px)", color: "rgba(255,255,255,0.04)" }}
        >
          404
        </motion.p>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6 -mt-6"
          style={{ borderColor: "rgba(249,115,22,0.35)", background: "rgba(249,115,22,0.08)" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
          <span className="text-[9px] uppercase tracking-[0.5em] text-orange-500 font-black">
            Signal Lost
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter text-white mb-4"
        >
          Page not found.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-sm text-white/35 max-w-xs leading-relaxed mb-10"
        >
          The route you&apos;re chasing doesn&apos;t exist. Head back and keep moving.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap gap-3 justify-center"
        >
          <Link
            href="/"
            className="group relative overflow-hidden flex items-center gap-2.5 px-8 py-3.5 rounded-full font-black uppercase text-[10px] tracking-[0.4em] text-black transition-all duration-200"
            style={{ background: "linear-gradient(135deg, #f97316, #ea580c)" }}
          >
            <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-[0.12] transition-opacity duration-300 rounded-full" />
            Back to home
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>

          <Link
            href="/#modules-section"
            className="group flex items-center gap-2 px-8 py-3.5 rounded-full border font-black uppercase text-[10px] tracking-[0.4em] text-white/55 transition-all duration-200 hover:border-white/40 hover:text-white/90"
            style={{ borderColor: "rgba(255,255,255,0.18)" }}
          >
            <span className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-[0.04] transition-opacity" />
            Gear Up
          </Link>
        </motion.div>
      </motion.div>

      {/* Bottom tagline */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="absolute bottom-8 text-[9px] uppercase tracking-[0.5em] text-white/15 font-black"
      >
        Vision Run · AR Running
      </motion.p>
    </main>
  );
}
