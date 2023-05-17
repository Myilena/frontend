import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from "dotenv";
dotenv.config();
 
const email = ["jcmunoz982@misena.edu.co"];
passport.use(
    "auth-google",
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google"
    },
        function (accessToken, refreshToken, profile, cb) {
            const response = email.includes(profile.emails[0].value);
            if (response) {
                cb(null, profile);
            } else {
                //Save in data base//
                email.push(profile.emails[0].value);
                cb(null, profile);
            }
        }
    ));