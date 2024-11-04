const { ReadlineParser } = require("@serialport/parser-readline");
const { SerialPort } = require("serialport");
const { Server } = require("socket.io");
const cors = require("cors");
const bodyParser = require("body-parser");

const http = require("http");
const express = require("express");

const app = express();
const server = http.createServer(app);
const io = new Server(server);
app.use(bodyParser.json());
// app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/view/index.html");
});

io.on("connection", (socket) => {
  console.log("Client terhubung");
  socket.on("disconnect", () => {
    console.log("Client terputus");
  });
});
const port = new SerialPort({ path: "COM7", baudRate: 9600 });

const parser = new ReadlineParser({ delimiter: "\r\n" });
port.pipe(parser);

parser.on("data", (data) => {
  io.emit("data", { data });
});

app.post("/api/sensor", (req, res) => {
  const data = req.body.data;

  if (!data) {
    console.log("data tidak ada");
  }

  port.write(data, (err) => {
    if (err) {
      res.status(500).json({ message: "Data gagal dikirim ke server" });
    }
    res.status(200).json({ message: "Data berhasil dikirim ke server" });
  });
});

app.listen(4000, () => {
  console.log("Server berjalan di http://localhost:4000");
});
