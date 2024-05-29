// app/campaign/edit/[id].tsx
"use client";

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";  // Assuming you have an Input component
import { CampaignData } from "@/types";  // Import your CampaignData type

const EditCampaignPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [campaign, setCampaign] = useState<CampaignData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchCampaign = async () => {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/campaign/${id}`,
          {
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const campaignData = await response.json();
        setCampaign(campaignData);
        setLoading(false);
      };
      fetchCampaign();
    }
  }, [id]);

  const handleSave = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/campaign/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(campaign),
      }
    );
    if (response.ok) {
      router.push('/');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Edit Campaign</h1>
      <form>
        <label>Title</label>
        <Input
          type="text"
          value={campaign?.title || ''}
          onChange={(e) => setCampaign({ ...campaign, title: e.target.value } as CampaignData)}
        />
        {/* Add other fields similarly */}
        <Button onClick={handleSave}>Save</Button>
      </form>
    </div>
  );
};

export default EditCampaignPage;
