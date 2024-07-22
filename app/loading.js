// components/Loading.js
"use client"

import HashLoader from "react-spinners/HashLoader";


const Loading = () => {
    
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <HashLoader color="#36d7b7" size={100} />
    </div>
  );
};

export default Loading;