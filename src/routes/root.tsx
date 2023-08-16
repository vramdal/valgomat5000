import { useContext } from "react";
import { FormContext, Step } from "../App";

const Root = () => {
  const form = useContext(FormContext);
  return (
    <>
      <h1>Valgomat5000 - 2023-utgaven</h1>
      <Step>
        <p>Først noen bakgrunnsspørsmål.</p>
        <h2>Er du klar?</h2>
        <fieldset className={"choices"}>
          <label><input type={"radio"} required={true} {...(form.register('klar'))} value={'true'}/>Ja</label>
          <label><input type={"radio"} required={true} {...(form.register('klar'))} value={'false'}/>Nei</label>
        </fieldset>
      </Step>
    </>
  );
}

export default Root;
