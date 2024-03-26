const express = require("express");
const cors_ = require("cors");
const RouterAuthReg = require("./src/Routes/AuthReg.js");
const RouterApp = require("./src/Routes/App");

//require('./src/DBase/Firebase/ConexionFirebase')

const App = express();

// middlewares
App.use(
  express.json({
    limit: "35mb",
  })
);
App.use(
  cors_({
    origin: "*",
  })
);

//Route 404
App.use("*", (req, res) => {
  console.error(`404 from ${req.url} by ${req.ip}`);
  res.status(404);
});

//Routes
App.use("/api/arcontroller/", RouterAuthReg);
App.use("/api/arcontroller/", RouterApp);

App.set("port", process.env.PORT || 2023);

App.listen(App.get("port"), () => {
  console.log(`servidor levantado en puerto ${App.get("port")}`);
});
