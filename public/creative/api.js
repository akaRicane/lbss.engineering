let EVENT = { target: "", message: "" };

let ISHOME = true;
let HOOVERPRODUCTS = { isHoovering: false, hovered: false };
let HOOVERABOUT = { isHoovering: false, hovered: false };
let HOOVERACCOUNT = { isHoovering: false, hovered: false };
let HOOVERHOME = { isHoovering: false, hovered: false };
let ISPRODUCTS = false;
let ISABOUT = false;
let ISACCOUNT = false;
let CLICK = { isClick: false, x: 0, y: 0 };
let WHEEL = { isWheel: false, deltaX: 0, deltaY: 0, wheelPositionX: 0, wheelPositionY: 0 };

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
      CLICK = { isClick: true, x: EVENT.message.x, y: EVENT.message.y };
      break;
    case "wheel":
      WHEEL = {
        isWheel: true,
        deltaX: EVENT.message.deltaX,
        deltaY: EVENT.message.deltaY,
        wheelPositionX: WHEEL.wheelPositionX + EVENT.message.deltaX,
        wheelPositionY: WHEEL.wheelPositionY + EVENT.message.deltaY,
      };
      break;
    case "mouseOver":
      switch (EVENT.message) {
        case "LINK_TO_PRODUCTS":
          HOOVERPRODUCTS.isHoovering = true;
          HOOVERPRODUCTS.hovered = true;
          break;
        case "LINK_TO_ABOUT":
          HOOVERABOUT.isHoovering = true;
          HOOVERABOUT.hovered = true;
          break;
        case "LINK_TO_ACCOUNT":
          HOOVERACCOUNT.isHoovering = true;
          HOOVERACCOUNT.hovered = true;
          break;
        case "LINK_TO_HOME":
          HOOVERHOME.isHoovering = true;
          HOOVERHOME.hovered = true;
          break;
        default:
          break;
      }
      break;
    case "mouseOut":
      HOOVERACCOUNT.isHoovering = false;
      HOOVERABOUT.isHoovering = false;
      HOOVERPRODUCTS.isHoovering = false;
      HOOVERHOME.isHoovering = false;
      break;
    case "location":
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
        default:
          ISHOME = true;
          ISPRODUCTS = false;
          ISABOUT = false;
          ISACCOUNT = false;
          break;
      }

      break;

    default:
      break;
  }
});
