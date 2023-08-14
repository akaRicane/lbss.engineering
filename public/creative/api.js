let EVENT = {target : "", message : ""};
window.addEventListener("message", (event) => {
  const parsed = JSON.parse(event.data);
  console.log("Received -> ", parsed);
  EVENT = parsed;
})