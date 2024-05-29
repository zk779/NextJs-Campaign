import React, { useContext, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Input } from "@/components/ui/input";
import { Check, Mail, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormContext } from "../app/contextAPi/FormContext";
import SleInput from "@/rcomponents/SleInput";

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
  clipboard: {
    matchVisual: false,
  },
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

interface FollowUpFormProps {
  index?: number;
}

interface NumberObject {
  text: string;
  value: number;
}

const ObjectOFNumber: NumberObject[] = [];
for (let index = 1; index < 31; index++) {
  ObjectOFNumber.push({
    text: index.toString() + " days",
    value: index,
  });
}

const FollowUpEmailForm: React.FC<FollowUpFormProps> = ({ index }) => {
  const context = useContext(FormContext);
  const { state, dispatch } = context;
  const [editing, setEditing] = useState(false);

  const handleSubject = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const splitName = name.split("_");
    const latestArray = [...state.FollowUpEmailForm.followUpEmails];
    latestArray[Number(splitName[1])][splitName[0]] = value;
    setEditing(true);
    dispatch({ type: "FOLLOW_UP_EMAIL", payload: latestArray });
  };

  const handleDescription = (index: any, content: string) => {
    const latestArray = [...state.FollowUpEmailForm.followUpEmails];
    latestArray[index]["content"] = content;
    setEditing(true);
    dispatch({ type: "FOLLOW_UP_EMAIL", payload: latestArray });
  };

  const handleSelect = (value: string, name: string) => {
    const splitName = name.split("-");
    const latestArray = [...state.FollowUpEmailForm.followUpEmails];
    if (splitName.length > 1) {
      latestArray[Number(splitName[1])][splitName[0]] = value;
      setEditing(true);
      dispatch({ type: "FOLLOW_UP_EMAIL", payload: latestArray });
    }
  };

  const delteNode = (event: any, index: any) => {
    const latestArray = [...state.FollowUpEmailForm.followUpEmails];
    latestArray.splice(index, 1);
    dispatch({ type: "FOLLOW_UP_EMAIL", payload: latestArray });
  };

  const handleBlur = () => {
    setEditing(false);
  };

  return (
    <>
      {[...state.FollowUpEmailForm.followUpEmails].map((item, index) => (
        <div key={index}>
          <div className={`bg-slate-50 flex justify-between px-3 py-2 items-center ${index === 0 ? "mt-4" : "mt-16"}`}>
            <div className="flex gap-2 items-center">
              <span className="text-base font-bold mt-2">Follow Up</span>
              <SleInput
                handleSelectChange={(value: string, name: string) => handleSelect(value, name)}
                selectName={"wait_for-" + index}
                selectPlace={ObjectOFNumber[0].text}
                options={ObjectOFNumber}
              />
              <span className="text-base font-bold mt-2">after the previous email if no reply</span>
            </div>
            <Button variant="outline" onClick={(event) => delteNode(event, index)}> 
              <Trash className="h-3 w-3 mr-2" /> Delete
            </Button>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <div className="flex gap-2 items-center">
              <SleInput
                selectPlace="Active"
                handleSelectChange={(value: string, name: string) => handleSelect(value, name)}
                selectName={"is_active-" + index}
                options={[
                  {
                    text: "Active",
                    value: true,
                  },
                  {
                    text: "DeActivate",
                    value: false,
                  },
                ]}
              />
              <Button variant="outline">
                <Mail className="pr-1" /> Send myself a test email
              </Button>
            </div>
            {!editing && (
              <span className="flex items-center text-green-400">
                <Check className="h-4 w-4 text-green-400 mr-2" />
                <span className="text-base font-bold">AutoSaved</span>
              </span>
            )}
          </div>
          <div className="emailComposeSubject mt-3">
            <Input
              className="mb-2"
              name={`title_${index}`}
              onChange={handleSubject}
              onBlur={handleBlur}
              type="text"
              placeholder="Title"
              value={state.FollowUpEmailForm.followUpEmails[index].title}
            />
            <Input
              className="mb-2"
              name={`subject_${index}`}
              onChange={handleSubject}
              onBlur={handleBlur}
              type="text"
              placeholder="Subject"
              value={state.FollowUpEmailForm.followUpEmails[index].subject}
            />
            <ReactQuill
              theme="snow"
              modules={modules}
              formats={formats}
              style={{ width: "100%", height: "250px" }}
              value={state.FollowUpEmailForm.followUpEmails[index].content}
              onChange={(content) => handleDescription(index, content)}
              onBlur={handleBlur}
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default FollowUpEmailForm;
