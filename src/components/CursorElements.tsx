import { DiagonalArrowIcon } from "./icons";

/**
 * Cursor follower elements rendered at root level.
 * - Skill accordion hover image trail
 * - Case study card hover arrow cursor
 */
export default function CursorElements() {
  return (
    <>
      {/* Image trail that follows cursor on skill accordion hover */}
      <img
        id="cursor-trail-img"
        src="./12.jpg"
        className="fixed pointer-events-none z-50 w-64 aspect-video object-cover rounded-xl shadow-2xl opacity-0 scale-50 transition-all duration-200 ease-out mix-blend-normal"
        style={{ left: "0", top: "0" }}
      />

      {/* Arrow circle that follows cursor on case study card hover */}
      <div
        id="cursor-text-view"
        className="fixed pointer-events-none z-[100] w-20 h-20 opacity-0 transition-opacity duration-300"
        style={{ left: "0", top: "0", transform: "translate(-50%, -50%)" }}
      >
        <div
          id="cursor-text-inner"
          className="w-full h-full bg-indigo-600 dark:bg-lime-400 text-background rounded-full flex items-center justify-center scale-50 transition-transform duration-300 shadow-xl"
        >
          <DiagonalArrowIcon className="w-10 h-10" />
        </div>
      </div>
    </>
  );
}
