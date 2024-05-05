// SmallCard.tsx
import React from "react";

interface SmallCardProps {
  dayTitle: string;
  img: string;
  min: number;
  max: number;
  temp?: string; // Make temp optional
  value: number;
}


const SmallCard: React.FC<SmallCardProps> = ({
  dayTitle,
  img,
  min,
  max,
  temp,
}) => {
  return (
    <div className="bg-darkblue py-4 px-5 flex flex-col items-center space-y-4">
      <p>{dayTitle}</p>
      <img src={`/images/${img}.png`} alt="weather-icon" className="max-h-16" />
      <div className="flex justify-between space-x-5">
        <p>
          {max}&deg;{temp}
        </p>
        <p className="text-gray-250">
          {min}&deg;{temp}
        </p>
      </div>
    </div>
  );
};

export default SmallCard;
