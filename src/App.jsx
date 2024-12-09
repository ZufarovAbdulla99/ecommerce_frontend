import { AArrowUp } from "lucide-react"
import {Header, Hero} from "./components"
import {CartContext} from "./contexts"
import { Route, Routes } from "react-router-dom"
import { Home, ProductDetails } from "./pages"

function App() {
  return <div className="bg-gray-300">
    <CartContext>
      <Header></Header>
      <Hero></Hero>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/products/:id" element={<ProductDetails />}></Route>
      </Routes>
    </CartContext>
  </div>
}

export default App