"use client";

import { useCallback, useRef, useState } from "react";

const WORDS = ["LET", "ME", "IN"];

export default function DoorPage() {
  const [pressedKeys, setPressedKeys] = useState<Set<number>>(new Set());
  const keyRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handlePress = useCallback((index: number) => {
    setPressedKeys((prev) => {
      if (prev.has(index)) return prev;
      const next = new Set(prev);
      next.add(index);
      return next;
    });
  }, []);

  let keyIndex = 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="flex items-center gap-6">
        {WORDS.map((word, wordIdx) => (
          <div key={wordIdx} className="flex gap-1">
            {word.split("").map((letter) => {
              const idx = keyIndex++;
              const isPressed = pressedKeys.has(idx);
              return (
                <button
                  key={idx}
                  ref={(el) => { keyRefs.current[idx] = el; }}
                  type="button"
                  onClick={() => handlePress(idx)}
                  className={`cursor-pointer select-none border-2 border-black bg-white px-4 py-3 font-mono text-lg font-bold text-black transition-all ${
                    isPressed
                      ? "translate-y-2 shadow-[0_0px_0_0_black] duration-50"
                      : "translate-y-0 shadow-[0_8px_0_0_black] duration-200 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] hover:translate-y-1 hover:shadow-[0_4px_0_0_black] hover:duration-150 hover:ease-in active:translate-y-2 active:shadow-[0_0px_0_0_black] active:duration-50"
                  }`}
                >
                  {letter}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
