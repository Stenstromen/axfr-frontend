import React from "react";
import { useParams } from "react-router-dom";

function NuDomains() {
  const { param } = useParams();

  return (
    <div>
      <h1>the param is {param}</h1>
    </div>
  );
}

export default NuDomains