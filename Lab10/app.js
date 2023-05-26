import express from "express";
import session from "express-session";
import configRoutes from "./routes/index.js";
const app = express();
import {
  redirectToLoginIfLoggedIn,
  redirectToProtectedIfLoggedIn,
  requireLoginForProtected,
  requireAdminForAdmin,
  requireLoginForLogout,
  logRequestInfo,
} from "./middleware.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import exphbs from "express-handlebars";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const staticDir = express.static(__dirname + "/public");
const rewriteUnsupportedBrowserMethods = (req, res, next) => {
  if (req.body && req.body._method) {
    req.method = req.body._method;
    delete req.body._method;
  }
  next();
};
app.use("/public", staticDir);
app.use(express.json());
app.use(rewriteUnsupportedBrowserMethods);
app.use(express.urlencoded({ extended: true }));
app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(
  session({
    name: "AuthCookie",
    secret: "some secret string!..haha",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 },
  })
);

app.get("/", (req, res) => {
  if (req.session.user) {
    if (req.session.user.role === "admin") {
      return res.redirect("/admin");
    } else if (req.session.user.role === "user") {
      return res.redirect("/protected");
    }
  } else {
    return res.redirect("/login");
  }
});
app.use("/login", redirectToLoginIfLoggedIn);
app.use("/register", redirectToProtectedIfLoggedIn);
app.use("/protected", requireLoginForProtected);
app.use("/admin", requireAdminForAdmin);
app.use("/logout", requireLoginForLogout);
app.use(logRequestInfo);
configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
