"use client";
import React, { useState } from "react";
import { Download, Edit2, File, Plus, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import DashboardImage from "@/rcomponents/dashboardImage";
import ModalButtonContent from "@/rcomponents/ModalButtonContent";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AudienceSlideForm from "@/rcomponents/AudienceSlideForm";
import { useFormContext } from "../app/contextAPi/FormContext";

import { readCSVFile, readXLSXFile } from "../utils/fileUtils";
import { Checkbox } from "@/components/ui/checkbox";

const AudienceForm = () => {
  const { state, dispatch } = useFormContext();
  const [selectedAudience, setSelectedAudience] = useState<number[]>([]);

  const handleButtonClick = () => {
    const fileInput = document.getElementById("fileInput");
    if (fileInput) {
      fileInput.click();
    } else {
      console.error('Element with ID "fileInput" not found');
    }
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        let data: any[] = [];
        if (file.type === "text/csv") {
          data = await readCSVFile(file);
        } else if (
          file.type ===
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
          file.type === "application/vnd.ms-excel"
        ) {
          data = await readXLSXFile(file);
        } else {
          alert("Unsupported file format");
          return;
        }

        dispatch({
          type: "AUDIENCE_DATA",
          payload: [...state.audienceDataCSV.csvData, ...data],
        });
      } catch (error) {
        console.error("Error reading file:", error);
      }
    }
  };

  const deleteSelectedElements = () => {
    const remainingElements = state.audienceDataCSV.csvData.filter(
      (item, index) => !selectedAudience.includes(index)
    );
    setSelectedAudience([]);
    dispatch({
      type: "AUDIENCE_DATA",
      payload: remainingElements,
    });
  };
  

  // const deleteAllElements = () => {
  //   setSelectedAudience([]);
  //   dispatch({
  //     type: "AUDIENCE_DATA",
  //     payload: [],
  //   });
  // };

  return (
    <>
      <input
        id="fileInput"
        type="file"
        className="hidden"
        onChange={handleFileUpload}
      />

      {state.audienceDataCSV.csvData.length > 0 ? (
        <>
          <div>
            <AudienceSlideForm>
              <Button variant="outline" className="ml-2">
                <Plus className="mr-2 h-4 w-4" /> Add
              </Button>
            </AudienceSlideForm>
            <Button
              variant="outline"
              className="ml-2"
              onClick={deleteSelectedElements}
            >
              <Trash className="mr-2 h-4 w-4" /> Remove Selected
            </Button>
            <Button
              variant="outline"
              className="ml-2"
              onClick={handleButtonClick}
            >
              <Download className="mr-2 h-4 w-4" /> Export
            </Button>
          </div>

          <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[30px]">
                  <Checkbox
                    name="checkdelete"
                    className="select-all"
                    onCheckedChange={(checkbox) => {
                      if (checkbox) {
                        setSelectedAudience(
                          Array.from(Array(state.audienceDataCSV.csvData.length).keys())
                        );
                      } else {
                        setSelectedAudience([]);
                      }
                    }}
                  />
                </TableHead>
                <TableHead className="w-[100px]">Email address</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">First name</TableHead>
                <TableHead className="text-center">Last name</TableHead>
                <TableHead className="text-center">Company</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {state.audienceDataCSV.csvData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="text-center w-[30px]">
                    <Checkbox
                      name="checkdelete"
                      onCheckedChange={(checkbox) => {
                        if (checkbox) {
                          setSelectedAudience((prev) => [...prev, index]);
                        } else {
                          setSelectedAudience((prev) =>
                            prev.filter((i) => i !== index)
                          );
                        }
                      }}
                      className="individual_dle_audience"
                      checked={selectedAudience.includes(index)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    {item?.primary_email}
                  </TableCell>
                  <TableCell className="text-center">Active</TableCell>
                  <TableCell className="text-center">
                    {item?.first_name}
                  </TableCell>
                  <TableCell className="text-center">
                    {item?.last_name}
                  </TableCell>
                  <TableCell className="text-center">
                    {item?.lead_display_name}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow></TableRow>
            </TableFooter>
          </Table>
        </>
      ) : (
        <>
          <div className="rounded-lg flex flex-col items-center justify-center text-center">
            <DashboardImage
              src={"/icons/audience.svg"}
              alt={"audience image"}
              iWidth={200}
              iHeight={200}
              iClass={"mb-4"}
            />

            <h3 className="text-sm font-bold tracking-tight">
              Add recipients to the campaign
            </h3>
            <p className="text-sm text-muted-foreground">
              Select recipients from your leads or manually, you can add more
              people later.
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="mt-4 bg-customOrange">
                  <Plus className="h-6 w-6" /> Add recipients to the campaign
                </Button>
              </              DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle className="text-center">
                    Add Recipients to the Campaign
                  </DialogTitle>
                </DialogHeader>

                <div className="grid grid-cols-2 gap-4 mt-7">
                  <div className="p-4">
                    <div className="w-full max-w-sm">
                      <div className="flex gap-2">
                        <div
                          className="flex flex-col items-center gap-2 cursor-pointer"
                          onClick={handleButtonClick}
                        >
                          <File className="h-10 w-10 text-blue-600 mb-3" />
                          <ModalButtonContent
                            heading="Upload a CSV"
                            text="Import leads with attributes"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* drawer from the right-hand side */}
                  <div className="p-4 flex justify-center items-center">
                    <AudienceSlideForm>
                      <div className="flex flex-col items-center gap-2 cursor-pointer">
                        <Edit2 className="h-10 w-10 text-blue-600" />
                        <ModalButtonContent
                          heading="Manually"
                          text="Create leads from a list of email addresses"
                        />
                      </div>
                    </AudienceSlideForm>
                  </div>
                </div>

                <p className="text-center mt-6 mb-4">
                  0 Contacts Imported in this campaign, 0 contacts skipped
                </p>
              </DialogContent>
            </Dialog>
          </div>
        </>
      )}
    </>
  );
};

export default AudienceForm;

