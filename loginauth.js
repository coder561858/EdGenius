import express from "express";
import passport from "passport";
import session from "express-session";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();  

app.use(session({ secret: "secret", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'images1')));


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "Basic.html"));
});




passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});


passport.use(new GoogleStrategy({
    clientID:"1079406450809-sc39m100au0pbkki6mc1lv6ibbgs7qcb.apps.googleusercontent.com",
    clientSecret:"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",
    callbackURL: "/auth/google/callback"
  },
  function (accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));


app.get("/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get("/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  function (req, res) {
    res.redirect("/");
  }
);

app.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
});

app.listen(5000, () => {
  console.log("Server started on http://localhost:5000");
});
