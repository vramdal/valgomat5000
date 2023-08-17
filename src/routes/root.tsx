import React, { useContext } from "react";
import { FormContext, Step } from "../App";

const Root = () => {
  const form = useContext(FormContext);
  return (
    <>
      <Step style={{backgroundImage: "url('/valgomat5000/standard_stemmerett.jpg')", backgroundSize: "contain", filter: "brightness(50%)"}}>
        <h1>Roberts valgomat - 2023-utgaven</h1>
        <section style={{flex: "0 1 50vh"}}>
          {/*<img src="/valgomat5000/standard_stemmerett.jpg"
               style={{maxHeight: "40vh", display: "block", alignSelf: "center"}}
               alt={"Dame som putter stemmeseddel i urnen. Foto: Anders B. Wilse"}/>*/}
          <p>Først noen bakgrunnsspørsmål.</p>
          <h2>Er du klar?</h2>
        </section>
        <fieldset className={"choices"}>
          <label><input type={"radio"}
                        required={true} {...(form.register('klar', {validate: (value) => value === "Ja"}))}
                        value={'Ja'}/>Ja</label>
          <label><input type={"radio"}
                        required={true} {...(form.register('klar', {validate: (value) => value === "Ja"}))}
                        value={'Nei'}/>Nei</label>
        </fieldset>
        <aside>Ingen data sendes noe sted</aside>
      </Step>
    </>
  );
}

export default Root;
