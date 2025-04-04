import React from "react";

export default function Loading() {
  return (
    <React.Fragment>
      <div className="flex justify-center my-4">
        <div className="loader"></div>
      </div>
      <style jsx>{`
        .loader {
          border: 3px solid #f3f3f3;
          border-radius: 50%;
          border-top: 3px solid #3498db;
          width: 20px;
          height: 20px;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </React.Fragment>
  );
}
