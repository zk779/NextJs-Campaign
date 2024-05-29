import { Checkbox } from "@/components/ui/checkbox";
import React, { useState, ChangeEvent, FC, useEffect } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { uid } from "react-uid";

const weekDays = [
  {
    id: "monday",
    label: "Monday",
  },
  {
    id: "tuesday",
    label: "Tuesday",
  },
  {
    id: "wednesday",
    label: "Wednesday",
  },
  {
    id: "thursday",
    label: "Thursday",
  },
  {
    id: "friday",
    label: "Friday",
  },
  {
    id: "saturday",
    label: "Saturday",
  },
  {
    id: "sunday",
    label: "Sunday",
  },
] as const;

interface WeekDay {
  id: string;
  label: string;
}

const timeZones = {
  "Etc/GMT+0": "GMT+0",
  "Etc/GMT-0": "GMT-0",
  "Etc/GMT+1": "GMT+1",
  "Etc/GMT-1": "GMT-1",
  "Etc/GMT+2": "GMT+2",
  "Etc/GMT-2": "GMT-2",
  "Etc/GMT+3": "GMT+3",
  "Etc/GMT-3": "GMT-3",
  "Etc/GMT+4": "GMT+4",
  "Etc/GMT-4": "GMT-4",
  "Etc/GMT+5": "GMT+5",
  "Etc/GMT-5": "GMT-5",
  "Etc/GMT+6": "GMT+6",
  "Etc/GMT-6": "GMT-6",
  "Etc/GMT+7": "GMT+7",
  "Etc/GMT-7": "GMT-7",
  "Etc/GMT+8": "GMT+8",
  "Etc/GMT-8": "GMT-8",
  "Etc/GMT+9": "GMT+9",
  "Etc/GMT-9": "GMT-9",
  "Etc/GMT+10": "GMT+10",
  "Etc/GMT-10": "GMT-10",
  "Etc/GMT+11": "GMT+11",
  "Etc/GMT-11": "GMT-11",
  "Etc/GMT+12": "GMT+12",
  "Etc/GMT-12": "GMT-12",
};
const timeFormats = {
  "00:00": "12:00 am",
  "01:00": "1:00 am",
  "02:00": "2:00 am",
  "03:00": "3:00 am",
  "04:00": "4:00 am",
  "05:00": "5:00 am",
  "06:00": "6:00 am",
  "07:00": "7:00 am",
  "08:00": "8:00 am",
  "09:00": "9:00 am",
  "10:00": "10:00 am",
  "11:00": "11:00 am",
  "12:00": "12:00 pm",
  "13:00": "1:00 pm",
  "14:00": "2:00 pm",
  "15:00": "3:00 pm",
  "16:00": "4:00 pm",
  "17:00": "5:00 pm",
  "18:00": "6:00 pm",
  "19:00": "7:00 pm",
  "20:00": "8:00 pm",
  "21:00": "9:00 pm",
  "22:00": "10:00 pm",
  "23:00": "11:00 pm",
};

type DateChangeHandler = (name: string , value: any) => void;

interface SettingsParams {
  onChangeInput: (event: ChangeEvent<HTMLInputElement>) => void;
  inputData:any;
  updateCampaignData: DateChangeHandler,
}

const SettingsForm : FC<SettingsParams> = ({onChangeInput, inputData, updateCampaignData}) => {
  const [date, setDate] = React.useState<Date>();
  const [weekDaysArray, setWeekdaysArray] = useState(weekDays);
  const [time, setTime] = useState("")
  
  const handleSelectChange = (value: string) => {
    setTime(value)
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChangeInput(event);
  };

  const handletimezoneChange = (value: string)=>{
    updateCampaignData("campaign_timezone", value);
  }

  React.useEffect(() => {
    if (date && time) { // Ensure date is not undefined
      const originalDate = new Date(date);
      const sTime = time.split(':');
      originalDate.setHours(Number(sTime[0]));
      originalDate.setMinutes(Number(sTime[1]));
      originalDate.setSeconds(0);

      const iso8601DateTime = originalDate.toISOString();
      updateCampaignData("start_at", iso8601DateTime);
      
    }
  }, [date, time]); 

  useEffect(() => {
    if (inputData.start_at) {
    
      const campaignDate = new Date(inputData.start_at);
      const formattedDate = format(campaignDate, "EEE MMM dd yyyy HH:mm:ss'");
      const formattedTime = format(campaignDate, "hh:mm:ss aa");

       setTime(formattedTime)
       setDate(campaignDate)
       console.log(campaignDate)
    }
  }, [])

  // console.log(date)
  



  return (
    <>
      <h2 className="text-sm font-semibold">
        Sending window for this compaign
      </h2>
      <p className="text-slate-400 text-sm">
        With your current settings, your compaign will start{" "}
      </p>
      <div className="flex gap-2 mt-4">
        {weekDaysArray.map((item, index) => (
          <>
            <div
              key={uid(index)}
              className="p-3 flex items-center rounded-custom border-lightgray border-1"
            >
              <input
                type="checkbox"
                id={item.id}
                name="days"
                value={item.label}
                className="checked:bg-red-500 checked:border-transparent"
                onChange={handleChange}
                checked = {inputData.days.includes(item.label) ? true : false }
              />
              <label
                htmlFor={item.id}
                className="text-sm ml-3 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {item.label}
              </label>
            </div>
          </>
        ))}
      </div>
      <div className="sle-time mt-3">
        <Select onValueChange={handleSelectChange} name="time">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={time ? time : "12:00 am"} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Time</SelectLabel>
              {Object.entries(timeFormats).map(([key, value]) => (
                <SelectItem value={key}>{value}</SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="sle-time mt-3">
        <Label>Select Timezone from the list below</Label>
        <Select onValueChange={handletimezoneChange} name= "timezone">
          <SelectTrigger className="w-2/3">
            <SelectValue placeholder={inputData.campaign_timezone ? inputData.campaign_timezone : "please select a timezone"} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Time zones</SelectLabel>
              {Object.entries(timeZones).map(([key, value]) => (
                <SelectItem value={key}>{value}</SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="sle-date mt-4">
        <h2 className="text-sm font-semibold">
          Start the compaign on a specific day
        </h2>
        <p className="text-slate-400 text-sm">
          you can schedule the launch of your compaign for a future date
        </p>
        <div className="date-popover mt-6">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[280px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Start on</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      
    </>
  );
};

export default SettingsForm;
