import type { ToolItem } from "../types";
import {
  FigmaIcon,
  WordPressIcon,
  FramerIcon,
  GeminiIcon,
  StitchIcon,
  AntigravityIcon,
  PenToolIcon,
  LayersIcon,
} from "../components/icons";

/** Tools displayed in the infinite marquee banner. */
export const TOOLS: ToolItem[] = [
  { name: "FIGMA", Icon: FigmaIcon },
  { name: "WORDPRESS", Icon: WordPressIcon },
  { name: "FRAMER", Icon: FramerIcon },
  { name: "GEMINI", Icon: GeminiIcon },
  { name: "STITCH", Icon: StitchIcon },
  { name: "ANTIGRAVITY", Icon: AntigravityIcon },
  { name: "UI/UX DESIGN", Icon: PenToolIcon },
  { name: "PROTOTYPING", Icon: LayersIcon },
];
