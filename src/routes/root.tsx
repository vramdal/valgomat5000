import React, { useContext } from "react";
import { FormContext, Step } from "../App";

const Root = () => {
  const form = useContext(FormContext);
  return (
    <>
      <h1>Valgomat5000 - 2023-utgaven</h1>
      <img src={"/valgomat5000/standard_stemmerett.jpg"} alt={"Dame som putter stemmeseddel i valgboks. Bilde: Anders Beer Wilse"}/>
      <Step>
        <p>Først noen bakgrunnsspørsmål.</p>
        <h2>Er du klar?</h2>
        <fieldset className={"choices"}>
          <label><input type={"radio"} required={true} {...(form.register('klar', {validate: (value) => value === "Ja"}))} value={'Ja'}/>Ja</label>
          <label><input type={"radio"} required={true} {...(form.register('klar', {validate: (value) => value === "Ja"}))} value={'Nei'}/>Nei</label>
        </fieldset>
        <aside>Ingen data sendes noe sted</aside>
      </Step>
    </>
  );
}

export default Root;
