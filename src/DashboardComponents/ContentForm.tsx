import { useState, useContext } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import SentEmailForm from "./SentEmailForm";

import { X, PlusCircle, Edit2 } from "lucide-react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { File } from "lucide-react";
import ModalButtonContent from "@/rcomponents/ModalButtonContent";
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
import DashboardInput from "@/rcomponents/DashboardInput";
import { useFormContext } from "../app/contextAPi/FormContext";
import FollowUpEmailForm from "./FollowUpEmailForm";
import { v4 as uuidv4 } from "uuid";
import { readCSVFile, readXLSXFile } from "@/utils/fileUtils";
import { Input } from "@/components/ui/input";

interface InputObject {
  [key: string]: any;
}

const ContentForm = () => {
  const [addEmailSentForm, setAddEmailSentForm] = useState(1);
  const [connectedAccount, setConnectedAccount] = useState<InputObject[]>([]);
  const [showReplyEmailInput, setShowReplyEmailInput] =
    useState<boolean>(false);
  const [hideAlert, setHideAlert] = useState(true);
  const { state, dispatch } = useFormContext();

  const hideAlertButton = () => {
    setHideAlert(false);
  };
  const addMoreFormEmailSentform = () => {
    dispatch({ type: "ADD_EMAIL_VARIANT" });
    setAddEmailSentForm((pre) => pre + 1);
  };
  const handleButtonClick = () => {
    const fileInput = document.getElementById("fileInput");
    if (fileInput) {
      fileInput.click();
    } else {
      console.error('Element with ID "fileInput" not found');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch({ type: "SET_EMAIL_FORM", payload: { [name]: value } });
  };

  function transformKeys(data: InputObject[]): InputObject[] {
    return data.map((entry) => {
      const transformedEntry: InputObject = {};
      for (const key in entry) {
        if (entry.hasOwnProperty(key)) {
          // Create the new key by replacing spaces with underscores and converting to lowercase
          const newKey = key.replace(/\s+/g, "_").toLowerCase();
          transformedEntry[newKey] = entry[key];
        }
      }
      return transformedEntry;
    });
  }

  const handleFileChange = async (
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
          const converteddata = transformKeys(data);
          dispatch({
            type: "CONNECTED_ACCOUNT_DATA",
            payload: [
              ...state.connectedAccountDataCSV.csvData,
              ...converteddata,
            ],
          });
          // setConnectedAccount(converteddata)
        } else {
          alert("Unsupported file format");
          return;
        }
      } catch (error) {
        console.error("Error reading file:", error);
      }
    }
  };
  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
  //   const file = e.target.files?.[0];

  //   const { name } = e.target;
  //   dispatch({ type: 'CONNECTED_ACCOUNT_FILE', payload: { [name]: file } });
  // }

  const handleFollowUpNext = () => {
    dispatch({ type: "ADD_FOLLOW_UP_EMAIL" });
    setAddEmailSentForm((pre) => pre + 1);
  };

  const handleManuallSubmit = () => {
    dispatch({
      type: "CONNECTED_ACCOUNT_DATA",
      payload: [...state.connectedAccountDataCSV.csvData, state.emailForm],
    });
  };

  return (
    <>
      <div>
        <h2 className="text-sm">From</h2>
        {/* <div>
          <h2>filedata Form State:</h2>
          <pre>{JSON.stringify(state.replyEmail, null, 2)}</pre>
        </div> */}
        <p className="text-slate-400 text-sm mb-2">
          The default email will be used to send a test email, You can change
          selection from dropdown
        </p>
        <Select>
          <SelectTrigger>
            <SelectValue
              placeholder={
                state.connectedAccountDataCSV.csvData.length > 0
                  ? `${state.connectedAccountDataCSV.csvData[0].account_name} <${state.connectedAccountDataCSV.csvData[0].email}>`
                  : "Add Connected Account"
              }
            />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {state.connectedAccountDataCSV.csvData.map((item) => (
                <SelectItem key={uuidv4()} value="art">
                  {item.account_name} {`<${item.email}>`}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {/*start modal and slide code for add account */}
        <div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="link">Add Account(s)</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <div className="grid grid-cols-2 gap-4 mt-7">
                <div className="p-4">
                  <div className="w-full max-w-sm">
                    <div className="flex gap-2">
                      <input
                        id="fileInput"
                        type="file"
                        name="file_upload"
                        accept=".csv, .xlsx"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                      <div
                        className="flex flex-col items-center gap-2 cursor-pointer"
                        onClick={handleButtonClick}
                      >
                        <File className="h-10 w-10 text-blue-600 mb-3" />
                        <ModalButtonContent
                          heading="CSV or xlsx"
                          text="Import leads with attribute"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* drawer from the right hand side */}
                <div className="p-4 flex justify-center items-center">
                  <Sheet>
                    <SheetTrigger asChild>
                      {/* <Button variant="outline">

                  </Button> */}
                      <div className="flex flex-col items-center gap-2 cursor-pointer">
                        <Edit2 className="h-10 w-10 text-blue-600" />
                        <ModalButtonContent
                          heading="Manually"
                          text="Create leads from a list of email addresses"
                        />
                      </div>
                    </SheetTrigger>
                    <SheetContent className="sm:max-w-[700px]">
                      <SheetHeader>
                        <SheetTitle>Edit profile</SheetTitle>
                        <SheetDescription>
                          Make changes to your profile here. Click save when
                          you're done.
                        </SheetDescription>
                      </SheetHeader>
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        {/* {Object.entries(state.emailForm).map(([key, value]) => (
                          <div key={uuidv4()}>
                            <DashboardInput
                              labelName={transformString(key)}
                              inputClass={"mt-2"}
                              inputName={key}
                              inputtype="text"
                              onChange={handleChange}
                              inputValue={value}
                            />
                          </div>
                        ))} */}
                        <div>
                          <DashboardInput
                            labelName="Account Name"
                            inputClass={"mt-2"}
                            inputName="account_name"
                            inputtype="text"
                            onChange={handleChange}
                            inputValue={state.emailForm.account_name}
                          />
                        </div>
                        <div>
                          <DashboardInput
                            labelName="Email"
                            inputClass={"mt-2"}
                            inputName="email"
                            inputtype="email"
                            onChange={handleChange}
                            inputValue={state.emailForm.email}
                          />
                        </div>
                        <div>
                          <DashboardInput
                            labelName="SMTP Server Address"
                            inputClass={"mt-2"}
                            inputName="smtp_server_address"
                            inputtype="text"
                            onChange={handleChange}
                            inputValue={state.emailForm.smtp_server_address}
                          />
                        </div>
                        <div>
                          <DashboardInput
                            labelName="SMTP Server PORT"
                            inputClass={"mt-2"}
                            inputName="smtp_server_port"
                            inputtype="text"
                            onChange={handleChange}
                            inputValue={state.emailForm.smtp_server_port}
                          />
                        </div>
                        <div>
                          <DashboardInput
                            labelName="SMTP Server Username"
                            inputClass={"mt-2"}
                            inputName="smtp_server_username"
                            inputtype="text"
                            onChange={handleChange}
                            inputValue={state.emailForm.smtp_server_username}
                          />
                        </div>
                        <div>
                          <DashboardInput
                            labelName="SMTP Server Password"
                            inputClass={"mt-2"}
                            inputName="smtp_server_password"
                            onChange={handleChange}
                            inputtype="password"
                            inputValue={state.emailForm.smtp_server_password}
                          />
                        </div>
                        <div>
                          <DashboardInput
                            labelName="Reply To"
                            inputClass={"mt-2"}
                            inputName="reply_to"
                            onChange={handleChange}
                            inputtype="text"
                            inputValue={state.emailForm.reply_to}
                          />
                        </div>
                      </div>

                      <SheetFooter>
                        <SheetClose asChild>
                          <Button
                            className="bg-customOrange"
                            onClick={handleManuallSubmit}
                          >
                            Save
                          </Button>
                        </SheetClose>
                      </SheetFooter>
                    </SheetContent>
                  </Sheet>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/*end modal and slide code for add account */}

          <span
            className="text-sm ml-1 mb-2 pb-1 cursor-pointer border-b-2 border-slate-400"
            onClick={() => setShowReplyEmailInput(!showReplyEmailInput)}
          >
            Add Primary reply to email here
          </span>
          {showReplyEmailInput && (
            <Input
              type="email"
              name="email"
              className="mt-2"
              placeholder="reply-to@mail.com"
              value={state.replyEmail.email}
              onChange={(e) => {
                const { name, value } = e.target;
                dispatch({
                  type: "SET_REPLY_EMAIL",
                  payload: { [name]: value },
                });
              }}
            />
          )}
        </div>
        {/* <div>
        <h2>Email Form State:</h2>
        <pre>{JSON.stringify(state.emailForm, null, 2)}</pre>
        <h2>filedata Form State:</h2>
        <pre>{JSON.stringify(state.ConnectedAccountFileForm, null, 2)}</pre>

        <h2>EmailVariantForm State:</h2>
        <pre>{JSON.stringify(state.EmailVariantForm, null, 2)}</pre>
        <h2>FollowUpEmailForm Form State:</h2>
        <pre>{JSON.stringify(state.FollowUpEmailForm, null, 2)}</pre>
      </div> */}

        <SentEmailForm />

        {hideAlert && (
          <Alert className="mt-20 bg-slate-50">
            <AlertDescription>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <PlusCircle className="h-4 w-4" />
                  <p
                    className="ml-1 cursor-pointer border-b-2 border-slate-400"
                    onClick={addMoreFormEmailSentform}
                  >
                    Add Email variant. (This will be used for A/B testing)
                  </p>
                </div>
                <button onClick={hideAlertButton}>
                  <X className="h-4 w-4" />
                </button>
              </div>
            </AlertDescription>
          </Alert>
        )}

        <FollowUpEmailForm />

        <Button className="bg-customOrange mt-16" onClick={handleFollowUpNext}>
          <PlusCircle className="h-4 w-4 mr-2" /> Add a Follow up
        </Button>
      </div>
    </>
  );
};

export default ContentForm;
