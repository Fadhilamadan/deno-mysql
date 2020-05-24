import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import {
  getAllBook,
  getOneBook,
  postOneBook,
  putOneBook,
  deleteOneBook,
} from "./controllers/bookController.ts";

const router = new Router();

router
  .get("/book", getAllBook)
  .get("/book/:id", getOneBook)
  .post("/book", postOneBook)
  .put("/book/:id", putOneBook)
  .delete("/book/:id", deleteOneBook);

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });
