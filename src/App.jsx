import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import store from './store';
import MainPage from './pages/MainPage';
import PokedexDetailsPage from './components/PokedexDetailsPage';
import LoadingPage from './pages//LodingPage';
import ErrorPage from './pages/ErrorPage';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/pokemon/:id" element={<PokedexDetailsPage />} />
          <Route path="/loading" element={<LoadingPage />} />
          <Route path="/error" element={<ErrorPage />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
