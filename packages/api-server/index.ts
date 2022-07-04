import express from "express";
import * as trpc from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";
import z from "zod";

interface ChatMessage {
  user: string;
  message: string;
}

const messages: ChatMessage[] = [
  { user: "user1", message: "Hello" },
  { user: "user1", message: "Hi" },
];

const appRouter = trpc
  .router()
  .query("hello", {
    resolve() {
      return "Hello World II#";
    },
  })
  .query("getMessages", {
    resolve() {
      return messages;
    },
  });

export type AppRouter = typeof appRouter;

const port = 8080;
const app = express();
app.use(cors());

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext: () => null,
  })
);

app.get("/", (req, res) => {
  res.send("Hello from api-server");
});

app.listen(port, () => {
  console.log(`api-server listening at http://localhost:${port}`);
});
