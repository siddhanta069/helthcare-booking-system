import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import userRouter from "./routes/userRoute.js";

// app config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// middlewares
app.use(express.json());

// Define allowed origins
const allowedOrigins = [
    'https://clientside-booking-system.onrender.com',
    'https://admin-booking-system-v7h2.onrender.com'
];

// Configure CORS
const corsOptions = {
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true); 
        
        // Allow if the origin is in the allowed list
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            // Log the blocked origin for debugging
            console.log(`CORS block: Origin ${origin} not allowed.`);
            callback(new Error('Not allowed by CORS'), false);
        }
    },
    optionsSuccessStatus: 200
};

// Apply the specific CORS configuration
app.use(cors(corsOptions));

// api endpoints
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.send("API WORKING");
});

app.listen(port, () => console.log("Server started", port));
