import { useEffect, useReducer } from "react";

import combineReducers, { initState } from "../reducer/reducer";
import Layout from "../components/Layout-v2";
import Compose from "../components/Compose";


export default function ComposePage() {
  const [state, dispatch] = useReducer(combineReducers, initState);

  const { sidebar, user } = state;
  console.log(user)
  useEffect(() => {
    dispatch({ type: "TOGGLE_SIDEBAR" });
    dispatch({ type: "FETCH_CONTACTS" });
  }, []);

  return (
    <Layout sidebar={sidebar} user={user} dispatch={dispatch}>
          <Compose user={user}  dispatch={dispatch} />
    </Layout>
  );
}
