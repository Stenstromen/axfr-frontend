export default function setBodyColor({ theme }) {
  const root = document.documentElement;
  root.setAttribute("data-theme", theme);
  root.style.setProperty("--bs-body-bg", theme === "light" ? "#f3f5fb" : "#07090f");
}
