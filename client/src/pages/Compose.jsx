import { useEffect, useReducer } from "react";

import combineReducers, { initState } from "../reducer/reducer";
import Layout from "../components/Layout";
import Compose from "../components/Compose";


export default function ComposePage() {
  const [state, dispatch] = useReducer(combineReducers, initState);

  const { sidebar, contacts, user } = state;
  useEffect(() => {
    dispatch({ type: "TOGGLE_SIDEBAR" });
    dispatch({ type: "FETCH_CONTACTS" });
  }, []);

  return (
    <Layout sidebar={sidebar} contacts={contacts} dispatch={dispatch}>
          <Compose from={ user.email }  dispatch={dispatch} />
    </Layout>
  );
}
