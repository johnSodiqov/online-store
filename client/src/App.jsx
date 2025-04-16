import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import "./App.css"
import ProductList from './components/ProductList'

const fetchProducts = async () => {
  const { data } = await axios.get('/products')
  return data
}

function App() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  })

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <div className='container'>
      <h1 className='w-100'>Продукты</h1>
      <ProductList/>
    </div>
  )
}

export default App
