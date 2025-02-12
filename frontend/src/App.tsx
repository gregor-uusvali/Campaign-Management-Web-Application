import './App.css';
import { Tabs } from '@mantine/core';
import TableComponent from './components/Table';
import FormComponent from './components/Form';
import { useState } from 'react';

export const apiUrl = "http://localhost:8000/api";

export interface Payout {
  id?: number;
  country: string;
  payout: number;
}

export interface Campaign {
  id?: number;
  title: string;
  landing_page_url: string;
  is_running: boolean;
  payouts: Payout[];
}

const App = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  const handleCampaignCreated = (newCampaign: Campaign) => {
    setCampaigns(prevCampaigns => [...prevCampaigns, newCampaign]);
  };

  return (
    <Tabs color="teal" defaultValue="campaign" className="tab">
      <Tabs.List>
        <Tabs.Tab value="campaign" className="tab-btn">Campaigns</Tabs.Tab>
        <Tabs.Tab value="addCampaing" className="tab-btn">New campaign</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="campaign" pt="xs">
        <TableComponent campaigns={campaigns} setCampaigns={setCampaigns} />
      </Tabs.Panel>

      <Tabs.Panel className="card-pannel" value="addCampaing" pt="xs">
        <FormComponent onCampaignCreated={handleCampaignCreated}/>
      </Tabs.Panel>
    </Tabs>
  );
}

export default App;