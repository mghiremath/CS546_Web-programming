import { Router } from "express";
const albumsRouter = Router();
import { albumData } from "../data/index.js";
import { validateAlbumInput } from "../helpers.js";
import { bandData } from "../data/index.js";
import { ObjectId } from "mongodb";

albumsRouter
  .route("/:bandId")
  .get(async (req, res) => {
    try {
      const bandId = req.params.bandId;
      if (!ObjectId.isValid(bandId)) {
        return res.status(400).json({ error: "Invalid bandId format" });
      }
      const band = await bandData.get(bandId);
      if (!band) {
        return res.status(404).json({ error: "Band not found" });
      }
      const albums = await albumData.getAll(bandId);
      if (albums.length === 0) {
        return res.status(404).json({ error: "No albums found for this band" });
      }
      res.status(200).json(albums);
    } catch (error) {
      res
        .status(500)
        .json({ error: error + ". Hence, Error getting albums for the band" });
    }
  })
  .post(async (req, res) => {
    try {
      const bandId = req.params.bandId;
      if (!ObjectId.isValid(bandId)) {
        return res.status(400).json({ error: "Invalid bandId format" });
      }
      const band = await bandData.get(bandId);
      if (!band) {
        return res.status(404).json({ error: "Band not found" });
      }
      const albumReqData = req.body;
      if (!albumReqData || !validateAlbumInput(albumReqData)) {
        return res
          .status(400)
          .json({ error: error + ". Hence, Invalid album data" });
      }
      const newAlbum = await albumData.create(
        bandId,
        albumReqData.title,
        albumReqData.releaseDate,
        albumReqData.tracks,
        albumReqData.rating
      );
      console.log(newAlbum);
      res.status(200).json(newAlbum);
    } catch (error) {
      res
        .status(500)
        .json({ error: error + ". Hence, Failed to create album" });
    }
  });

albumsRouter
  .route("/album/:albumId")
  .get(async (req, res) => {
    try {
      const albumId = req.params.albumId;
      if (!ObjectId.isValid(albumId)) {
        return res.status(400).json({ error: "Invalid albumId format" });
      }
      const album = await albumData.get(albumId);
      if (!album) {
        return res.status(404).json({ error: "Album not found" });
      }
      res.status(200).json(album);
    } catch (error) {
      res.status(500).json({ error: error + ". Hence, Error getting album" });
    }
  })
  .delete(async (req, res) => {
    try {
      const albumId = req.params.albumId;
      if (!ObjectId.isValid(albumId)) {
        return res.status(400).json({ error: "Invalid albumId format" });
      }
      const album = await albumData.get(albumId);
      if (!album) {
        return res.status(404).json({ error: "Album not found" });
      }
      const deletedAlbum = await albumData.remove(albumId);
      res.status(200).json({ albumId, deleted: true });
    } catch (error) {
      res.status(500).json({ error: error + ". Hence, Error deleting album" });
    }
  });
export default albumsRouter;
