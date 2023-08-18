import React from "react";
import { Step } from "../App";

const Root = () => {
  return (
    <>
      <Step style={{backgroundImage: "url('/valgomat5000/standard_stemmerett.jpg')", backgroundSize: "cover"}} forwardButtonLabel={"Start >"}>
        <h1>Roberts valgomat - 2023-utgaven</h1>
        <section style={{flex: "0 1 50vh", display: "flex", flexDirection: "column", justifyContent: "flex-end"}}>
          <h2>Er du klar?</h2>
        </section>
        <aside>Ingen data sendes noe sted</aside>
      </Step>
    </>
  );
}

export default Root;
