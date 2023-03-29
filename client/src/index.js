import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import Footer from './components/Footer';
import Header from './components/Header';

const Main = () => (
  <>
    <Header />
    <App />
    <Footer />
  </>
);

ReactDOM.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
  document.getElementById('root')
);
