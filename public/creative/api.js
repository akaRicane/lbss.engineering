let EVENT = { target: "", message: "" };

let ISHOME = true;
let HOOVERPRODUCTS = false;
let HOOVERABOUT = false;
let HOOVERACCOUNT = false;
let ISPRODUCTS = false;
let ISABOUT = false;
let ISACCOUNT = false;
let CLICK = { isClick: false, x: 0, y: 0 };
let WHEEL = { isWheel: false, deltaX: 0, deltaY: 0 };
let CURSOR = { x: 0, y: 0 };

window.addEventListener("message", (event) => {
  const parsed = JSON.parse(event.data);
  console.log("Received -> ", parsed);
  EVENT = parsed;
  switch (EVENT.target) {
    case "cursor":
      CURSOR = EVENT.message;
      break;
    case "click":
      CLICK = { isClick: true, x: EVENT.message.x, x: EVENT.message.y };
      break;
    case "wheel":
      WHEEL = { isWheel: true, deltaX: EVENT.message.deltaX, deltaY: EVENT.message.deltaY };
      break;
    case "mouseOver":
      switch (EVENT.message) {
        case "LINK_TO_PRODUCTS":
          HOOVERPRODUCTS = true;
          break;
        case "LINK_TO_ABOUT":
          HOOVERABOUT = true;
          break;
        case "LINK_TO_ACCOUNT":
          HOOVERACCOUNT = true;
          break;
        default:
          break;
      }
      break;
    case "mouseOut":
      HOOVERACCOUNT = false;
      HOOVERABOUT = false;
      HOOVERPRODUCTS = false;
      // ISHOME = true;
      break;
    case "location":
      ISPRODUCTS = false;
      ISABOUT = false;
      ISACCOUNT = false;
      switch (EVENT.message) {
        case "/products":
          ISPRODUCTS = true;
          break;
        case "/about":
          ISABOUT = true;
          break;
        case "/account":
          ISACCOUNT = true;
          break;
      }

      break;

    default:
      break;
  }
});
