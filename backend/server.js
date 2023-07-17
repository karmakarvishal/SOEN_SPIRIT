const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("./app/config/config.js");

const app = express();
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Spirit API" });
});

// api routes
require("./app/routes/auth.routes")(app);
require("./app/routes/attachment.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/candidate.routes")(app);
require("./app/routes/jobs.routes")(app);
require("./app/routes/job_application.routes")(app);


// set port, listen for requests
const PORT = config.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
