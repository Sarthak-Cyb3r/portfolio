# Items Requiring User Input (TODO.md)

The following items can only be provided or verified by Sarthak:

## 1. Domain & Deployment Configuration
- [ ] **Custom Domain**: Update `SITE_URL` in [`src/data/site.ts`](file:///home/sarthak/Desktop/Projects/portfolio/src/data/site.ts) once your final production domain is configured (currently defaulted to `https://sarthak-cyb3r.vercel.app`).
- [ ] **Vercel Analytics**: If desired, enable `@vercel/analytics` or privacy-friendly analytics token in your Vercel project dashboard.

## 2. Contact Information
- [ ] **Final Contact Email**: Confirm if [`lakh125yu@gmail.com`](file:///home/sarthak/Desktop/Projects/portfolio/src/data/site.ts) is your permanent professional contact email or if you prefer a domain email (e.g., `contact@yourdomain.com`). All email references are centralized in the `EMAIL` constant in [`src/data/site.ts`](file:///home/sarthak/Desktop/Projects/portfolio/src/data/site.ts).

## 3. Product Media & Assets
- [ ] **Hero Video Demo (Optional)**: A short 10–15s silent loop recording of Softify in action on Android/iOS (currently displaying the crisp device-framed screenshot [`/projects/softify/01_homepage.png`](file:///home/sarthak/Desktop/Projects/portfolio/public/projects/softify/01_homepage.png)).
- [ ] **StudyStack Live Host**: If StudyStack is deployed to a live VPS/Docker instance in the future, add the live production URL to [`src/data/projects.ts`](file:///home/sarthak/Desktop/Projects/portfolio/src/data/projects.ts).
- [ ] **Accounty Public Repo & Assets**: Once Accounty's repository and user interface designs are published, add them to [`src/data/projects.ts`](file:///home/sarthak/Desktop/Projects/portfolio/src/data/projects.ts).

## 4. Distribution & Releases
- [ ] **iOS TestFlight Link**: If you enroll in the Apple Developer Program and publish Softify or Ludo to TestFlight, replace the sideload instructions with the official public TestFlight invite URL.
- [ ] **Linux .deb Package for Softify**: Softify currently distributes Linux via tarball (`Softify-Linux-x64.tar.gz`) and an automated `install.sh` script; build a native `.deb` package if Debian packaging is desired.
- [ ] **Ludo Real-time Room Counter**: If you wish to display live rooms created on the proof strip, add a lightweight Firebase Cloud Function or Firestore aggregator counter.
