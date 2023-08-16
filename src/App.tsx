import React, { Context, Dispatch, ReactNode, SetStateAction, useContext } from 'react';
import './App.css';
import { State, StepProps } from "./types";
import { useForm } from "react-hook-form";
import { useMatches, useNavigate } from "react-router-dom";
import { routes, RouteWithRequirement } from "./index";

export const DataStateContext = React.createContext<[() => State, Dispatch<SetStateAction<State>>]>([() => ({}), () => {
}]);

export const FormContext: Context<ReturnType<typeof useForm<State>>> = React.createContext<ReturnType<typeof useForm<State>>>({} as any)

const App = ({children}: { children: ReactNode }) => {
  const [dataState, setDataState] = React.useState<State>({})
  const form = useForm<State>({});


  return (
    <div className="App">
      <DataStateContext.Provider value={[() => dataState, setDataState]}>
        <FormContext.Provider value={form}>
          <main>
            {children}
          </main>
        </FormContext.Provider>
      </DataStateContext.Provider>
    </div>
  );
};

export default App;
const useStepNavigationProvider = () => {
  const navigate = useNavigate();
  const matches = useMatches();
  const formContext = useContext(FormContext);

  const currentRouteIndex = routes.findIndex((route) => route.path === matches[0].pathname);

  // noinspection UnnecessaryLocalVariableJS
  const stepNavigation = () => {
    const isRouteValid = (route: RouteWithRequirement) => {
      return !route.requirements || route.requirements(formContext.getValues());
    };
    const validNextRoutes = routes.slice(currentRouteIndex + 1).filter(isRouteValid);
    const validPreviousRoutes = routes.slice(0, currentRouteIndex - 1).filter(isRouteValid).reverse();

    const nextRoute = validNextRoutes.length > 0 && validNextRoutes[0];
    const previousRoute = validPreviousRoutes.length > 0 && validPreviousRoutes[0];

    console.log("matches", matches);


    return {
      goNext: nextRoute && (() => navigate(nextRoute.path)),
      goBack: previousRoute && (() => navigate(previousRoute.path)),
      goHome: () => navigate('/'),
    }
  }
  return stepNavigation;
};
export const Step = ({children}: StepProps & { children: React.ReactNode }) => {
  const stepNavigationProvider = useStepNavigationProvider();

  // const [getState, setState] = useContext(DataStateContext);
  const form = useContext(FormContext);
  const navigate = useNavigate();
  const onSubmit = () => {
    const stepNavigation = stepNavigationProvider();
    // console.log("data", data);
    // setState(data);
    stepNavigation.goNext && stepNavigation.goNext();
  };
  const stepNavigation = stepNavigationProvider();
  return <form onSubmit={form.handleSubmit(onSubmit)/*props.form.handleSubmit(onSubmit)*/}>
    {children}
    <nav className={'step-buttons'}>
      {stepNavigation.goBack &&
          <button type={"button"} className={'back-button'}
                  onClick={() => navigate(-1)}>Tilbake</button>}
      <button type="submit">Videre &gt;</button>
    </nav>
    {/*{JSON.stringify(form.getValues())}*/}
  </form>
}
