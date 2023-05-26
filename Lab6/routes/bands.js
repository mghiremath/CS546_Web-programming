import e, { Router } from "express";
import { bandData } from "../data/index.js";
import { validateBandInput } from "../helpers.js";
import { ObjectId } from "mongodb";

const bandsRouter = Router();

bandsRouter
  .route("/")
  .get(async (req, res) => {
    try {
      const bands = await bandData.getAll();
      const formattedBands = bands.map((band) => ({
        _id: band._id,
        name: band.name,
      }));
      res.json(formattedBands);
    } catch (error) {
      res.status(500).json(error);
    }
  })
  .post(async (req, res) => {
    try {
      const bandReqData = req.body;
      if (!bandReqData || !validateBandInput(bandReqData)) {
        return res.status(400).json({ error: "Invalid band data" });
      }

      const newBand = await bandData.create(
        bandReqData.name,
        bandReqData.genre,
        bandReqData.website,
        bandReqData.recordCompany,
        bandReqData.groupMembers,
        bandReqData.yearBandWasFormed
      );
      res.status(200).json(newBand);
    } catch (error) {
      res.status(500).json({ error: error + ". Hence, Failed to create band" });
    }
  });

bandsRouter
  .route("/:id")
  .get(async (req, res) => {
    try {
      const id = req.params.id;
      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid ID format" });
      }
      const bands = await bandData.get(id);
      if (!bands) {
        return res.status(404).json({ error: "Band not found" });
      }
      res.json(bands);
    } catch (error) {
      res.status(500).json(error);
    }
  })
  .delete(async (req, res) => {
    try {
      const id = req.params.id;
      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid ID format" });
      }
      const existingBand = await bandData.get(id);
      if (!existingBand) {
        return res.status(404).json({ error: "Band not found" });
      }
      const deletedBand = await bandData.remove(id);
      res.status(200).json({ bandId: id, deleted: true });
    } catch (error) {
      res
        .status(500)
        .json({ error: error + ". Hence, Error deleting the band" });
    }
  })
  .put(async (req, res) => {
    try {
      const id = req.params.id;
      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid ID format" });
      }
      const bandReqData = req.body;
      if (!bandReqData || !validateBandInput(bandReqData)) {
        return res.status(400).json({ error: "Invalid band data" });
      }
      const existingBand = await bandData.get(id);
      if (!existingBand) {
        return res
          .status(404)
          .json({ error: error + ". Hence, Band not found" });
      }
      const updatedBand = await bandData.update(
        existingBand._id,
        bandReqData.name,
        bandReqData.genre,
        bandReqData.website,
        bandReqData.recordCompany,
        bandReqData.groupMembers,
        bandReqData.yearBandWasFormed,
        existingBand.albums,
        existingBand.overallRating
      );
      updatedBand._id = updatedBand._id.toString();
      res.status(200).json(updatedBand);
    } catch (error) {
      res
        .status(500)
        .json({ error: error + ". Hence, Error updating the band" });
    }
  });
export default bandsRouter;
