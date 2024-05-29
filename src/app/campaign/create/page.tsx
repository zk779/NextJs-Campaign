"use client";
import CompaignBreadcrumb from "@/DashboardComponents/CompaignBreadcrumb";
import DesktopSidebar from "@/DashboardComponents/DesktopSidebar";
import MobileSidebar from "@/DashboardComponents/MobileSidebar";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ContentForm from "@/DashboardComponents/ContentForm";
import { useRouter } from "next/navigation";
import AudienceForm from "@/DashboardComponents/AudienceForm";
import SettingsForm from "@/DashboardComponents/SettingsForm";
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useFormContext } from "@/app/contextAPi/FormContext";

interface CampaignTypeFormData {
  title: string;
  campaign_timezone: string;
  days: string[]; // Change the type of days to string[]
  start_at: string;
  primary_reply_to: string;
  active: boolean;
}

interface audienceFormDataType {
  email: string;
  list: string;
  firstname: string;
  lastname: string;
  position: string;
  phonenumber: string;
  linkedinProfile: string;
  twitterhandle: string;
  companyname: string;
  companyWebsite: string;
  industry: string;
  companycountry: string;
}

const page = () => {
  const [activeForm, setActiveForm] = useState(1);
  const { state, dispatch } = useFormContext();

  const { toast } = useToast();
  const [campaignFormData, setCampaignFormData] =
    useState<CampaignTypeFormData>({
      title: "",
      campaign_timezone: "",
      days: [],
      start_at: "",
      primary_reply_to: state.replyEmail.email,
      active: false,
    });

  const [audienceInput, setAudienceInput] = useState<audienceFormDataType>({
    email: "",
    list: "",
    firstname: "",
    lastname: "",
    position: "",
    phonenumber: "",
    linkedinProfile: "",
    twitterhandle: "",
    companyname: "",
    companyWebsite: "",
    industry: "",
    companycountry: "",
  });

  const handlenext = () => {
    activeForm !== 4 && setActiveForm((previous) => previous + 1);

    // router.push(`/campaign/audience/${next}`)
  };

  const handlePrevious = () => {
    activeForm !== 1 && setActiveForm((previous) => previous - 1);

    // router.push(`/campaign/audience/${next}`)
  };
  const handleForm = (event: any) => {
    if (event.target.name === "days") {
      const campaignDays = [...campaignFormData.days];
      const targetvalue = event.target.value;
      campaignDays.includes(targetvalue)
        ? campaignDays.splice(campaignDays.indexOf(targetvalue), 1)
        : campaignDays.push(targetvalue);

      setCampaignFormData({
        ...campaignFormData,
        days: [...campaignDays],
      });
    } else {
      setCampaignFormData({
        ...campaignFormData,
        [event.target.name]: event.target.value,
      });
    }
  };

  const updateCampaignData = (name: any, value: any) => {
    setCampaignFormData({ ...campaignFormData, [name]: value });
  };

  // validation form data

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateArrayNotEmpty = (array: any) => {
    return array.length > 0;
  };

  const validateActive = (value: boolean) => {
    return typeof value === "boolean";
  };

  const showToast = () => {
    toast({
      title: "Uh oh! Something went wrong.",
      description: "There was a problem with your request.",
    });
  };

  const validationData = () => {
    Object.entries(campaignFormData).map(([key, value]) => {
      if (Array.isArray(value)) {
        value.length === 0 && showToast();
      }
    });
  };

  // end form validation

  const handleSubmit = () => {
    // showToast()
    // validationData();
    // return;
    fetch(process.env.BACKEND_URL + "/api/v1/campaign", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(campaignFormData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parse the JSON response
      })
      .then((data) => {
        console.log("POST request successful:", data);
        // Do something with the response data
      })
      .catch((error) => {
        console.error("There was a problem with the POST request:", error);
      });
  };

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <DesktopSidebar />
      <div className="flex flex-col">
        <MobileSidebar />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <div className="flex items-center">
            <div className="flex-1 pr-7">
              <div className="flex w-full max-w-sm items-center space-x-2">
                <Input
                  type="text"
                  placeholder="Compaign name"
                  name="title"
                  value={campaignFormData.title}
                  onChange={handleForm}
                />
                <Button className="bg-customOrange">Update</Button>
                <Button variant="secondary">Cancel</Button>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <CompaignBreadcrumb activePage={activeForm} />
              {(activeForm !== 1 && activeForm !== 4)  && (
                <Button variant="secondary" onClick={handlePrevious}>
                  Previous
                </Button>
              )}
              {activeForm !== 4 && (
                <Button className="bg-customOrange" onClick={handlenext}>
                  Next
                </Button>
              )}
              {activeForm === 4 && (
                <Button className="bg-customOrange">
                  Launch
                </Button>
              )}
            </div>

            {/* <Button className="mt-4 bg-customOrange"> <Plus className="h-6 w-6"/> Add Compaign</Button> */}
          </div>

          {activeForm === 1 && (
            <div className="rounded-lg flex justify-center">
              <ContentForm />
            </div>
          )}
          {activeForm === 2 && <AudienceForm />}
          {activeForm === 3 && (
            <div className="rounded-lg">
              <SettingsForm
                onChangeInput={handleForm}
                inputData={campaignFormData}
                updateCampaignData={updateCampaignData}
              />
              <Button className="bg-customOrange mt-4" onClick={handleSubmit}>
                Save Schedule
              </Button>
            </div>
          )}
          {activeForm === 4 && (
            <Card className="w-[500px]">
              <CardHeader>
                <CardTitle>{state.replyEmail.email}</CardTitle>

                <CardDescription>
                  {state.EmailVariantForm.emailVariant.length > 0 &&
                    state.EmailVariantForm.emailVariant[0].subject}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  {state.EmailVariantForm.emailVariant.length > 0 &&
                    state.EmailVariantForm.emailVariant[0].content}
                </p>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
};

export default page;
