import { useEffect, useReducer } from "react";
import Paginator from "../components/Paginator";
import List from "../components/List";

import Layout from "../components/Layout";
import combineReducers, { initState } from "../reducer/reducer";

export default function Starred() {
  const [state, dispatch] = useReducer(combineReducers, initState);

  const { sidebar, contacts, mails } = state;
  useEffect(() => {}, []);

  return (
    <Layout sidebar={sidebar} contacts={contacts}>
      <section className="list">
        <List list={mails} dispatch={dispatch} />
        <Paginator />
      </section>
    </Layout>
  );
}
