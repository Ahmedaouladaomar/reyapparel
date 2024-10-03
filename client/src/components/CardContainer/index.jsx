import React from "react";

export default function CardContainer({ children }) {
  return (
    <div className="mx-auto px-[20px] py-[30px] shadow-sm bg-white rounded-md">
      {children}
    </div>
  );
}
