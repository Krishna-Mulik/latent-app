import express from "express";
import v1Router from "./routes/v1/index";

const app = express();
const port = 8080;

app.use(express.json());

app.use('/api/v1', v1Router);

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})

