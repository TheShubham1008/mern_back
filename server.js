// require("dotenv").config();
// const express = require("express");
// const app = express();
// const cors = require("cors");
// const authRoute = require("./router/auth-router");
// const contactRoute=require("./router/contact-router");
// const serviceRoute=require("./router/service-router");
// const adminRoute=require("./router/admin-router");
// const connectDb = require("./utils/db");
// const errorMiddleware = require("./middlewares/error-middleware");



// const corsOptions = {
//   origin: "http://localhost:5173",
//   methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
//   credentials: true,
// };

// app.use(cors(corsOptions));

// app.use(express.json());
// app.use("/api/auth", authRoute);
// app.use("/api/form",contactRoute);
// app.use("/api/data",serviceRoute);
// app.use("/api/admin",adminRoute);

// app.use(errorMiddleware);

// const PORT = 4000;

// connectDb().then(() => {
//   app.listen(PORT, () => {
//     console.log(`server is running at port: ${PORT}`);
//   });
// });



require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-router");
const serviceRoute = require("./router/service-router");
const adminRoute = require("./router/admin-router");
const connectDb = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");

const corsOptions = {
  origin: process.env.CORS_ORIGIN || "http://localhost:5173",
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);
app.use("/api/data", serviceRoute);
app.use("/api/admin", adminRoute);

app.use(errorMiddleware);

// Use the port provided by Render, or default to 4000 if running locally
const PORT = process.env.PORT || 4000;

connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running at port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database", error);
  });

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

