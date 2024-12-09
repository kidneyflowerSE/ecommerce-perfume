import './App.css';
import CartPage from './pages/CartPage';
import HomePage from './pages/HomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InformationPage from './pages/InformationPage';
import ProductDetailPage from './pages/ProductDetailPage';
import SearchPage from './pages/SearchPage';
import Categories from './components/Categories';
import MenPage from './pages/Product/MenPage';
import WomenPage from './pages/Product/WomenPage';
import UnisexPage from './pages/Product/UnisexPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='/products/men' element={<MenPage />} />
        <Route path='/products/women' element={<WomenPage />} />
        <Route path='/products/unisex' element={<UnisexPage />} />
        <Route path='/products/:id' element={<ProductDetailPage />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/search' element={<SearchPage />} /> 
        <Route path='/information' element={<InformationPage />} /> 
      </Routes>
    </Router>
  );
}

export default App;
