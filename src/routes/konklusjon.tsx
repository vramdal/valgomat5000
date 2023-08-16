import { useContext } from "react";
import { FormContext, Step } from "../App";

const Konklusjon = () => {
  const form = useContext(FormContext);
  return (
    <Step>
      <h1>Resultat</h1>
      <h2><em>Du burde stemme på</em></h2>
      {form.getValues("fornoyd") === "Ja" && <>
          <h1>{form.getValues('forrigeValg')}</h1>
          <h2><em>siden du stemte på dem sist og er fornøyd med det de har gjort</em></h2>
      </>}
      {form.getValues("fornoyd") === "Nei" && <>
          <h1>{form.getValues('nesteValg')}</h1>
          <h2>siden det er dem du er mest enig med</h2>
      </>}
    </Step>
  );
};

export default Konklusjon;
