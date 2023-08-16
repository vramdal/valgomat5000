import { useContext } from "react";
import { FormContext, Step } from "../App";

const AlderStep = () => {
  const form = useContext(FormContext);
  return <Step>
    <h2>Hva er din alder?</h2>
    <label>Alder: <input required={true} type={"number"} {...(form.register('alder'))}/></label>
  </Step>;
}

export default AlderStep;
