// import { useState, useEffect } from 'react'
import './App.css';
// import Form from './components/Form';
// import CampaignTable from './components/Table';


export interface Payout {
  id?: number;
  country: string;
  amount: number;
}

export interface Campaign {
  id?: number;
  title: string;
  landingPageUrl: string;
  isRunning: boolean;
  payouts: Payout[];
}

function App() {
  // const [items, setItems] = useState<Item[]>([]);
  // const [loading, setLoading] = useState<boolean>(true);
  // const [error, setError] = useState<string>('');

  // useEffect(() => {
  //   const fetchItems = async () => {
  //     try {
  //       const response = await fetch(`${import.meta.env.VITE_API_URL}/api/items/`);
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       const data = await response.json();
  //       setItems(data);
  //       setLoading(false);
  //     } catch (err) {
  //       setError('Failed to fetch items');
  //       setLoading(false);
  //     }
  //   };

  //   fetchItems();
  // }, []);

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>{error}</div>;

  return (
    <div className="fullscreen flex">
      {/* <CampaignTable /> */}
    </div>
  );
}

export default App;
