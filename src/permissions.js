import { fetchWeatherCurrent } from "./weather";
export function handlePermission() {
  navigator.geolocation;
  navigator.permissions.query({ name: "geolocation" }).then((result) => {
    if (result.state === "granted") {
      report(result.state);
    } else if (result.state === "prompt") {
      report(result.state);
      navigator.geolocation.getCurrentPosition(fetchWeatherCurrent);
    } else if (result.state === "denied") {
      report(result.state);
    }
    result.addEventListener("change", () => {
      report(result.state);
    });
  });
}

function report(state) {
  console.log(`Permission ${state}`);
}
