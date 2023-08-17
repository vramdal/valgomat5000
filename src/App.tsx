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
          {children}
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


  // noinspection UnnecessaryLocalVariableJS
  const stepNavigation = () => {
    const currentRouteIndex = routes.findIndex((route) => route.path === matches[0].pathname);
    const isRouteValid = (route: RouteWithRequirement) => {
      return !route.skipIf || !route.skipIf(formContext.getValues());
    };
    const validNextRoutes = routes.slice(currentRouteIndex + 1).filter(isRouteValid);
    const validPreviousRoutes = routes.slice(0, Math.max(currentRouteIndex, 0)).filter(isRouteValid);

    const nextRoute = validNextRoutes.length > 0 && validNextRoutes[0];
    const previousRoute = validPreviousRoutes.length > 0 && validPreviousRoutes[validPreviousRoutes.length - 1];
    const isFinished = !nextRoute;

    console.log("matches", matches);


    return {
      goNext: nextRoute && (() => navigate(nextRoute.path)),
      goBack: previousRoute && (() => navigate(previousRoute.path)),
      restart: () => navigate(routes[0].path),
      isFinished,
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
      {!stepNavigation.isFinished && stepNavigation.goBack &&
          <button type={"button"} className={'back-button'}
                  onClick={() => navigate(-1)}>Tilbake</button>}
      {stepNavigation.goNext && <button type="submit">Videre &gt;</button>}
      {stepNavigation.isFinished &&
          <button type="submit" onClick={stepNavigation.restart}>Start på nytt</button>}
    </nav>
    {/*{JSON.stringify(form.getValues())}*/}
  </form>
}
