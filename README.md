# NOHS School Information Website
Negros Occidental High School, Bacolod City. Built with plain HTML, CSS and JavaScript. No installation needed.

**Placeholders:** every piece of text starting with `[EDIT]` is a placeholder. The logo and all photos are also placeholders until you replace them. No official statements were invented.

## 1. How to open the website
Unzip the folder, then double-click `index.html`. Or use a local server: open a terminal in the folder and run `python -m http.server 8000`, then visit `http://localhost:8000`.
Google Maps and the Facebook link need an internet connection. Everything else works offline.

## 2. Change the school logo
Replace `assets/images/school-logo.png` with your logo, keeping the same file name (a square PNG with a transparent background works best). Or change `logo` in `js/site-config.js`.

## 3. Replace gallery images
`js/data-gallery.js` lists 12 photos. They point to photos already on the site (`assets/images/history/`, `learning/` and `school-intro.jpg`). To use a different photo, change its `src` path (for example to a new file in `assets/images/gallery/`). Edit titles and captions in the same file. Keep exactly 12 entries so the grid stays even. Photos around 1200 x 900 px and under 500 KB load fastest.

## 4. Add or replace member photographs
Overwrite `assets/images/members/member-01.jpg` to `member-05.jpg`. Portrait photos (about 600 x 700 px) look best.

## 5. Edit member names and information
Open `js/data-members.js` and change the name, role, description and contribution of each person.

## 6. Change school information
Open `js/site-config.js`. Change the text inside the quotation marks: address, phone, email, office hours, introduction, history, vision, mission, goals, values, profile table, timeline and highlight cards. Save and refresh the browser.
Also edit: `js/data-activities.js` (activities) and `js/data-programs.js` (programs).

## 7. Add a video
Copy your video into `assets/videos/` and name it `school-introduction.mp4`, or change `video.src` in `js/site-config.js`. Change the title and description there too.
Visitors can also use "Upload a video" to play a file from their own device. This does not save the video to the website. Playback depends on the browser's codec support: MP4 (H.264 + AAC) works almost everywhere, WebM and OGG work in most browsers, and other formats may not play.

## 8. Change the Facebook link
In `js/site-config.js`, edit the one line `facebook: "..."`.

## 9. Change the Google Maps location
In Google Maps, find the place, click Share, then Embed a map, and copy only the link inside `src="..."`. Paste it into `googleMaps` in `js/site-config.js`. Update `directionsUrl` on the next line too.

## 10. Edit the website colors
Open `css/style.css` and change the values at the top, inside `:root { ... }`.

## 11. Add more academic programs
Add a picture to `assets/images/programs/`, then copy one `{ ... },` line in `js/data-programs.js`, paste it below and edit it.

## 12. Troubleshooting
- **Page is blank or unstyled:** keep the folder structure unchanged and open `index.html` from inside the unzipped folder, not from inside the zip.
- **Changes do not show:** save the file, then press Ctrl+F5 (Cmd+Shift+R on Mac).
- **A picture is missing:** check that the file name and capitalization match exactly, including `.jpg` versus `.png`.
- **Text disappeared or the page broke after editing:** you probably removed a quotation mark or comma in a `.js` file. Undo your last edit.
- **Map is empty:** check your internet connection and that the embed link is correct.
- **Video does not play:** convert it to MP4 (H.264). Check the file name and path.

## Files
`js/site-config.js` main settings | `js/data-*.js` gallery, members, programs, activities | `js/main.js` header, footer, rendering | `css/` styles.
