import React, { FC } from 'react'
import Image from "next/image";

interface ParamsType {
    src: string; // Ensure src is always defined
    alt?: string;
    iWidth?: number;
    iHeight?: number;
    iClass?: string;
}

const DashboardImage: FC<ParamsType> = ({ src, alt, iWidth, iHeight, iClass }) => {
  return (
    <>
    <Image
        src={src}
        alt={alt || "audience image"}
        width={iWidth || 200}
        height={iHeight || 200} 
        className={iClass || "mb-4"} 
      />
    </>
  )
}

export default DashboardImage;
