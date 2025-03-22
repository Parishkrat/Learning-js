import promptSync from "prompt-sync";
const prompt = promptSync();

let city = prompt("Enter city name:");
fetch(`api'/${city}`)
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error fetching data:", error));