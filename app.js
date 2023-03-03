const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");

const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(async (req, res, next) => {
  const user = await User.findById("6401c4f96c1d758a1e80eb11");
  req.user = user;
  next();
});

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// app.use((req, res, next) => {
//   User.findById(1)
//     .then((user) => {
//       req.user = user;
//       next();
//     })
//     .catch((err) => console.log(err));
// });

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(process.env.MONGO_STRING)
  .then((res) => {
    console.log(`Connected`);

    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: "Shaheer Khan NS",
          email: "sha@example.com",
          cart: {
            items: [],
          },
        });
        user.save();
      }
    });

    app.listen(3000);
  })
  .catch((err) => console.log(err));
