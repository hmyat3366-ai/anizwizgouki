/**
 * Floating dark/light mode toggle pill — fixed at bottom center of viewport.
 */
export default function ThemeToggle() {
  const toggleDarkMode = () => {
    const html = document.documentElement;
    const circle = document.getElementById("theme-toggle-circle");
    html.classList.toggle("dark");
    if (html.classList.contains("dark")) {
      circle?.classList.replace("translate-x-0", "translate-x-5");
    } else {
      circle?.classList.replace("translate-x-5", "translate-x-0");
    }
  };

  return (
    <div
      id="theme-toggle"
      onClick={toggleDarkMode}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-gray-300 dark:bg-gray-700 rounded-full w-14 h-8 p-1 flex items-center cursor-pointer shadow-lg z-50 transition-colors"
    >
      <div
        id="theme-toggle-circle"
        className="bg-white dark:bg-gray-200 w-6 h-6 rounded-full shadow-md transform translate-x-0 transition-transform duration-300"
      />
    </div>
  );
}
