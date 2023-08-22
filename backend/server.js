const express = require("express");
const app = express();
const WSserver = require("express-ws")(app);
const aWss = WSserver.getWss();
const PORT = process.env.PORT || 5000;

app.ws("/", (ws, req) => {
  console.log("подключение установлено");
  ws.on("message", (msg) => {
    msg = JSON.parse(msg);
    switch (msg.method) {
      case "connection":
        connectionHandler(ws, msg);
        break;
      case "draw":
        connectionHandler(ws, msg);
        break;
    }
  });
});

app.listen(PORT, () => console.log("Server is working on port", PORT));

function connectionHandler(ws, msg) {
  ws.id = msg.id;
  broadcastConnection(ws, msg);
}

function broadcastConnection(ws, msg) {
  aWss.clients.forEach((client) => {
    if (client.id === msg.id) {
      client.send(JSON.stringify(msg));
    }
  });
}
