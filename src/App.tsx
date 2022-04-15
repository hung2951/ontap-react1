import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './page/HomePage'
import ProductPage from './page/ProductPage'
import ProductAdd from './page/ProductAdd'
import ProductEdit from './page/ProductEdit'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import { ProductType } from './page/ProductType'
function App() {
  const [products, setProducts] = useState<ProductType[]>([]);
  useEffect(() => {
    const getProduct = async () => {
      const { data } = await axios.get('http://localhost:8000/products')
      setProducts(data)
    }
    getProduct()
  }, [])
  const onHandleAdd = async (product: any) => {
    const { data } = await axios.post('http://localhost:8000/products', product)
    setProducts([...products, data])

  }
  const onhandleRemove = (id: number) => {
    axios.delete('http://localhost:8000/products/' + id);
    const confirm = window.confirm("bạn có muốn xóa không?");
    if (confirm) {
      setProducts(products.filter(item => item.id != id))
    }
  }
  const onhandleEdit = async (product: ProductType) => {
    const { data } = await axios.put('http://localhost:8000/products/' + product.id, product)
    setProducts(products.map(item => item.id === data.id ? product : item))
  }
  return (
    <div className="App">
      <Routes>
        <Route path='/'>
          <Route index element={<HomePage />} />
          <Route path='products'>
            <Route index element={<ProductPage onRemove={onhandleRemove} products={products} />} />
            <Route path='add' element={<ProductAdd onAdd={onHandleAdd} />} />
            <Route path='edit/:id' element={<ProductEdit onEdit={onhandleEdit} />} />
          </Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App
