import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'
import Home from './components/Home'
import NavBar from './components/NavBar'
import Search from './components/Search'
import Watch from './components/Watch'

function App() {
  return (
    <div className='h-screen overflow-auto'
      style={{
        backgroundColor: '#0f0f0f',
        color: 'white'
      }}>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/watch/:id" element={<Watch />} />
          <Route path="/search" element={<Search/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
