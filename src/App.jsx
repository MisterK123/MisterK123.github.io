import React from 'react'
import Navbar from './sections/Navbar.jsx'
import Hero from './sections/Hero.jsx'
import Contact from './sections/Contact.jsx'
import Footer from './sections/Footer.jsx'
import About from './sections/About.jsx'
import WorkExperience from "./sections/WorkExperience.jsx";
import Achievements from "./sections/Achievements.jsx";
import Projects from "./sections/Projects.jsx";
import References from "./sections/References.jsx";
import Resources from "./sections/Resources.jsx";
const App = () => {
    return (
        <main className='max-w-7xl mx-auto'>
            <Navbar />
            <Hero />
            <About />

            <Projects />

            <Resources />
            <WorkExperience />
            <References />
            <Achievements />

            <Contact />
            <Footer />
        </main>
    )
}
export default App
