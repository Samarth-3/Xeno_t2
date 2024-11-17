import { useEffect, useState } from "react";
import axios from "axios";

function PastCampaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/campaigns/past-campaigns`
        );
        setCampaigns(response.data);
      } catch (error) {
        setError("Failed to fetch campaigns.");
        console.error("Error fetching campaigns:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCampaigns();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Past Campaigns</h1>
      <ul>
        {campaigns.map((campaign) => (
          <li key={campaign._id}>
            <p>Audience: {campaign.audienceName}</p>
            <p>Created At: {new Date(campaign.createdAt).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}


export default PastCampaigns;
