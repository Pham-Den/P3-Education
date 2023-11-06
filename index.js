const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
// const compression = require("compression");
const morgan = require("morgan");

const moduleRouter = require("./routers/moduleRouter");
const courseRouter = require("./routers/courseRouter");
const classRouter = require("./routers/classRouter");
const userRouter = require("./routers/userRouter");
const loginRouter = require("./routers/loginRouter");
const waitListRouter = require("./routers/waitListRouter");
const adminRouter = require("./routers/adminRouter");
const roleRouter = require("./routers/roleRouter");
const toeicQuestionRouter = require("./routers/toeicQuestionRouter");
const toeicExamRouter = require("./routers/toeicExamRouter");

const app = express();
dotenv.config();

app.use(express.static("public"));

//set-headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  next();
});
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());

//route
app.use("/api/module", moduleRouter);
app.use("/api/course", courseRouter);
app.use("/api/class", classRouter);
app.use("/api/user", userRouter);
app.use("/api/user", loginRouter);
app.use("/api/waitlist", waitListRouter);
app.use("/api/admin", adminRouter);
app.use("/api/role", roleRouter);
app.use("/api/toeic-question", toeicQuestionRouter);
app.use("/api/toeic-exam", toeicExamRouter);

mongoose
  .connect(process.env.MONGOOSE_URL)
  .then((res) => {
    console.log("Mongoose is connect!");
    const PORT = process.env.PORT || 4000;
    ///

    const server = http.createServer(app);
    // server.listen();
    server.listen(PORT, () => {
      console.log("Server is runing....");
    });
  })
  .catch((err) => console.log(err));
