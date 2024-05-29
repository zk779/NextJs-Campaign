"use client";
import { useState } from "react";
import CompaignBreadcrumb from '@/DashboardComponents/CompaignBreadcrumb';
import DesktopSidebar from '@/DashboardComponents/DesktopSidebar';
import MobileSidebar from '@/DashboardComponents/MobileSidebar';
import { Button } from '@/components/ui/button';
import React from 'react'
import { useRouter } from "next/navigation";
import SettingsForm from "@/DashboardComponents/SettingsForm";


const page = () => {
  const router = useRouter();
  const [next, setnext] = useState(100)

  const handlePrevious = ()=>{
    router.push(`/campaign/audience/${next}`)

  }
  const handleNext = () =>{
    router.push(`/campaign/review/${next}`)
  }
    
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
    <DesktopSidebar />
    <div className="flex flex-col">
      <MobileSidebar />
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <div className="flex items-center">
          <div className="flex-1 pr-7">
            <div className="flex w-full max-w-sm items-center space-x-2">
            
            </div>
          </div>
          <div className="flex items-center gap-4">
            {/* <CompaignBreadcrumb btitle={"Settings"}/> */}
            <Button className="bg-customOrange" onClick={handlePrevious}>Previous</Button>
            <Button className="bg-customOrange" onClick={handleNext}>Next</Button>
          </div>

          {/* <Button className="mt-4 bg-customOrange"> <Plus className="h-6 w-6"/> Add Compaign</Button> */}
        </div>

        <div
          className="rounded-lg"
          x-chunk="dashboard-02-chunk-1"
        >
          <SettingsForm/>
        </div>
      </main>
    </div>
  </div>
  )
}

export default page