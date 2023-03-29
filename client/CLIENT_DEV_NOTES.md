# Client-Side Dev Notes

From: @jrcharney

Date: March 24, 2023

Hey guys. Just wanted to let you know that I tried to match up as much as Manav's Project 3 template as possible, but there are some slight differences.  I wanted to keep track of those things.

- **VITE!** Vite is faster than CRA and pairs nicely with Vitest.
- **Vitest is available for software testing.** It seemed to make sense to add this. Maybe because I'm still kind of a software-testing geek.  If we were using CRA, I probably would have installed Jest.
- **Tailwind Suport** - What better way to wrap this up that to use tailwinds.
- **No `lodash`.** While you can add lodash if you want to, like babel, most of its purpose has been integrated into the current version of JavaScript.  There also hasn't been any development of `lodash` since 2021.
- **No `browserslist` in `package.json`.** I'm not sure where that came from. It likely has no value in our project anyway.

Finally a short list of things I would like to see.

- **Compose a list of the commands we would need to use to set up this sort of environment.** It will likely involve going through some of the command history and writing a shell script as well as setting up what packages the `package.json` file should have.
- **[Vite PWA](https://vite-pwa-org.netlify.app/).**
- **Mobile Application**
- **[React Leaflet](https://react-leaflet.js.org/)**, two fold reasons:
  1. MongoDB has Geospatial types
  2. Eventually making an app with map stuff

Be sure to branch here before starting. I probably should have structured things to have all the client-side stuff in one branch and server-side stuff in the other, but this should still be fine. I would recommend trying to have client-side stuff be developed in one branch and server-side stuff on another and then merging them together later.

Next up is the server side of this stack.

Good luck!
