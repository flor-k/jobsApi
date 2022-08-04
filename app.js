require("dotenv").config();
require("express-async-errors");
//hola julio

const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

// swagger
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");

const express = require("express");
const app = express();

//connect db
const connectDB = require("./db/connect");
const {connectMSSQL, connection} = require("./db/connectmssql");
const authenticateUser = require("./middleware/authentication");

const authRouter = require("./routes/auth");
const jobsRouter = require("./routes/jobs");
const enidadesRouter = require("./routes/entidades");

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.set("trust proxy", 1); //enable because we are going to be behaind a reverse proxy (uploading this api to Heroke)
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, //a widnow of time in ms
    max: 100, //limit each IP to x request per window
  })
);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

//routes
app.get("/", (req, res) => {
  res.send('<h1>Jobs API</h1><a href="/api-docs">Documentation</a>');
});
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticateUser, jobsRouter);
app.use("/api/v1/entidades", authenticateUser, enidadesRouter);

const { required } = require("joi");

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await connectMSSQL();
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();

