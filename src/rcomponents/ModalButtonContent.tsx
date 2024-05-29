import React, { FC } from "react";

interface paramsType {
  heading: string;
  text: string
}

const ModalButtonContent : FC<paramsType> = ({heading, text}) => {
  return (
    <>
      <h4 className="font-extrabold">{heading}</h4>
      <p className="text-center">{text}</p>
    </>
  );
};

export default ModalButtonContent;
