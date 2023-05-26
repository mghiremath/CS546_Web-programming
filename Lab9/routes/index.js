//Here you will require route files and export them as used in previous labs.
import textanalyzeRouter from "./textanalyzer.js";
const constructorMethod = (app) => {
  app.use("/", textanalyzeRouter);
  app.use("*", (req, res) => {
    return res.status(404).json("Invalid URL");
  });
};
export default constructorMethod;
