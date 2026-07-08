import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HeroesComponent from '../components/heroes/HeroesComponent';
import HeroeComponent from '../components/heroe/HeroeComponent';
import ErrorComponent from '../components/error/ErrorComponent';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HeroesComponent />} />
        <Route path="/heroes" element={<HeroesComponent />} />
        <Route path="/heroe/:id" element={<HeroeComponent />} />
        <Route path="*" element={<ErrorComponent />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
