/* WEBSITE MEMBERS - exactly 5 people.
   Photos: replace assets/images/members/member-01.jpg ... member-05.jpg (same names).
   Edit the name, role, description and contribution below. */
const WEBSITE_MEMBERS = [
  { photo: "assets/images/members/member-01.jpg", name: "Damien Christian Paul B. Ramos", role: "Project Coordinator", description: "", contribution: "Coordinated the team, Created the website." },
  { photo: "assets/images/members/member-02.jpg", name: "Arabella Villar Salvani", role: "Project Leader", description: "", contribution: "Leading the team, Designer, Reporter." },
  { photo: "assets/images/members/member-03.jpg", name: "Aldred Bryan T. Lopo", role: "Project Videographer", description: "", contribution: "Banner Model, Videographing." },
  { photo: "assets/images/members/member-04.jpg", name: "Michael I. Blancada", role: "Project Videographer", description: "", contribution: "Videographing, Photographing, Reporter." },
  { photo: "assets/images/members/member-05.jpg", name: "Monica R. Vargas", role: "Project Researcher", description: "", contribution: "Banner Model, Researching Information, Video Editing." }
];

/* GROUP PHOTOS - shown at the bottom of the Members page.
   The 3 photos slide automatically every 3 seconds; clicking opens them larger.
   Use ANY image type: .jpg .jpeg .png .webp .gif .avif .svg
   Put the files in assets/images/members/ and change the paths below to match.
   Photos are never stretched: small ones keep their size and a blurred copy fills the rest. */
const GROUP_PHOTO = {
  images: [
    "assets/images/members/group-photo-01.jpg",
    "assets/images/members/group-photo-02.jpg",
    "assets/images/members/group-photo-03.jpg"
  ],
  alt: "Group photo of the five website members",
  caption: "Website Members"
};
