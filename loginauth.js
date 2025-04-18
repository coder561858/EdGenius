
import express from "express";
import passport from "passport";
import session from "express-session";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import admin from 'firebase-admin';
import fs from 'fs'; 

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

const serviceAccount = JSON.parse(fs.readFileSync('./credentials/serviceAccountKey.json', 'utf8'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),

});

app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }  
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'images1')));
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', "Basic.html"));
});

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// Google OAuth strategy
passport.use(new GoogleStrategy({
  clientID:"1079406450809-sc39m100au0pbkki6mc1lv6ibbgs7qcb.apps.googleusercontent.com",
  clientSecret:"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",
  callbackURL: "/auth/google/callback"
},
async (accessToken, refreshToken, profile, done) => {
  try {
    const db = admin.firestore();
    let userRef = db.collection('users').doc(profile.id);
    let doc = await userRef.get();

    if (doc.exists) {
      return done(null, doc.data());
    }

    const newUser = {
      googleId: profile.id,
      name: profile.displayName,
      email: profile.emails[0].value
    };

    await userRef.set(newUser);
    return done(null, newUser);
  } catch (error) {
    console.error("Error during authentication:", error);
    return done(error, null);
  }
}));

// Routes for authentication
app.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    const name = encodeURIComponent(req.user.name);
    res.redirect(`/l.html?name=${name}`);
  }
);

app.listen(5000, () => {
  console.log("Server started on http://localhost:5000");
});
