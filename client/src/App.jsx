import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import EmployeeLogin from './components/EmployeeLogin';
import EmployeeDashboard from './components/EmployeeDashboard';
import RestaurantSearch from './components/RestaurantSearch';
import ReviewForm from './components/ReviewForm';
import Header from './components/Header';
import Footer from './components/Footer';
import TestComponent from './components/TestComponent'; // Add this import

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={EmployeeLogin} />
          <Route path="/dashboard" component={EmployeeDashboard} />
          <Route path="/search" component={TestComponent} /> {/* Change this line */}
          <Route path="/submit-review" component={ReviewForm} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
