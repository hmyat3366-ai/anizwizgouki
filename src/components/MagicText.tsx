import { useEffect, useState } from "react";

/**
 * Animated name scramble effect — cycles through multiple names
 * with a character-by-character reveal animation.
 */
const NAMES = ["Aniz Wiz Gouki", "Gouki", "Htet Myat Oo"];
const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!<>-_\\/[]{}—=+*^?#";
const CYCLE_INTERVAL_MS = 4000;
const SCRAMBLE_TICK_MS = 30;
const SCRAMBLE_SPEED = 1 / 3; // characters revealed per tick

export default function MagicText() {
  const [displayText, setDisplayText] = useState(NAMES[0]);

  useEffect(() => {
    let currentIndex = 0;

    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % NAMES.length;
      const targetText = NAMES[currentIndex];
      let iteration = 0;

      const scrambleInterval = setInterval(() => {
        setDisplayText(
          targetText
            .split("")
            .map((char, i) =>
              i < iteration
                ? targetText[i]
                : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
            )
            .join("")
        );

        if (iteration >= targetText.length) {
          clearInterval(scrambleInterval);
          setDisplayText(targetText);
        }
        iteration += SCRAMBLE_SPEED;
      }, SCRAMBLE_TICK_MS);
    }, CYCLE_INTERVAL_MS);

    return () => clearInterval(interval);
  }, []);

  return (
    <strong className="text-foreground inline-block font-mono tracking-tight bg-primary/10 px-1 rounded">
      {displayText}
    </strong>
  );
}
