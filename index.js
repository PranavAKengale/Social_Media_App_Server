import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";




// routes
import AuthRoute from './Routes/AuthRoute.js'
import UserRoute from './Routes/UserRoute.js'
import PostRoute from './Routes/PostRoute.js'
import UploadRoute from './Routes/UploadRoute.js'
// import ChatRoute from './routes/ChatRoute.js'
// import MessageRoute from './routes/MessageRoute.js'

const app = express();


// middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
// to serve images inside public folder
app.use(express.static('public')); 
app.use('/images', express.static('images'));
// app.use('/images', express.static(path.join(__dirname, 'images')));


dotenv.config();
const PORT = process.env.PORT;



const CONNECTION =process.env.MONGO_DB;
mongoose
  .connect(CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT || 5000, () => console.log('Listening at Port')))
  .catch((error) => console.log(`${error} did not connect`));


app.use('/auth', AuthRoute);
app.use('/user', UserRoute)
app.use('/posts', PostRoute)
app.use('/upload', UploadRoute)
// app.use('/chat', ChatRoute)
// app.use('/message', MessageRoute)










