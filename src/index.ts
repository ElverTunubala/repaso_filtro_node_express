// import "reflect-metadata";
import express from "express";
import sequelize from "./config/db";
import router from "./routes/Router";
import cors from 'cors';

const app = express();
// configuracion del cors
app.use(cors());
const corsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true
};
app.use(cors(corsOptions));
//
app.use(express.json());
app.use("/api", router);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected!");
    await sequelize.sync();
    app.listen(3000, () => {
      console.log("Server started on port 3000");
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
// npx tsc   pon a correr esto para crear la carpeta dist por si lo pide el profe
startServer();
