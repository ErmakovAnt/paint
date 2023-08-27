export function saveImg(args: {
  id: string | null | undefined;
  canvas?: HTMLCanvasElement | null | undefined;
}) {
  const { id, canvas } = args;
  if (canvas && id) {
    const dataUrl = canvas?.toDataURL();
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = id + ".jpg";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}
