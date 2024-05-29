import React, { useContext } from "react";
import DashboardInput from "./DashboardInput";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Edit2 } from "lucide-react";
import ModalButtonContent from "./ModalButtonContent";
import SleInput from "./SleInput";
import { Button } from "@/components/ui/button";
import { FormContext, useFormContext } from '../app/contextAPi/FormContext';

interface MyComponentProps {
  children: React.ReactNode;
}

const AudienceSlideForm: React.FC<MyComponentProps> = ({children}) => {
  const context = useContext(FormContext);
  const { state, dispatch } = useFormContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch({ type: 'SET_AUDIENCE_FORM', payload: { [name]: value } });
  }
  const handleSubmit = () =>{
    dispatch({ type: 'AUDIENCE_DATA', payload: [...state.audienceDataCSV.csvData, state.AudienceForm]});
  }
  
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          {children}
        </SheetTrigger>
        <SheetContent className="sm:max-w-[700px]">
          <SheetHeader>
            <SheetTitle>Edit profile</SheetTitle>
            <SheetDescription>
              Make changes to your profile here. Click save when you're done.
            </SheetDescription>
          </SheetHeader>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <DashboardInput
                labelName="Email address (required)"
                inputClass={"mt-2"}
                inputName="primary_email"
                onChange={handleChange}
                inputValue={state.AudienceForm.primary_email}
              />
            </div>
            <div>
              <SleInput
                labelName="List"
                selectPlace="Select from the list"
                options={[
                  {
                    text: "Bravo Leads",
                    value: "bravoleads",
                  },
                ]} handleSelectChange={function (value: string, name: string): void {
                  throw new Error("Function not implemented.");
                } }              />
            </div>
            <div>
              <DashboardInput
                labelName="Firstname"
                inputClass={"mt-2"}
                inputName="first_name"
                inputValue={state.AudienceForm.first_name}
                onChange={handleChange}
              />
            </div>
            <div>
              <DashboardInput
                labelName="Lastname"
                inputClass={"mt-2"}
                inputName="last_name"
                inputValue={state.AudienceForm.last_name}
                onChange={handleChange}
              />
            </div>
            <div>
              <DashboardInput
                labelName="Position"
                inputClass={"mt-2"}
                inputName="title"
                inputValue={state.AudienceForm.title}
                onChange={handleChange}
              />
            </div>
            <div>
              <DashboardInput
                labelName="Phone number"
                inputClass={"mt-2"}
                inputName="phonenumber"
                inputValue={state.AudienceForm.phonenumber}
                onChange={handleChange}
              />
            </div>
            <div>
              <DashboardInput
                labelName="linkedin profile"
                inputClass={"mt-2"}
                inputName="linkedin_profile"
                inputValue={state.AudienceForm.linkedin_profile}
                onChange={handleChange}
              />
            </div>
            <div>
              <DashboardInput
                labelName="Twitter Handle"
                inputClass={"mt-2"}
                inputName="twitterhandle"
                inputValue={state.AudienceForm.twitterhandle}
                onChange={handleChange}
              />
            </div>
            <div>
              <DashboardInput
                labelName="Name"
                inputClass={"mt-2"}
                inputName="lead_display_name"
                inputValue={state.AudienceForm.lead_display_name}
                onChange={handleChange}
              />
            </div>
            <div>
              <DashboardInput
                labelName="Website"
                inputClass={"mt-2"}
                inputName="lead_url"
                inputValue={state.AudienceForm.lead_url}
                onChange={handleChange}
              />
            </div>
            <div>
              <DashboardInput
                labelName="Industry"
                inputClass={"mt-2"}
                inputName="lead_custom_company_industry"
                inputValue={state.AudienceForm.lead_custom_company_industry}
                onChange={handleChange}
              />
            </div>
            <div>
              <DashboardInput
                labelName="Country"
                inputClass={"mt-2"}
                inputName="lead_custom_company_country"
                inputValue={state.AudienceForm.lead_custom_company_country}
                onChange={handleChange}
              />
            </div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button className="bg-customOrange mt-2" onClick={handleSubmit}>
                Update
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default AudienceSlideForm;
