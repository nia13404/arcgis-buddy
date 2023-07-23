"use client";

// @ts-ignore
const Message = ({ message, isGpt = true }) => {
  return (
    <div className={`py-5 text-gray ${isGpt && "bg-[#d3d3d3]"}`}>
      <div className="space-x-5 px-10 max-w-2xl mx-auto">
        <p className="pt-1 text-sm">{message}</p>
      </div>
    </div>
  );
};

export default Message;
