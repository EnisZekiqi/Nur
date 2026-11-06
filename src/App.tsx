
import './App.css'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import PrayerTimes from './components/PrayerTimes'
import Tasbih from './components/Tasbih'
import Duas from './components/Duas'
import Names from './components/Names'
import Quran from './components/Quran'
import Footer from './components/Footer'

function App() {

  return (
    <>
     <section className=''>
      <Navbar/>
      <HeroSection/>
      <PrayerTimes/>
      <Tasbih/>
      <Duas/>
      <Names/>
      <Quran/>
      <Footer/>
     </section>
    </>
  )
}

export default App
