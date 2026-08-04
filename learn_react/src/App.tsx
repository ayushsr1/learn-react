import './App.css'
import { Routes, Route, Navigate } from "react-router-dom"
import Hero from "@/components/ui/Hero"
import About_Marina from "@/components/ui/About-Marina"
import { FAQ } from "@/components/ui/FAQ"
import Navbar from "@/components/ui/Navbar"
import Program from "@/components/ui/Program"

function App() {
  return (
    <main className="flex min-h-screen bg-slate-900 text-base-300 antialiased flex flex-col">
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/about" element={<About_Marina />} />
        <Route path="/program" element={<Program />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </main>
  )
}

export default App