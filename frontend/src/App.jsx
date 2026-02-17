import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Leads from "./pages/admin/leads/Leads";
import Login from "./pages/admin/Login";
import ProtectedRoute from "./components/dashboard/ProtectedRoute";
import Home from "./pages/public/home/Home";
import PublicLayout from "./layouts/PublicLayout";
import Ai from "./pages/public/Ai";
import Contact from "./pages/public/Contact";
import Blogs from "./pages/admin/blogs/Blogs";
import BlogForm from "./pages/admin/blogs/BlogForm";
import Portfolio from "./pages/admin/portfolio/Portfolio";
import PortfolioForm from "./pages/admin/portfolio/PortfolioForm";
import Email from "./pages/admin/email/Email";
import BlogPage from "./pages/public/Blog";
import PortfolioPage from "./pages/public/Portfolio";
import Income from "./pages/admin/income/Income";
import BlogDetail from "./pages/public/BlogDetails";
import Webdesign from "./pages/public/Webdesign";
import AIDiscoveryForm from "./components/forms/AiForm";
import AIDiscoveryAdmin from "./pages/admin/ai/AIForBus";
import MyLibrary from "./pages/public/shop/Library";
import Products from "./pages/admin/shop/Product";
import ProductForm from "./pages/admin/shop/ProductForm";
import Shop from "./pages/public/shop/Shop";
import ProductDetail from "./pages/public/shop/ProductDetails";
import Checkout from "./pages/public/shop/Checkout";
import PaymentSuccess from "./pages/public/shop/PaymentSuccess";
import PrivacyPolicy from "./pages/public/Policy";
import TermsOfService from "./pages/public/Terms";
import DiscoveryDetail from "./pages/admin/ai/DiscovryDetails";
import WebDiscoveryList from "./pages/admin/ai/WebDiscovery";
import WebDiscovery from "./pages/public/Web";


function App() {
  return (
    <BrowserRouter>
      <Routes>

      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/ai-business" element={<Ai/>} />
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/blog" element={<BlogPage />}/>
        <Route path="/blog/:slug" element={<BlogDetail />}/>
        <Route path="/portfolio" element={<PortfolioPage/>}/>
        <Route path="/services/web-design" element={<Webdesign/>}/>
        <Route path="ai-discovery" element={<AIDiscoveryForm/>}/>
        <Route path="shop" element={<Shop />} />
        <Route path="shop/:slug" element={<ProductDetail />} />
        <Route path="my-library" element={<MyLibrary />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/checkout/payment-success" element={<PaymentSuccess />} />
        <Route path="/privacy" element={<PrivacyPolicy/>}/>
        <Route path="/terms" element={<TermsOfService/>}/>
        <Route path="/website-discovery" element={<WebDiscovery/>}/>
        
      
        

        
        
        

      
      </Route>
        <Route path="/admin/login" element={<Login />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="leads" element={<Leads />} />
          <Route path="blogs" element={<Blogs/>}/>
          <Route path="blogs/new" element={<BlogForm />} />
          <Route path="blogs/edit/:id" element={<BlogForm />} />

          <Route path="portfolio" element={<Portfolio />} />
          <Route path="portfolio/new" element={<PortfolioForm />} />
          <Route path="portfolio/edit/:id" element={<PortfolioForm />} />
          <Route path="income" element={<Income/>}/>
          <Route path="ai-discovery" element={<AIDiscoveryAdmin/>}/>
          <Route path="products" element={<Products/>}/>
          <Route path="shop/products/new" element={<ProductForm />} />
          <Route path="shop/products/edit/:id" element={<ProductForm />} />

          <Route path="email" element={<Email/>}/>
          <Route path="web-discovery" element={<WebDiscoveryList />} />
          <Route path="web-discovery/:id" element={<DiscoveryDetail />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
