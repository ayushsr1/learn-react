import { Link } from "react-router-dom";

export function BrandLogo() {
  return (
    <>
    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 text-white">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="w-5 h-5"
      >
        <path d="M4 14c4 0 6-8 10-8s2 12 6 12" />
        <path d="M4 18c4 0 6-8 10-8s2 12 6 12" opacity="0.5" />
      </svg>
    </div>

    <div className="flex flex-col text-left leading-none">
      <span className="text-base font-bold text-white tracking-tight">
        MARINA
      </span>
      <span className="text-[10px] font-semibold text-teal-500 tracking-wider uppercase mt-0.5">
        Online Gymnastics
      </span>
    </div>
    </>
  );
}