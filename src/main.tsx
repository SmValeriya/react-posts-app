import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import App from './App.tsx'
import About from './About.tsx'
import Post from './Post.tsx'
import Navigation from './Navigation.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Navigation></Navigation>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<About />} />
        <Route path="posts/:postId" element={<Post />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
