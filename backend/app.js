// load env file
require("dotenv").config();
//console.log(process.env);

const express = require("express");
require("express-async-errors");

const http = require("http");

// database
const connectDB = require("./db/connect");

//middleware
const AppRouter = require("./router");

//main
const app = express();
app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true })); // to support URL-encoded bodies

app.use('/api', AppRouter)

const server = http.createServer(app);
const start = async () => {
    try {
        const port = (process.env.PORT || 9898);
        await connectDB(process.env.DB_HOST);
        server.listen(port, () =>
            console.log(`Server is listening on port ${port}...`)
        );
    } catch (error) {
        console.log(error);
    }
};

start();