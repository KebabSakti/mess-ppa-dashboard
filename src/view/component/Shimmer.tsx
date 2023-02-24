import React from "react";

function Shimmer() {
  return (
    <div className="space-y-4">
      <div className="flex space-x-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex-1 card bg-base-100 h-4 animate-pulse" />
        ))}
      </div>
      {[...Array(10)].map((_, i) => (
        <div key={i} className="flex-1 card bg-base-100 h-4 animate-pulse" />
      ))}
    </div>
  );
}

export { Shimmer };

