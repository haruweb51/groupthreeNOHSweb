/* =====================================================================
   SITE CONFIG  -  THE MAIN FILE TO EDIT
   Change the text between the quotes "..." and save. Every page updates.
   Anything starting with [EDIT] is a placeholder: replace it with real
   information. Do not delete the commas or the quotation marks.
   ===================================================================== */
const SCHOOL_CONFIG = {
  name: "Negros Occidental High School",
  shortName: "NOHS",
  location: "Bacolod City, Philippines",
  established: "1902",

  /* Images: replace the files, or change the paths here */
  logo: "assets/images/school-logo.png",      // <-- YOUR LOGO (use a square PNG)
  background: "assets/images/school-background.jpg", // fixed, slightly blurred page background (set "" to turn off)
  banner: "assets/images/school-banner.jpg",  // big homepage background
  introImage: "assets/images/school-intro.jpg",

  /* Facebook button: change this ONE line */
  facebook: "https://www.facebook.com/nohsbacolod2002/",      // <-- PASTE YOUR FACEBOOK PAGE LINK

  /* Google Maps (needs internet). To change: Google Maps > Share > Embed a map
     > copy ONLY the link inside src="..." and paste it here. */
  googleMaps: "https://www.google.com/maps?q=Negros+Occidental+High+School,+Bacolod+City,+Philippines&output=embed",
  directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Negros+Occidental+High+School,+Bacolod+City,+Philippines",

  tagline: "Tatakprobinsya! Culture of Excellence.",
footerDescription: "Tatakprobinysa! Culture of Excellence",

  contact: {
    address: "Araneta Avenue / Araneta–Libertad (Barangay 39), Bacolod City, 6100 Negros Occidental, Philippines",
    phone: "(034) 433 9377",
    email: "nohsbacolod@yahoo.com",
    officeHours: "8:00am - 5:00pm"
  },

  about: {
    introduction: "Welcome to Negros Occidental High School, the proud home of excellence in the City of Smiles! Here, we nurture your talents, build lifelong friendships, and inspire you to reach your fullest potential. We are thrilled to have you join the NOHS family as you begin this exciting new chapter!",
    history: "Established on July 1, 1902, in Bacolod City as Instituto Rizal, Negros Occidental High School (NOHS) is the oldest public high school in the province. Founded with the help of Division Superintendent George W. Beattie and local leaders Antonio Ledesma Jayme and Melecio Severino, it opened with just three teachers and 125 students. In 1913, its name was Anglicized to Rizal Institute, and by 1931, classes moved into its permanent home along Araneta Street, which originally carried the inscription Bacolod High School. The school briefly became the Negros Occidental General Comprehensive High School in 1970, before alumni efforts successfully restored its proud name, Negros Occidental High School, in 1983. Today, NOHS stands as a historic pillar of secondary education in Negros Occidental.",
    background: "[Founded on July 1, 1902, Negros Occidental High School (NOHS) is the oldest public secondary school in Negros Occidental, located in Bacolod City. Originally established as Instituto Rizal, it has served for over a century as a cornerstone of provincial education, offering comprehensive Junior and Senior High School programs to Negrense youth.",
    vision: "A peak-performing divisional leader school strongly committed to nurturing a culture of excellence.",
    mission: "Protect and promote the right of every Filipino to quality, equitable, culture-based, and complete basic education.",
    goals: ["Character and Values Formation", "Staff Competency and Innovation", "Staff Competency and Innovation"],
    values: ["Maka-Diyos: Respecting faith, spiritual beliefs, and moral principles.", "Maka-tao: Showing empathy, respect for human rights, and care for others.", "Makakalikasan: Caring for and protecting the environment.", "Makabansa: Demonstrating love of country, civic duty, and national pride."],
    profile: [   // School profile table: add or remove rows
      { label: "School name", value: "Negros Occidental High School" },
      { label: "Location", value: "Bacolod City, Philippines" },
      { label: "Established", value: "1902" },
      { label: "School type", value: "public, secular secondary school" },
      { label: "Grade levels", value: "Grades 7 to 12 under the K–12 curriculum" },
      { label: "School ID", value: "302669" }
    ],
    /* Timeline: only 1902 is provided. Replace the other entries. */
    timeline: [
      { year: "1902", text: "The school was established." },
      { year: "1931", text: "Founding in 1902 as Instituto Rizal, its transfer to its permanent building in 1931, its wartime role during World War II, and the alumni campaign to restore its original name." },
      { year: "2002", text: "Marked its centennial year and received a Level II historical marker recognizing its heritage status." },
      { year: "Today", text: " Recognized as the oldest public secondary school in Negros Occidental." }
    ],
    historyPhotos: [
      { src: "assets/images/history/history-01.jpg", alt: "Historical photograph of the school (placeholder)", caption: "Taken by: Hbalairos on 21st September 2013, 02:22:09" },
      { src: "assets/images/history/history-02.jpg", alt: "Historical photograph of the school (placeholder)", caption: "Taken by: Hbalairos on 21st September 2013, 02:22:33" }
    ]
  },

  /* Homepage highlight cards */
  highlights: [
    { title: "School History", text: "Founded on July 1, 1902, as Instituto Rizal, Negros Occidental High School is the oldest public high school in the province and a historic pillar of academic excellence in Bacolod City.", link: "about.html" },
    { title: "Academic Programs", text: "Our academic programs help students build strong knowledge, practical skills, and good character for the next stage of their education.", link: "academics.html" },
    { title: "School Activities", text: "From vibrant Intramurals and cultural festivals to academic competitions and active student clubs, Negros Occidental High School offers a dynamic campus life that nurtures both leadership and school spirit.", link: "academics.html#development" },
    { title: "Student Community", text: "Check out our community through images!", link: "gallery.html" }
  ],

  academics: {
    overview: "Negros Occidental High School fosters a dynamic and competitive academic environment that balances rigorous scholarship with holistic student development. Offering specialized Junior High programs—such as Science, Technology, and Engineering (STE) and Special Program in the Arts (SPA)—alongside diverse Senior High School tracks, the institution equips its large, diverse student body with critical thinking skills, leadership values, and strong foundations for higher education and future careers.",
    /* Learning Environment: each card opens a viewer with 3 photos.
       Replace the files in assets/images/learning/ (same names) or change the paths.
       The first photo is the card's cover picture. */
    learning: [
      { title: "Classrooms", text: "NOHS classrooms",
        images: ["assets/images/learning/classrooms-01.jpg", "assets/images/learning/classrooms-02.jpg", "assets/images/learning/classrooms-03.jpg"] },
      { title: "School Facilities", text: "The School facilities",
        images: ["assets/images/learning/facilities-01.jpg", "assets/images/learning/facilities-02.jpg", "assets/images/learning/facilities-03.jpg"] },
      { title: "Learning Activities", text: "Learning activities",
        images: ["assets/images/learning/activities-01.jpg", "assets/images/learning/activities-02.jpg", "assets/images/learning/activities-03.jpg"] }
    ]
  },

  /* Featured video on the homepage */
  video: {
    src: "assets/videos/school-introduction.mp4",   // <-- DEFAULT VIDEO PATH
    title: "School Introduction Video",
    description: "A short video of NOHS."
  },

  creditsLine: "Website created by the NOHS website team."
};
