export const redirectToLoginIfLoggedIn = (req, res, next) => {
  if (req.session.user) {
    if (req.session.user.role === "admin") {
      return res.redirect("/admin");
    } else if (req.session.user.role === "user") {
      return res.redirect("/protected");
    }
  } else {
    next();
  }
};

export const redirectToProtectedIfLoggedIn = (req, res, next) => {
  if (req.session.user) {
    if (req.session.user.role === "admin") {
      return res.redirect("/admin");
    } else if (req.session.user.role === "user") {
      return res.redirect("/protected");
    }
  } else {
    next();
  }
};

export const requireLoginForProtected = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect("/login");
  }
};

export const requireAdminForAdmin = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect("/login");
  } else if (req.session.user.role !== "admin") {
    return res.status(403).render("error", {
      message: "You don't have access. Only Admins can view this page.",
    });
  } else {
    next();
  }
};

export const requireLoginForLogout = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect("/login");
  } else {
    next();
  }
};

export const logRequestInfo = (req, res, next) => {
  const timestamp = new Date().toUTCString();
  const method = req.method;
  const route = req.originalUrl;
  const authenticated = req.session.user
    ? "Authenticated User"
    : "Non-Authenticated User";

  console.log(`[${timestamp}]: ${method} ${route} (${authenticated})`);

  next();
};
