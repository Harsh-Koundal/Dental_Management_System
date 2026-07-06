import bcrypt from "bcryptjs";
import validator from "validator";
import User from "../models/User.js";
import RefreshToken from "../models/RefreshToken.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/sendEmail.js";

export const signup = async (req, res, next) => {
    try {
        const { Firstname, Lastname, email, password, role } = req.body;

        if (!Firstname || !Lastname || !email || !password)
            return res.status(400).json({ message: "All fields are required" });

        if (!validator.isEmail(email))
            return res.status(400).json({ message: "Invalid Email Format" });

        // Check if user already exists in DB
        const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
        if (existingUser) return res.status(409).json({ message: "User already exists" });

        const saltRounds = 12;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        // Data to be encrypted in the token
        const signupData = { Firstname, Lastname, email: email.toLowerCase().trim(), passwordHash, role: role || "USER" };

        // Create a temporary token that expires in 15 mins
        const verificationToken = jwt.sign(
            signupData,
            process.env.JWT_SECRET,
            { expiresIn: "15m" }
        );

        const serverUrl = process.env.SERVER_URL;
        const verifyUrl = `${serverUrl}/api/auth/verify/${verificationToken}`;

        await sendEmail({
            from: `"NerathiX" <${process.env.MAIL_ID}>`,
            to: email,
            subject: "✅ Verify your email to activate your account",
            html: `
      <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 32px; background: #f9f9f9; border-radius: 12px;">
        <h2 style="color: #1565c0;">Hello, ${Firstname} 👋</h2>
        <p style="color: #555; font-size: 15px;">
          Thanks for registering at Panda Smile! Please verify your email to activate your account.
        </p>
        <a href="${verifyUrl}" style="display: inline-block; margin-top: 20px; padding: 14px 32px; background: #1565c0; color: white; border-radius: 8px; text-decoration: none; font-size: 16px; font-weight: bold;">
          ✅ Verify My Email
        </a>
        <p style="color: #999; font-size: 12px; margin-top: 24px;">
          ⏳ This link expires in <b>15 minutes</b>.<br/>
          If you didn't register, ignore this email.
        </p>
        <p style="color: #ccc; font-size: 11px; margin-top: 8px;">
          Or copy this link into your browser:<br/>
          <span style="color: #1565c0;">${verifyUrl}</span>
        </p>
      </div>
    `,
        });

        return res.status(200).json({
            message: "Verification email sent. Please check your inbox to complete registration.",
        });
    } catch (error) {
        return next(error);
    }
};

export const VerifyEmail = async (req, res, next) => {
    try {
        const { token } = req.params;

        if (!token) return res.redirect(`${process.env.CLIENT_URL}/login?error=no_token`);

        // Decode the token to get user data
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            console.log("Token verification failed:", err.message);
            return res.redirect(`${process.env.CLIENT_URL}/login?error=invalid_or_expired_link`);
        }

        const { Firstname, Lastname, email, passwordHash, role } = decoded;

        // Final check if user was created while the token was pending
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.redirect(`${process.env.CLIENT_URL}/login?error=already_registered`);

        // Now creating the user in Database
        await User.create({
            Firstname,
            Lastname,
            email,
            passwordHash,
            role,
            isVerified: true, // Mark as verified immediately
        });

        console.log("User officially added to DB:", email);
        return res.redirect(`${process.env.CLIENT_URL}/login?status=verified`);
    } catch (err) {
        console.error("Verification error:", err);
        return res.status(500).json({
            success: false,
            message: "verification failed"
        });
    }
};

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password)
            return res.status(400).json({ message: "email  & password required" });

        if (!validator.isEmail(email))
            return res.status(400).json({ message: "Invalid Format" });

        const user = await User.findOne({
            email: email.toLowerCase().trim()
        }).select("+passwordHash");

        if (!user) {
            console.log(`[AUTH DEBUG] Login Failed: No user found with email: ${email}`);
            return res.status(401).json({ message: "Invalid Credentials" });
        }

        if (user.isBlocked)
            return res.status(403).json({ message: "Account Blocked" });

        if (!user.isVerified) {
            console.log(`[AUTH DEBUG] Login Failed: User ${email} is not verified.`);
            return res.status(403).json({ message: "Please verify email first" });
        }

        const isMatch = await bcrypt.compare(password, user.passwordHash);

        if (!isMatch) {
            console.log(`[AUTH DEBUG] Login Failed: Incorrect password for: ${email}`);
            user.loginAttempts += 1;
            await user.save();
            return res.status(401).json({ message: "Invalid Credentials" });
        }

        user.loginAttempts = 0;
        await user.save();

        const accessToken = jwt.sign(
            { id: user._id, role: user.role },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "15m" }
        );

        const refreshToken = crypto.randomBytes(64).toString("hex");

        const tokenHash = crypto
            .createHash("sha256")
            .update(refreshToken)
            .digest("hex");

        await RefreshToken.create({
            userId: user._id,
            tokenHash,
            ipAddress: req.ip,
            deviceInfo: req.headers["user-agent"],
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Lax",
            maxAge: 15 * 60 * 1000,
        })

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })

        return res.status(200).json({ 
            message: "Login Successful",
            accessToken,
            user: {
                id: user._id,
                Firstname: user.Firstname,
                Lastname: user.Lastname,
                email: user.email,
                role: user.role
            }
        });

    } catch (err) {
        console.error("Failed to login", err);
        next(err);
    }
};

export const logout = async (req, res, next) => {
    try {
        const refreshToken = req.cookies?.refreshToken;

        if (refreshToken) {
            const tokenHash = crypto
                .createHash("sha256")
                .update(refreshToken)
                .digest("hex");

            await RefreshToken.deleteOne({ tokenHash });
        }

        res.clearCookie("accessToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Lax",
        });

        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Lax",
        });

        return res.status(200).json({
            message: "Logout Successfull"
        });
    } catch (err) {
        console.error("Logout failed", err);
        next(err);
    }
};

export const getProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({
            id: user._id,
            Firstname: user.Firstname,
            Lastname: user.Lastname,
            email: user.email,
            role: user.role
        });
    } catch (err) {
        console.error("Get profile failed", err);
        next(err);
    }
};