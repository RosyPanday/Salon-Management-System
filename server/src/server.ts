import express from "express";
import http from "http";
import cors from "cors";
import path from "path";

import { corsWhiteList, port } from "./config/index.js";
import { Database } from "./database/connection.js";
import routes from "./api/routes/index.js";

export class Server {
  private app: express.Application;
  private httpServer!: http.Server;

  constructor() {
    this.app = express();
  }

  private async connectDB() {
    await Database.connect();
    console.log("Connected to database");
  }

  private setUpMiddleware() {
    this.app.use(cors<cors.CorsRequest>({ origin: corsWhiteList }));
    this.app.use(express.json());

    this.app.use(
      "/uploads",
      express.static(path.join(process.cwd(), "uploads")),
    );
  }

  public async start() {
    await this.connectDB();

    this.setUpMiddleware();

    // REST API routes
    this.app.use("/api", routes);

    this.httpServer = http.createServer(this.app);

    await new Promise<void>((resolve, reject) => {
      this.httpServer.listen(port, () => {
        console.info(`Server running at http://localhost:${port}`);
        resolve();
      });

      this.httpServer.on("error", (err: Error) => {
        console.error(`Error starting server: ${err.message}`);
        reject(err);
      });
    });
  }
}

const server = new Server();
await server.start();