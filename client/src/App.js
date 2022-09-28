import './App.css';
import PaymentForm from './components/PaymentForm';
import Recurring from './components/Recurring';
import UserList from './components/UserList';
import UserInfo from './components/UserInfo';
import SubscriptionPlan from './components/SubscriptionPlan';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddPatient from './components/AddPatient';

function App() {
  return (
    <div className='App'>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserList />} />
          <Route path="user-info/:id" element={<UserInfo />} />  
          <Route path="subscription-plans/:id" element={<SubscriptionPlan />} />
          <Route path="recurring/:id/:user" element={<Recurring />} />
          <Route path="payment/:id" element={<PaymentForm />} />  
          <Route path="add-patients" element={<AddPatient />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
