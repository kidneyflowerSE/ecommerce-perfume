import './App.css';
import CartPage from './pages/CartPage';
import HomePage from './pages/HomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InformationPage from './pages/CheckoutPage';
import ProductDetailPage from './pages/ProductDetailPage';
import SearchPage from './pages/SearchPage';
import Categories from './components/Categories';
import MenPage from './pages/Product/MenPage';
import WomenPage from './pages/Product/WomenPage';
import UnisexPage from './pages/Product/UnisexPage';
import { CartProvider } from './context/CartContext';
import CheckOutPage from './pages/CheckoutPage';
import OrderPage from './pages/OrderPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ViewOrder from './pages/ViewOrder';

function App() {
  return (
    <CartProvider>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path='/products/men' element={<MenPage />} />
        <Route path='/products/women' element={<WomenPage />} />
        <Route path='/products/unisex' element={<UnisexPage />} />
        <Route path='/products/:id' element={<ProductDetailPage />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/search' element={<SearchPage />} /> 
        <Route path='/checkout' element={<CheckOutPage />} />
        <Route path='/vieworder' element={<ViewOrder />} />
        <Route path='/order' element={<OrderPage />} /> 
      </Routes>
    </Router>
    </CartProvider>
  );
}

export default App;
