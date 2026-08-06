"use client";

import { motion, type MotionValue } from "motion/react";

/**
 * A taco drawn as stacked SVG layers so each ingredient can be animated
 * independently. Layers render back-to-front: back shell, fillings, front lip.
 */

type Layers = {
  shell?: MotionValue<number> | number;
  meat?: MotionValue<number> | number;
  onion?: MotionValue<number> | number;
  cilantro?: MotionValue<number> | number;
  salsa?: MotionValue<number> | number;
};

type LayerY = {
  shell?: MotionValue<number> | number;
  meat?: MotionValue<number> | number;
  onion?: MotionValue<number> | number;
  cilantro?: MotionValue<number> | number;
  salsa?: MotionValue<number> | number;
};

const INK = "#0d0b0b";

export default function TacoSvg({
  opacity = {},
  y = {},
  className = "",
}: {
  opacity?: Layers;
  y?: LayerY;
  className?: string;
}) {
  return (
    <svg
      // cropped tight to the drawing so the taco fills its box
      viewBox="30 62 340 248"
      className={className}
      role="img"
      aria-label="An illustrated street taco"
    >
      {/* ---- back shell ---- */}
      <motion.g style={{ opacity: opacity.shell ?? 1, y: y.shell ?? 0 }}>
        <path
          d="M40 118 Q200 330 360 118 Z"
          fill="#D99A2B"
          stroke={INK}
          strokeWidth="9"
          strokeLinejoin="round"
        />
      </motion.g>

      {/* ---- meat ---- */}
      <motion.g style={{ opacity: opacity.meat ?? 1, y: y.meat ?? 0 }}>
        <path
          d="M78 132 q22-34 54-14 t56-16 q30-18 56 10 q28-22 52 12 q18 26 4 44 H74 q-14-18 4-36 Z"
          fill="#8A4B2A"
          stroke={INK}
          strokeWidth="8"
          strokeLinejoin="round"
        />
        <ellipse cx="150" cy="146" rx="15" ry="10" fill="#A05C33" />
        <ellipse cx="248" cy="152" rx="17" ry="10" fill="#A05C33" />
      </motion.g>

      {/* ---- onion ---- */}
      <motion.g style={{ opacity: opacity.onion ?? 1, y: y.onion ?? 0 }}>
        {[
          [110, 122],
          [176, 108],
          [238, 116],
          [296, 128],
          [206, 138],
        ].map(([cx, cy], i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r="13"
            fill="#FFFDF5"
            stroke={INK}
            strokeWidth="6"
          />
        ))}
      </motion.g>

      {/* ---- cilantro ---- */}
      <motion.g style={{ opacity: opacity.cilantro ?? 1, y: y.cilantro ?? 0 }}>
        {[
          [132, 100, -18],
          [196, 88, 12],
          [262, 96, -8],
          [312, 112, 22],
          [90, 116, 8],
        ].map(([cx, cy, rot], i) => (
          <g key={i} transform={`rotate(${rot} ${cx} ${cy})`}>
            <ellipse
              cx={cx}
              cy={cy}
              rx="16"
              ry="9"
              fill="#5FA524"
              stroke={INK}
              strokeWidth="5"
            />
            <path
              d={`M${cx - 12} ${cy} h24`}
              stroke="#3E7315"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </g>
        ))}
      </motion.g>

      {/* ---- salsa drizzle ---- */}
      <motion.g style={{ opacity: opacity.salsa ?? 1, y: y.salsa ?? 0 }}>
        <path
          d="M92 138 q30-26 62-6 t64-12 q34-18 62 8 q22 20 30 6"
          fill="none"
          stroke="#ED1C24"
          strokeWidth="13"
          strokeLinecap="round"
        />
        <path
          d="M92 138 q30-26 62-6 t64-12 q34-18 62 8 q22 20 30 6"
          fill="none"
          stroke={INK}
          strokeWidth="13"
          strokeLinecap="round"
          strokeOpacity="0.15"
        />
      </motion.g>

      {/* ---- front lip (drawn last so fillings sit inside the shell) ---- */}
      <motion.g style={{ opacity: opacity.shell ?? 1, y: y.shell ?? 0 }}>
        <path
          d="M46 150 Q200 322 354 150 Q200 250 46 150 Z"
          fill="#F5C860"
          stroke={INK}
          strokeWidth="9"
          strokeLinejoin="round"
        />
        <path
          d="M92 196 q108 60 216 0"
          fill="none"
          stroke="#D99A2B"
          strokeWidth="7"
          strokeLinecap="round"
          opacity="0.7"
        />
      </motion.g>
    </svg>
  );
}
