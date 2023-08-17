import { useContext } from "react";
import { FormContext, Step } from "../App";
import kommuner from "../kommuner";

const Kommune = () => {
  const form = useContext(FormContext);
  return (
    <Step>
      <h2>Hvilken kommune skal du stemme i?</h2>
      <select required={true} {...(form.register("kommune"))}>
        <option value={""}>Velg kommune</option>
        {kommuner.map((kommune) => (<option key={kommune} value={kommune}>{kommune}</option>))}
      </select>
    </Step>
  );
};

export default Kommune;
