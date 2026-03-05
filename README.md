# sish-portfolio

React + Vite portfolio site.

## Setup

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Structure

```
src/
  App.jsx               # Root — routing, particles, loader
  main.jsx              # Entry point
  index.css             # All global styles + CSS vars
  components/
    Nav.jsx             # Navbar + hamburger mobile menu
    Loader.jsx          # Scramble text intro loader
  hooks/
    useParticles.js     # Canvas star particle animation
    useReveal.js        # IntersectionObserver scroll reveals
  data/
    nav.js              # Nav links + systems page set
  pages/
    HomePage.jsx        # Hero, about, stats, featured cards
    SystemsPage.jsx     # All systems cards overview
    MikamiPage.jsx      # Mikami case study
    ProjectPages.jsx    # AutoBets, Dork Generator, Dorky-Dorker
    EngineeringPage.jsx # Accordion eng notes + constraints
    FailuresPage.jsx    # Failure modes table
    NotesPage.jsx       # Sidebar notes viewer
    ContactPage.jsx     # Contact links + availability card
```
