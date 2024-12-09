import { useParams } from "react-router-dom"

const ProductDetails = () => {
    const { id } = useParams()

  return (
    <div>Product Details: id-{id}</div>
  )
}

export default ProductDetails