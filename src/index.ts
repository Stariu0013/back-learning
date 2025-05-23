import express, { Request, Response } from 'express'
import {setupApp} from "./setupApp";

const app = express()
const port = 3000

setupApp(app);

app.listen(port, () => {
    console.log(`App started on port ${port}`)
})
