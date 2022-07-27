import { useReducer } from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import combineReducers, {initState} from "../reducer/reducer";


// use home for login signup and mail for home
export default function Home() {
    const [state, dispatch] = useReducer(combineReducers, initState);
    return (
      <main>
        <Header dispatch={dispatch} />
        <div className="app">
          <SideBar
            sidebar={state.sidebar}
            dispatch={dispatch}
          />
          <h1>Home Page</h1>
        </div>
      </main>
    );
}