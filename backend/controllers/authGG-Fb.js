const axios = require("axios");
const { User, DataUser } = require("../models/Mongoose/User");
const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.googleLogin = async (req, res) => {
    const { code } = req.body;

    try {
        const r = await axios.post(
        `https://oauth2.googleapis.com/token`,
        new URLSearchParams({
            code,
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            redirect_uri: "http://localhost:3000", // để trống cho SPA
            grant_type: "authorization_code"
        }).toString(),
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        );

        const { id_token } = r.data; // đây mới là ID token

        const ticket = await client.verifyIdToken({
            idToken: id_token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const { sub: googleId, email, name, picture } = payload;

        const existingUser = await DataUser.findOne({ googleID: googleId });
        if (!existingUser) {
            // 5. Tạo luôn profile mặc định trong collection 'dataUser'
            const newProfile = new DataUser({
                googleID: googleId,
                phone: "",              // để trống
                email: `${email}`,      // gắn email từ Google
                name: `${name}`,        // gắn name từ Google
                displayName: "",        // để trống
                gender: "other",        // theo default
                dateOfBirth: null,      // để trống
                avatarUrl: `${picture}`,// gắn avatarUrl từ Google (nếu có)
            });
            await newProfile.save();
        }
        

        // Tạo access token (1 ngàys)
        const accessToken = jwt.sign(
            { userId: googleId, email, name },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        // Tạo refresh token (7 ngày)
        const refreshToken = jwt.sign(
            { userId: googleId, email, name },
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: "7d" }
        );

        res
            .cookie("access_token", accessToken, {
                httpOnly: true,
                // Đổi để test trên điện thoại với localhost
                secure: false,
                sameSite: "Lax",
                // secure: process.env.NODE_ENV === 'production',
                maxAge: 1 * 24 * 60 * 60 * 1000, // 1 ngày
            })
            .cookie("refresh_token", refreshToken, {
                httpOnly: true,
                secure: false,
                sameSite: "Lax",
                // secure: process.env.NODE_ENV === 'production',
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 ngày
            })
            .json({ message: "Đăng nhập Google thành công!" });

        // const jwtToken = jwt.sign({ googleId, email, name }, process.env.JWT_SECRET, { expiresIn: "7d" });
        // res.json({ token: jwtToken, user: { email, name, picture } });

    } catch (err) {
        console.error(err);
        res.status(400).json({ message: "Đăng nhập Google thất bại" });
    }
};
