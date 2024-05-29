"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Check } from "lucide-react";

import React, { useState } from "react";
import { uid } from "react-uid";

const compaignBreadcrumpData = [
  {
    id: 1,
    name: "Content",
  },
  {
    id: 2,
    name: "Audience",
  },
  {
    id: 3,
    name: "Settings",
  },
  {
    id: 4,
    name: "Review",
  },
];
interface activeCrumbname {
  activePage: number;
}

const compaignBreadcrumb: React.FC<activeCrumbname> = ({ activePage }) => {
  const clickBreadCrumb = () => {
    console.log(activePage);
  };
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {compaignBreadcrumpData.map((item, index) => (
          <>
            <BreadcrumbItem
              key={uid(index)}
              className={`cursor-pointer ${
                activePage === item.id ? "text-slate-800" : "text-slate-300"
              }`}
              onClick={clickBreadCrumb}
            >
              <span
                className={`${
                  item.id === activePage ? "bg-customOrange" : "bg-slate-400"
                } w-5 h-5 text-lg text-white flex items-center justify-center text-center rounded-full text-sm`}
              >
                <span>
                  {item.id < activePage ? (
                    <Check className="h-3 w-3" />
                  ) : (
                    item.id
                  )}
                </span>
              </span>

              {item.name}
            </BreadcrumbItem>
            {index !== compaignBreadcrumpData.length - 1 && (
              <BreadcrumbSeparator />
            )}
          </>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default compaignBreadcrumb;
