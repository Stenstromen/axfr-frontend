export default function setBodyColor({ color }) {
    document.documentElement.style.setProperty("--bs-body-bg", color);
    console.log("running " + color)
  }  