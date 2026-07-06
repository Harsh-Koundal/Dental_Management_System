import rateLimit from "express-rate-limit";

export const authLimiter = rateLimit({
    windowMs:2*60*1000,
    max:5,
    message:"Too many attempts, please try again later",
    standardHeaders:true,
    legacyHeaders:false,
});

export const loginLimiter = rateLimit({
    windowMs:2*60*100,
    max:5,
    message:"Too many attempts, please try again later",
    skipSuccessfulRequests:true,
});

export const signupLimiter = rateLimit({
    windowMs:15*60*100,
    max:3,
    message:"Too many attempts, please try again later",
})