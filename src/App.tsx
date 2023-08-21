import {
  Route,
  Routes

} from "react-router-dom";
import Header from "./components/Header";
import Registration from "./components/Registration";
import Login from "./components/Login";
import DonationConfirmed from "./components/DonationConfirmed"
import Home from "./components/Home";
import CampaignList from "./components/campaignList";
import Campaigndetail from "./components/campaigndetail";
import CampaignDashboard from "./components/CampaignDashboard";



function App() {

  return (
    <Routes>
      <Route path="/" element={< Header />}>
        <Route index element={< Home />} />
        <Route path="/register" element={< Registration />} />
        <Route path="/login" element={< Login />} />
        <Route path="/donation-confirmed" element={<DonationConfirmed />} />
        <Route path="/campaign-list" element={<CampaignList />} />
        <Route path="/campaign_detail" element={<Campaigndetail />} />
        <Route path="/campaign_dashboard" element={<CampaignDashboard />} />

      </Route>
    </Routes>
  )
}

export default App
