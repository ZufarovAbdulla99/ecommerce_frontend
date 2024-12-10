import { useFetch } from "../utils/hooks/useFetch"
import Product from "./Product"


const API_URL = "https://fakestoreapi.com/products"
const Products = () => {
    const { data, isLoading, error } = useFetch(API_URL)
  return (
    
    <section className="py-20">
        {/* {console.log(data, error, isLoading)} */}
        <div className="container mx-auto">
          <h2 className="text-3xl font-semibold mb-10 text-center">Explore Our Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 lg:mx-8 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0">
            {isLoading ? (<p>Loading...</p>) : (data.map((product) => {
              return (
                <Product product={product} key={product.id}/>
                // <div key={product.id}>{product.title}</div>
              );
            })
            )}
          </div>
        </div>
      </section>
  )
}

export default Products