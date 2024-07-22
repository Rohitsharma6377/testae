// components/Loading.js
"use client"

import HashLoader from "react-spinners/HashLoader";


const Loading = () => {
    
  return (
    <div className="">
      <HashLoader color="#36d7b7" size={100} className="mx-auto my-auto" />
    </div>
  );
};

export default Loading;