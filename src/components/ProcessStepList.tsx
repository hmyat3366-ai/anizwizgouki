import type { ProcessStep } from "../types";

/**
 * Reusable numbered step list — used for both "Figma Design Process"
 * and "AI-Prototyping Process" sections in the case study modal.
 *
 * DRY: Previously this exact markup was duplicated twice in the modal.
 */
interface ProcessStepListProps {
  steps: ProcessStep[];
}

export default function ProcessStepList({ steps }: ProcessStepListProps) {
  return (
    <div className="flex flex-col gap-0">
      {steps.map((item, idx) => (
        <div key={idx} className="py-4 border-b border-border/60 group">
          <div className="flex items-start gap-3">
            <span className="text-[11px] font-bold tracking-widest text-gray-300 dark:text-gray-600 font-display mt-0.5 tabular-nums">
              {item.step}
            </span>
            <div>
              <h4 className="font-bold text-foreground text-sm mb-1 group-hover:text-primary transition-colors">
                {item.title}
              </h4>
              <p className="text-[13px] text-muted-foreground leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
