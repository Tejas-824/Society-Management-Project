import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './landingPage/Login';
import SignUp from './landingPage/SignUp';
import Dashboard from "./dashboard/pages/Dashboard";
import BillGeneration from './dashboard/components/BillGeneration';
import Complaint from './dashboard/components/Complaint';
import Notification from './dashboard/components/Notification';
import ElectricityBill from './dashboard/components/ElectricityBill';
import WaterBill from './dashboard/components/WaterBill';
import LatePayment from './dashboard/components/LatePayment';
import GuardSalary from './dashboard/components/GuardSalary';
import SweeperSalary from './dashboard/components/SweeperSalary';
import Maintenance from './dashboard/components/Maintenance';
import Repair from './dashboard/components/Repair';
import BuildingImprovements from './dashboard/components/BuildingImprovements';
import FundCollection from './dashboard/components/FundCollection';
import Payment from "./dashboard/components/Payment";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />

        <Route path="/electricity-bill" element={<ElectricityBill />} />
        <Route path="/water-bill" element={<WaterBill />} />
        <Route path="/bill-generation" element={<BillGeneration />} />
        <Route path="/complaints" element={<Complaint />} />
        <Route path="/notifications" element={<Notification />} />
        <Route path="/late-fines" element={<LatePayment />} />
        <Route path="/guard-salary" element={<GuardSalary />} />
        <Route path="/sweeper-salary" element={<SweeperSalary />} />
        <Route path="/maintenance" element={<Maintenance />} />
        <Route path="/repairs" element={<Repair />} />
        <Route path="/building-improvements" element={<BuildingImprovements />} />
        <Route path="/fund-collection" element={<FundCollection />} />
         <Route path="/online-payment" element={<Payment />} />
      </Routes>
    </Router>
  );
};

export default App;