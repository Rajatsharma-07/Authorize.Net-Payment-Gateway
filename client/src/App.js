import './App.css';
import PaymentForm from './components/PaymentForm';
import Recurring from './components/Recurring';
import UserList from './components/UserList';
/* import HomePage from './components/HomePage'; */
import UserInfo from './components/UserInfo';
import UserSubscription from './components/UserSubscription';
import SubscriptionPlan from './components/SubscriptionPlan';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className='App'>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserList />} />
          <Route path="user-info/:id" element={<UserInfo />} />  
          <Route path="user-subscription/:id" element={<UserSubscription />} />
          <Route path="subscription-plans/:id" element={<SubscriptionPlan />} />
          <Route path="payment" element={<PaymentForm />} />  
          <Route path="recurring/:id/:user" element={<Recurring />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
