import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import ThemeProvider from "./providers/ThemeProvider";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";
import "./styles/animations.css";

// Lazy load all page components
const HomeDashboard = lazy(() => import("./pages/HomeDashboard"));
const Products = lazy(() => import("./pages/Products"));
const AddProduct = lazy(() => import("./pages/AddProduct"));
const UpdateProduct = lazy(() => import("./pages/UpdateProduct"));
const DeleteProduct = lazy(() => import("./pages/DeleteProduct"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            <Route path="/" element={<HomeDashboard />} />
            <Route path="/productos" element={<Products />} />
            <Route path="/añadir-producto" element={<AddProduct />} />
            <Route path="/actualizar-producto" element={<UpdateProduct />} />
            <Route path="/eliminar-producto" element={<DeleteProduct />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;