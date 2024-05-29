import React, { useContext, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Input } from "@/components/ui/input";
import { Check, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormContext } from "../app/contextAPi/FormContext";
import { Value } from "@radix-ui/react-select";

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

interface SentEmailFormProps {
  index?: number;
}

const SentEmailForm: React.FC<SentEmailFormProps> = ({ index }) => {
  const context = useContext(FormContext);
  const { state, dispatch } = context;
  const [editing, setEditing] = useState(false);

  const handleSubject = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const splitName = name.split("_");
    const latestArray = [...state.EmailVariantForm.emailVariant];
    latestArray[Number(splitName[1])][splitName[0]] = value;
    setEditing(true);
    dispatch({ type: "EMAIL_VARIANT", payload: latestArray });
  };

  const handleDescription = (index: any, content: string) => {
    const latestArray = [...state.EmailVariantForm.emailVariant];
    latestArray[index]["content"] = content;
    setEditing(true);
    dispatch({ type: "EMAIL_VARIANT", payload: latestArray });
  };

  const handleBlur = () => {
    setEditing(false);
  };

  return (
    <>
      {[...state.EmailVariantForm.emailVariant].map((item, index) => (
        <div key={index}>
          <div className="mt-3 flex justify-between">
            <Button className={index === 0 ? "" : "mt-12"} variant="outline">
              <Mail className="pr-1" /> Send myself a test email
            </Button>
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
              value={state.EmailVariantForm.emailVariant[index].title}
            />
            <Input
              className="mb-2"
              name={`subject_${index}`}
              onChange={handleSubject}
              onBlur={handleBlur}
              type="text"
              placeholder="Subject"
              value={state.EmailVariantForm.emailVariant[index].subject}
            />
            <ReactQuill
              theme="snow"
              modules={modules}
              formats={formats}
              style={{ width: "100%", height: "250px" }}
              value={state.EmailVariantForm.emailVariant[index].content}
              onChange={(content) => handleDescription(index, content)}
              onBlur={handleBlur}
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default SentEmailForm;
