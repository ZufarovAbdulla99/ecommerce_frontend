// import { AArrowUp } from "lucide-react"
import {Header, Sidebar} from "./components"
import {CartContext} from "./contexts"
import { Route, Routes } from "react-router-dom"
import { Home, ProductDetails } from "./pages"
import { useState } from "react"

function App() {
  const [ sideBarOpen, setSideBarOpen ] = useState(false)
  
  const handleClose = () => {
    setSideBarOpen(false)
  }

  return <div className="bg-gray-300">
    <CartContext>
      <Header handleSideBarOpen={() => setSideBarOpen(true)}></Header>
      <Sidebar isOpen={sideBarOpen} handleClose={handleClose}></Sidebar>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/product/:id" element={<ProductDetails />}></Route>
      </Routes>
    </CartContext>
  </div>
}

export default App