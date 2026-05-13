import { createRoot } from 'react-dom/client'
// Self-hosted fonts — eliminates Google Fonts external roundtrip (big LCP win)
import '@fontsource/space-grotesk/latin-400.css'
import '@fontsource/space-grotesk/latin-600.css'
import '@fontsource/space-grotesk/latin-700.css'
import '@fontsource/sora/latin-400.css'
import '@fontsource/sora/latin-600.css'
import '@fontsource/sora/latin-700.css'
import '@fontsource/sora/latin-800.css'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(<App />)
