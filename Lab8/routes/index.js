import venueRoutes from "./venues.js";

const constructorMethod = (app) => {
  app.use("/", venueRoutes);
  app.use("*", (req, res) => {
    return res
      .status(404)
      .render("error", {
        message: "Invalid URL",
        statusCode: 404,
        title: "Error",
      });
  });
};

export default constructorMethod;
