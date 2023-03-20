import { Router } from "express";
const router = Router();
router.route("/aboutme").get(async (req, res) => {
  try {
    const aboutMeData = {
      firstName: "Maheshwarswami",
      lastName: "Hiremath",
      biography:
        "Being from Mechanical engineering Bachelor's background, the most challenging thing I have done is to shift my focus towards software field.\nNot only I completed training in different programming languages and software engineering practices, \nI worked in the industry for 4 years including on-site allocation for half year in Amsterdam. \nThen even more challenging thing I have ever done is quitting everything to pursue my dream- \nMasters in Computer Science in USA. As of now my gpa is 3.9/4.0. \nI learnt its not easy to adapt method of education and getting employment in USA but I believe in myself and try harder until I get succeeded.\n",
      favoriteMovies: [
        "2001: A Space Odyssey",
        "Star Wars",
        "X-Men",
        "Good Will Hunting",
      ],
      hobbies: ["Travel", "Biking", "Swimming"],
      fondestMemory: " Playing with my Cats ",
    };
    return res.json(aboutMeData);
  } catch (error) {
    res.status(404).json(error);
  }
});
router.route("/mystory").get(async (req, res) => {
  try {
    const myStoryData = {
      storyTitle: "Knock at the Cabin",
      storyGenre: "Psychological Horror",
      story:
        "While vacationing at a remote cabin in the woods, \na young girl and her parents are taken hostage by four armed strangers \nwho demand they make an unthinkable choice to avert the apocalypse. \nConfused, scared and with limited access to the outside world, \nthe family must decide what they believe before all is lost. \n",
    };
    return res.json(myStoryData);
  } catch (error) {
    res.status(404).json(error);
  }
});
router.route("/educationhistory").get(async (req, res) => {
  try {
    const eduHistoryData = [
      {
        schoolName: "Alva's Moodabidri",
        degreeEarned: "H.S. Diploma",
        numberOfYearsAttended: 2,
        favoriteClasses: ["Physics", "Chemistry", "Mathematics", "Biology"],
        favoriteSchoolMemory:
          "Used to wake up and study at 4:45 AM daily for two years",
      },
      {
        schoolName: "B V Bhoomaraddi College of Engg & Tech.",
        degreeEarned: "Bachelor of Science in Mechanical Engineering",
        numberOfYearsAttended: 4,
        favoriteClasses: [
          "Heat & Mass Transfer",
          "Strength of Materials",
          "Thermodynamics",
          "Multivariate Calculus",
        ],
        favoriteSchoolMemory: "Used to party till 5 AM",
      },
      {
        schoolName: "Stevens Institute of Technology",
        degreeEarned: "Master of Science in Computer Science",
        numberOfYearsAttended: 2,
        favoriteClasses: [
          "Web Programming",
          "Agile Methods",
          "Mathematical foundations of Machine Learning",
          "CyberSecurity",
        ],
        favoriteSchoolMemory: "THE VIEW of NEW YORK CITY !!!!!",
      },
    ];
    return res.json(eduHistoryData);
  } catch (error) {
    res.status(404).json(error);
  }
});
export default router;
