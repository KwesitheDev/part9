import React, { createContext, useContext, useReducer } from "react";
import { Diagnosis, Patient } from "./types";


export type State = {
  patients: { [id: string]: Patient };
  diagnoses: { [code: string]: Diagnosis };
};


export type Action =
  | { type: "SET_PATIENT_LIST"; payload: Patient[] }
  | { type: "ADD_PATIENT"; payload: Patient }
  | { type: "SET_DIAGNOSES"; payload: Diagnosis[] };


export const setPatientList = (patients: Patient[]): Action => ({
  type: "SET_PATIENT_LIST",
  payload: patients,
});

export const addPatient = (patient: Patient): Action => ({
  type: "ADD_PATIENT",
  payload: patient,
});

export const setDiagnoses = (diagnoses: Diagnosis[]): Action => ({
  type: "SET_DIAGNOSES",
  payload: diagnoses,
});


export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST": {
      const byId = action.payload.reduce((acc, p) => {
        acc[p.id] = p;
        return acc;
      }, {} as { [id: string]: Patient });

      return {
        ...state,
        patients: {
          ...byId,
          ...state.patients,
        },
      };
    }

    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };

    case "SET_DIAGNOSES": {
      const byCode = action.payload.reduce((acc, d) => {
        acc[d.code] = d;
        return acc;
      }, {} as { [code: string]: Diagnosis });

      return {
        ...state,
        diagnoses: {
          ...byCode,
          ...state.diagnoses,
        },
      };
    }

    default:
      return state;
  }
};


export const initialState: State = {
  patients: {},
  diagnoses: {},
};


type StateContextValue = [State, React.Dispatch<Action>];

const StateContext = createContext<StateContextValue | undefined>(undefined);

export const StateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <StateContext.Provider value={[state, dispatch]}>{children}</StateContext.Provider>;
};

export const useStateValue = (): StateContextValue => {
  const ctx = useContext(StateContext);
  if (!ctx) {
    throw new Error("useStateValue must be used within a StateProvider");
  }
  return ctx;
};
