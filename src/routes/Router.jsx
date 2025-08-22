import { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HeroesComponent from '../components/heroes/HeroesComponent';
import HeroeComponent from '../components/heroe/HeroeComponent';
import ErrorComponent from '../components/error/ErrorComponent';

class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<HeroesComponent />} />
          <Route exact path="/heroes" element={<HeroesComponent />} />
          <Route exact path="/heroe/:id" element={<HeroeComponent />} />
          <Route component={ErrorComponent} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default Router;
