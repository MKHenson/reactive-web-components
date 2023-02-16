import "./compiler/jsx";
import { Application } from "./components/Application";

document.addEventListener("readystatechange", (e) => {
  if (
    document.readyState === "interactive" ||
    document.readyState === "complete"
  ) {
    document.querySelector("#application")!.append(<Application />);
  }
});
