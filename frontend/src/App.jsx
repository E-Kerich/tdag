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

          <Route path="email" element={<Email/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
