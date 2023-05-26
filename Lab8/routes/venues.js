import { Router } from "express";
const router = Router();
import axios from "axios";

router.route("/").get(async (req, res) => {
  try {
    return res.render("homepage", { title: "Venue Finder" });
  } catch (error) {
    return res.status(404).render("error", {
      message: error.message,
      statusCode: 404,
      title: "Error",
    });
  }
});

router.route("/searchvenues").post(async (req, res) => {
  try {
    const searchVenueTerm = req.body.searchVenueTerm;
    if (typeof searchVenueTerm != "string") {
      return res.status(400).render("error", {
        message: "You must enter a string.",
        statusCode: 400,
        title: "Error",
      });
    }
    if (!searchVenueTerm || searchVenueTerm.trim() === "") {
      return res.status(400).render("error", {
        message: "You must enter a venue keyword to search.",
        statusCode: 400,
        title: "Error",
      });
    }
    searchVenueTerm.trim();
    const API_KEY = "zGUw8jzgzf5r0dikebnrqzk05jma6uuD";
    const resp = await axios.get(
      `https://app.ticketmaster.com/discovery/v2/venues?keyword=${searchVenueTerm}&apikey=${API_KEY}&countryCode=US&size=10`
    );
    if (
      !resp.data._embedded ||
      !resp.data._embedded.venues ||
      resp.data._embedded.venues.lenghth === 0
    ) {
      return res.render("venueNotFound", {
        searchVenueTerm,
        title: "No Results Found",
      });
    } else {
      const venues = resp.data._embedded.venues;

      return res.render("venueSearchResults", {
        searchVenueTerm,
        venues,
        title: "Venues Found",
      });
    }
  } catch (error) {
    return res.status(404).render("error", {
      message: error.message,
      statusCode: 404,
      title: "Error",
    });
  }
});

router.route("/venuedetails/:id").get(async (req, res) => {
  try {
    const id = req.params.id;
    const API_KEY = "zGUw8jzgzf5r0dikebnrqzk05jma6uuD";
    const resp = await axios.get(
      `https://app.ticketmaster.com/discovery/v2/venues/${id}.json?apikey=${API_KEY}`
    );
    const venue = resp.data;
    if (!venue) {
      return res.status(404).render("error", {
        message: "Venue not found",
        statusCode: 404,
        title: "Error",
      });
    } else {
      return res.render("venueByID", { venue, title: "Venue Details" });
    }
  } catch (error) {
    return res.status(404).render("error", {
      message: `A Venue with ID ${req.params.id} does not exist`,
      statusCode: 404,
      title: "Error",
    });
  }
});
export default router;
