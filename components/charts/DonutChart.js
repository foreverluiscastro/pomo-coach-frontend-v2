import React from "react";

function DonutChart({ percentage, strokeWidth, size }) {
  // console.log("This is the percentage passed down from Dashboard:", percentage)
  // Calculate the radius and circumference
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Calculate the dash offset to represent the percentage
  let dashOffset;
  if (percentage <= 100) {
    dashOffset = circumference * (1 - percentage / 100);
  } else {
    dashOffset = 0; // Set dash offset to 0 if percentage exceeds 100%
  }

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="transparent"
        stroke="#e2e8f0"
        strokeWidth={strokeWidth}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="transparent"
        stroke="#4fd1c5"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={dashOffset}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="1rem"
        fontWeight="bold"
        fill="white"
      >
        {percentage > 100 ? 100 : percentage}%
      </text>
    </svg>
  );
}

export default DonutChart;
