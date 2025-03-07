import http from 'http';
import express from 'express';
import cors from "cors";
import { Server } from 'colyseus';
import { monitor } from "@colyseus/monitor";
import { playground } from "@colyseus/playground";
import { WebSocketTransport } from '@colyseus/ws-transport';

import { TicTacToe } from "./rooms/tictactoe"

const app = express();
const port = Number(process.env.PORT || 2567);

app.use(cors());
app.use(express.json());

app.use("/monitor", monitor());
app.use("/", playground());
app.use(express.static(__dirname + "/../frontend/public"));

const server = http.createServer(app);
const gameServer = new Server({
  transport: new WebSocketTransport({ server: server })
});

gameServer.define('tictactoe', TicTacToe);
gameServer.listen(port).
  then(() => console.log(`Listening on http://localhost:${port}`));
