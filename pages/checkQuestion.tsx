import React, { useContext } from "react";
import Survey from "../components/ViewSheet";
import { SheetContext } from "./newQuestion";

const CheckQuestion = () => {
  const [sheet] = useContext(SheetContext);
  console.log(sheet);
  if (sheet) return <Survey sheet={sheet} />;
  else return <>test</>;
};

export default CheckQuestion;
