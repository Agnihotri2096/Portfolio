import { useState, useEffect } from "react";

interface TypewriterTextProps {
  text: string;
  delayOffset?: number;
  isActive: boolean;
  className?: string;
  speedMs?: number;
}

const TypewriterText = ({
  text,
  delayOffset = 0,
  isActive,
  className = "",
  speedMs = 15,
}: TypewriterTextProps) => {
  const [renderCount, setRenderCount] = useState(0);

  useEffect(() => {
    if (isActive) {
      setRenderCount((c) => c + 1);
    }
  }, [isActive]);

  if (!isActive) {
    return <span className={className} style={{ opacity: 0 }}>{text}</span>;
  }

  const words = text.split(" ");
  let charCounter = delayOffset;

  return (
    <span key={renderCount} className={`typewriter-container ${className}`} data-typewriter>
      {words.map((word, wIdx) => {
        const letters = word.split("");
        const startIdx = charCounter;
        charCounter += letters.length + 1;

        return (
          <span className="typewriter-word" key={wIdx}>
            {letters.map((char, lIdx) => {
              const delayMs = (startIdx + lIdx) * speedMs;
              return (
                <span
                  key={lIdx}
                  className="typewriter-letter"
                  style={{ animationDelay: `${delayMs}ms` }}
                >
                  {char}
                </span>
              );
            })}
            {wIdx < words.length - 1 ? "\u00A0" : ""}
          </span>
        );
      })}
    </span>
  );
};

export default TypewriterText;
