import { BrowserRouter, Route, Routes } from "react-router"
import RootLayout from "./components/RootLayout"
import Home from "./pages/Home"

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
