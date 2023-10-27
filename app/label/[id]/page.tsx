import React from "react";

interface LabelPageProps {
  params: {
    id: string;
  };
}

function LabelPage({ params }: LabelPageProps) {
  const { id } = params;
  return <div>LabelPage {id}</div>;
}

export default LabelPage;
