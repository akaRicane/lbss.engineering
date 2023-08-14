window.addEventListener("message", (event) => {
  const parsed = JSON.parse(event.data);
  console.log("Received -> ", parsed);
})