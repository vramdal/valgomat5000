import { useContext } from "react";
import { FormContext, Step } from "../App";

const Fornoyd = () => {
  const form = useContext(FormContext);
  return (
    <Step>
      <h2>Er du fornøyd med det <strong>{form.getValues('forrigeValg')}</strong> har gjort
        siden sist valg?</h2>
      <fieldset className={"choices"}>
        <label><input required={true} type={"radio"} {...(form.register('fornoyd'))} value={"Ja"}/>Ja</label>
        <label><input required={true} type={"radio"} {...(form.register('fornoyd'))} value={"Nei"}/>Nei</label>
      </fieldset>
    </Step>
  );
};

export default Fornoyd;
