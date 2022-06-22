import './App.css';
import { Home } from './pages/Home.page';
import { NotFound } from './pages/NotFound.page';
import { Layout } from './components/Layout.comp';
import './config/config';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Providers from './providers/Providers.comp';


function App() {

  return (
    <Providers>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Providers>
  );
}

export default App;
