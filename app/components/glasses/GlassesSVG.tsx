'use client';

import React from 'react';

export function GlassesSVG({
  accent,
  modeId,
  frameStroke = 'rgba(200,200,200,0.38)',
  lensOpacity = 1,
  hud = 'minimal',
  className = '',
}: {
  accent: string;
  modeId: string;
  frameStroke?: string;
  lensOpacity?: number;
  hud?: 'minimal' | 'sport' | 'tech';
  className?: string;
}) {
  const lg = `lg-${modeId}`;
  const rg = `rg-${modeId}`;
  const sh = `sh-${modeId}`;
  const lo = lensOpacity;
  const lensL =
    'M 8,14 C 6,14 4,28 4,42 C 4,64 9,84 38,89 C 68,94 124,93 146,82 C 157,75 158,58 157,44 C 156,28 150,12 140,12 L 20,12 Z';
  const lensR =
    'M 312,14 C 314,14 316,28 316,42 C 316,64 311,84 282,89 C 252,94 196,93 174,82 C 163,75 162,58 163,44 C 164,28 170,12 180,12 L 300,12 Z';
  return (
    <svg
      className={className}
      width="100%"
      viewBox="-10 0 340 105"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: 'visible' }}
      aria-hidden
    >
      <defs>
        <linearGradient id={lg} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity={0.65 * lo} />
          <stop offset="55%" stopColor={accent} stopOpacity={0.38 * lo} />
          <stop offset="100%" stopColor={accent} stopOpacity={0.1 * lo} />
        </linearGradient>
        <linearGradient id={rg} x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity={0.65 * lo} />
          <stop offset="55%" stopColor={accent} stopOpacity={0.38 * lo} />
          <stop offset="100%" stopColor={accent} stopOpacity={0.1 * lo} />
        </linearGradient>
        <linearGradient id={sh} x1="0.08" y1="0" x2="0.75" y2="0.7" gradientUnits="objectBoundingBox">
          <stop offset="0%" stopColor="white" stopOpacity={0.55 * lo} />
          <stop offset="55%" stopColor="white" stopOpacity={0.08 * lo} />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect x="8" y="9" width="304" height="3.5" rx="1.75" fill={frameStroke} opacity="0.9" />
      <path d={lensL} fill={`url(#${lg})`} />
      <path d={lensL} fill={`url(#${sh})`} />
      <path d={lensL} stroke={accent} strokeWidth="1.5" strokeOpacity={0.8 * lo} fill="none" />
      <path
        d="M 22,20 Q 74,13 142,19"
        stroke="white"
        strokeOpacity={0.5 * lo}
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
      />
      <path d={lensR} fill={`url(#${rg})`} />
      <path d={lensR} fill={`url(#${sh})`} />
      <path d={lensR} stroke={accent} strokeWidth="1.5" strokeOpacity={0.8 * lo} fill="none" />
      <path
        d="M 298,20 Q 246,13 178,19"
        stroke="white"
        strokeOpacity={0.5 * lo}
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M 157,46 Q 157,36 160,33 Q 163,36 163,46"
        stroke={frameStroke}
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M 6,58 L -8,68 L -8,78"
        stroke={frameStroke}
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 314,58 L 328,68 L 328,78"
        stroke={frameStroke}
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {hud === 'sport' && (
        <>
          <line x1="30" y1="51" x2="148" y2="51" stroke="white" strokeOpacity="0.18" strokeWidth="0.8" strokeDasharray="3 4" />
          <line x1="172" y1="51" x2="310" y2="51" stroke="white" strokeOpacity="0.18" strokeWidth="0.8" strokeDasharray="3 4" />
          <circle cx="83" cy="51" r="2.5" fill="none" stroke={accent} strokeWidth="1" strokeOpacity="0.55" />
          <circle cx="237" cy="51" r="2.5" fill="none" stroke={accent} strokeWidth="1" strokeOpacity="0.55" />
        </>
      )}
      {hud === 'tech' && (
        <g>
          {[30, 50, 70, 90, 110, 130].map((x) => (
            <line key={`vl${x}`} x1={x} y1="20" x2={x} y2="85" stroke="white" strokeOpacity="0.06" strokeWidth="0.6" />
          ))}
          {[30, 50, 70, 90, 110, 130].map((x) => (
            <line key={`vr${x}`} x1={x + 160} y1="20" x2={x + 160} y2="85" stroke="white" strokeOpacity="0.06" strokeWidth="0.6" />
          ))}
          {[25, 45, 65, 85].map((y) => (
            <g key={`h${y}`}>
              <line x1="8" y1={y} x2="155" y2={y} stroke="white" strokeOpacity="0.05" strokeWidth="0.6" />
              <line x1="165" y1={y} x2="312" y2={y} stroke="white" strokeOpacity="0.05" strokeWidth="0.6" />
            </g>
          ))}
          <rect x="14" y="18" width="10" height="6" fill="none" stroke={accent} strokeWidth="0.8" strokeOpacity="0.4" />
          <rect x="133" y="18" width="10" height="6" fill="none" stroke={accent} strokeWidth="0.8" strokeOpacity="0.4" />
          <rect x="177" y="18" width="10" height="6" fill="none" stroke={accent} strokeWidth="0.8" strokeOpacity="0.4" />
          <rect x="296" y="18" width="10" height="6" fill="none" stroke={accent} strokeWidth="0.8" strokeOpacity="0.4" />
        </g>
      )}
    </svg>
  );
}
