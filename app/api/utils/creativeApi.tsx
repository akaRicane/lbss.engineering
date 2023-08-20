export function sendToCreative(props: any) {
  const creative = document.getElementById("CREATIVE_FRAME") as HTMLIFrameElement;
  // console.log("want to send", props, creative);

  if (creative !== null) {
    // @ts-ignore
    creative.contentWindow.postMessage(JSON.stringify(props), "*");
  }
}
