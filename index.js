const express = require("express");
const PORT = process.env.PORT || 4200;
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("./config/db");
const app = express();
//configure database and mongoose

console.log("Current database config", config.database);
mongoose.set("useCreateIndex", true);
mongoose
  .connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Database is connected !!!");
  })
  .catch(err => {
    console.log("ERROR Database now", config.database);
    console.log({ database_error: err });
  });
// db configuaration ends here
//registering cors
app.use(cors());
//configure body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//configure body-parser ends here
app.use(morgan("dev")); // configire morgan

app.use('/uploads', express.static('uploads'));
// define first route
app.get("/", (req, res) => {
  res.json("Hello world everyone");
});

const musicRoutes = require("./api/routes/music"); //bring in our user routes
app.use("/music", musicRoutes)

app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});
