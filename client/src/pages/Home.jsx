import { useEffect, useReducer } from "react";
import Layout from "../components/Layout";
import combineReducers, {initState} from "../reducer/reducer";


// use home for login signup and mail for home
export default function Home() {
    const [state, dispatch] = useReducer(combineReducers, initState);

    const { sidebar, contacts } = state;
    useEffect(() => {}, []);

    return (
      <Layout sidebar={sidebar} contacts={contacts}>
        <section className="home">
          <h1>Pack Mail Home</h1>
        </section>
      </Layout>
    );
}