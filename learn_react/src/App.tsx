import './App.css'
import { Routes, Route, Navigate } from "react-router-dom"
import Hero from "@/components/ui/Hero"
import { FAQ } from "@/components/ui/FAQ"
import Navbar from "@/components/ui/Navbar"
import Pricing from '@/components/ui/Pricing'
import About from '@/components/ui/About'
import Contact from '@/components/ui/Contact'
import Program from './components/ui/Program'

function App() {
  return (
    <main className="flex min-h-screen bg-slate-900 text-base-300 antialiased flex flex-col">
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/about" element={<About />} />
        <Route path="/program" element={<Program />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </main>
  )
}

export default App