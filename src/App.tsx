import HomeDashboard from "./pages/HomeDashboard";
import { BrowserRouter, Routes, Route } from "react-router";
import ThemeProvider from "./providers/ThemeProvider";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import UpdateProduct from "./pages/UpdateProduct";
import DeleteProduct from "./pages/DeleteProduct";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeDashboard />} />
          <Route path="/productos" element={<Products />} />
          <Route path="/añadir-producto" element={<AddProduct />} />
          <Route path="/actualizar-producto" element={<UpdateProduct />} />
          <Route path="/eliminar-producto" element={<DeleteProduct />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;