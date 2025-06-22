import express, { Request, Response, NextFunction } from "express";
import v1Router from "./routes/v1/index";

const app = express();
const port = 8080;

app.use(express.json());

app.use('/api/v1', v1Router);


// app.use((req: Request, res: Response, next: NextFunction) => {
//     res.status(500).json({
//         message: "Internal server error"
//     })
// });

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})

