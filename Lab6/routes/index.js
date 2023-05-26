import bands from "./bands.js";
import albums from "./albums.js";

const constructorMethod = (app) => {
  app.use("/bands", bands);
  app.use("/albums", albums);
  app.use("*", (req, res) => {
    res.status(404).json({ error: "Not found" });
  });
};
export default constructorMethod;
