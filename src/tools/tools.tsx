import { brush } from "./brush";

export function tools(tool: string | null, canvas: HTMLCanvasElement | null) {
  switch (tool) {
    case "brush":
      brush(canvas);
      return;
  }
}
