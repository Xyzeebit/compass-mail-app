import { useEffect, useReducer } from "react";
import Paginator from "../components/Paginator";
import List from "../components/List";

import Layout from "../components/Layout";
import combineReducers, { initState } from "../reducer/reducer";

export default function Outbox() {
  const [state, dispatch] = useReducer(combineReducers, initState);

  const { sidebar, contacts, mails } = state;
  useEffect(() => {}, []);

  return (
    <Layout sidebar={sidebar} contacts={contacts} dispatch={dispatch}>
      <section className="list">
        <List list={mails} label="Your outbox is empty" dispatch={dispatch} />
        <Paginator />
      </section>
    </Layout>
  );
}
