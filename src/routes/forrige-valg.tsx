import { partier2019 } from "../partier";
import { useContext } from "react";
import { FormContext, Step } from "../App";

const ForrigeValg = () => {
  const form = useContext(FormContext);
  return (
    <Step>
      <h2>Hvilket parti stemte du på ved sist valg?</h2>
      <fieldset className={"choices"}>
        {partier2019.map((parti) => (
          <label key={parti}>
            <input required={true} type={"radio"} {...(form.register("forrigeValg"))} value={parti}/>
            {parti}
          </label>
        ))}
        <label><input required={true} type={"radio"} {...(form.register("forrigeValg"))}
                      value={"Stemte ikke ved forrige valg"}/>Stemte ikke ved forrige valg</label>
      </fieldset>
    </Step>
  );
};

export default ForrigeValg;
