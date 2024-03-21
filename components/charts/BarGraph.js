import React from "react";

function BarGraph({ data }) {
  const daysOfWeek = ["M", "Tu", "W", "Th", "F", "Sa", "Su"]; // Starting from Monday
  const currentDateIndex = new Date().getDay(); // Get the current day index (0 for Sunday, 1 for Monday, etc.)

  return (
    <div className="flex flex-col overflow-x-auto w-full">
      <div className="flex justify-between pl-4">
        {daysOfWeek.map((day, index) => {
          // Adjust index to match the current day of the week starting from Monday
          const adjustedIndex = (currentDateIndex + 6) % 7;
          const isCurrentDay = index === adjustedIndex; // Check if the index matches the current day index
          return (
            <div
              className="flex flex-col items-center"
              key={index}
              style={{ minWidth: "10%" }}
            >
              <div
                className="bg-gray-300 h-20 rounded relative"
                style={{ width: "calc(100%)" }} // Adjusted width to consider padding
              >
                <div
                  className="absolute bottom-0 bg-teal-500 rounded"
                  style={{ height: `${data[index]}%`, width: "100%" }}
                ></div>
              </div>
              <span style={{ fontWeight: isCurrentDay ? "bold" : "normal" }}>
                {day}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BarGraph;
