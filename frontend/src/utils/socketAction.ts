//@ts-nocheck
export function socketActions(
  socket,
  params,
  userName,
  canvasRef,
  drawHandler,
  functions,
  undoArr,
  redoArr,
  setUndoArr,
  setRedoArr
) {
  socket.onopen = () => {
    socket.send(
      JSON.stringify({
        id: params.id,
        username: userName,
        method: "connection",
      })
    );
  };
  socket.onmessage = (event: any) => {
    let msg = JSON.parse(event.data);
    switch (msg.method) {
      case "connection":
        console.log(`Пользователь ${msg.username} был подключен`);
        break;
      case "draw":
        drawHandler(canvasRef.current, msg);
        break;
      case "func":
        functions({
          msg,
          undoArr,
          redoArr,
          setUndoArr,
          setRedoArr,
          canvas: canvasRef.current,
        });
        break;
    }
  };
}
