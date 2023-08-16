import { partier2023 } from "../partier";
import { useContext } from "react";
import { FormContext, Step } from "../App";

const MestEnig = () => {
  const form = useContext(FormContext);
  return (
    <Step>
      <h2>Hvilket parti er du mest enig med?</h2>
      <fieldset className={"choices"}>
        {partier2023.map((parti) => (
          <label key={parti}>
            <input required={true} type={"radio"} {...(form.register("nesteValg"))} value={parti}/>
            {parti}
          </label>
        ))}
      </fieldset>
    </Step>
  );
};

export default MestEnig;
