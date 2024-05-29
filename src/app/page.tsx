"use client";
import { Button } from "@/components/ui/button";
import DesktopSidebar from "@/DashboardComponents/DesktopSidebar";
import MobileSidebar from "@/DashboardComponents/MobileSidebar";
import { Search } from "lucide-react";
import CompaignMenuBar from "@/DashboardComponents/CompaignMenuBar";
import { useState } from "react";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import DashboardImage from "@/rcomponents/dashboardImage";
import CustomTable from "@/DashboardComponents/CustomTable";
import DashboardInput from "@/rcomponents/DashboardInput";
import { DateTime, IANAZone } from 'luxon';

interface CampaignData {
  id: number;
  active: boolean;
  title: string;
  campaign_timezone: string;
  triggered_by: string;
  days: string[];
  start_at: string;
  per_day_limit: number;
  maximum_limit: number;
  contact_pointer: number;
  template_pointer: number;
  followup_template_pointer: number;
  waiting_time: number;
  primary_reply_to: string;
  executing: boolean;
  last_execution_date: string;
}

export default function Home() {
  const [campaignsDataState, setCampaignsDataState] = useState<CampaignData[]>(
    []
  );
  const [searchCampaignsDataState, setSearchCampaignsDataState] = useState<
    CampaignData[]
  >([]);

  const [searchValue, setSearchValue] = useState("");

  const router = useRouter();
  const addCompaignPage = () => {
    router.push("/campaign/create");
  };
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        process.env.BACKEND_URL + "/api/v1/campaign",
        {
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const compaignData = await response.json();
      if (compaignData.data) {
        setCampaignsDataState(compaignData.data);
        setSearchCampaignsDataState(compaignData.data);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (event: any) => {
    setSearchValue(event.target.value);
    const fData = searchCampaignsDataState.filter((item) => {
      const title = item.title;
      const regex = new RegExp(event.target.value, "ig");
      return title.search(regex) !== -1;
    });
    setCampaignsDataState(fData);
  };

  const handleClickedFilter = (value: any) => {
    let fData: any = [];

    if (value === "all") {
        fData = searchCampaignsDataState;
    } else if (value === "paused") {
        fData = searchCampaignsDataState.filter(item => !item.active);
    } else if (value === "active") {
        fData = searchCampaignsDataState.filter(item => item.active);
    } else if (value === "planned") {
        fData = searchCampaignsDataState.filter(item => new Date(item.start_at) > new Date());
    }
    
    setCampaignsDataState(fData);
    
    
    
  };
  // console.log(campaignsDataState)

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <DesktopSidebar />
      <div className="flex flex-col">
        <MobileSidebar />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl flex-1">
              Campaign
            </h1>
            <Button className="mt-4 bg-customOrange" onClick={addCompaignPage}>
              {" "}
              <Plus className="h-6 w-6" /> Add Campaign
            </Button>
          </div>
          <div className="flex justify-between">
            <div className="">
              <CompaignMenuBar onStatusChange = {(status)=> handleClickedFilter(status)} />
            </div>
            <div>
              <form>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <DashboardInput
                    inputtype="search"
                    inputClass="w-full appearance-none bg-background pl-8 shadow-none"
                    inputValue={searchValue}
                    onChange={handleSearch}
                    inputPlaceHolder="Search Campaign..."
                  />
                </div>
              </form>
            </div>
          </div>

          {campaignsDataState.length > 0 ? (
            <CustomTable campaignsComponentData={campaignsDataState} />
          ) : (
            <div
              className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
              x-chunk="dashboard-02-chunk-1"
            >
              <div className="flex flex-col items-center gap-1 text-center">
                <DashboardImage
                  src="/icons/megamusic.svg"
                  alt="all campaign image icon"
                  iWidth={500}
                  iHeight={500}
                />
                <h3 className="text-sm font-bold tracking-tight">
                  Create Your First Campaign
                </h3>
                <p className="text-sm text-muted-foreground">
                  All your campaigns will apprear here.
                </p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
