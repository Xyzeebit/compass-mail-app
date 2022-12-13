import Layout from '../components/Layout-v2';
import { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import { useMessage } from '../hooks';
import combineReducers, { initState } from "../reducer/reducer";
import { IoArrowForward, IoPerson } from 'react-icons/io5';
import { IoMdTrash } from 'react-icons/io';

export default function Mail() {
    const [state, dispatch] = useReducer(combineReducers, initState);
    const { sidebar, user } = state;
    const params = useParams();
    const { loading, error, data } = useMessage(user.username, params.id);
    console.log(loading, error, data);
    useEffect(() => {
      document.title = 'Compass | Message'
    }, []);


  
    return (
      <Layout sidebar={sidebar} user={user} dispatch={dispatch}>
        {/* <p>{ params.slug }:{ params.id }</p> */}
        <section className='mail-body'>
          {!loading && <div className='mail-info'>
            <span><IoPerson size={25} /></span>
            <span>{ data.message.message.to }@compass.com</span>
          </div>}
          {!loading && <div className='mail-info'>
            <span><IoPerson size={18} /></span>
            <span>{ data.message.message.from }@compass.com</span>
          </div>}

          {!loading && <div className='mail-time'>
            <time>{ new Date(data.message.message.time).toDateString() }</time>
          </div>}

          {!loading && <h1>{data.message.message.subject}</h1>}

          {!loading && <p>
            {data.message.message.body}
          </p>}

          <div className='mail-icons'>
            <button>
              <span><IoArrowForward size={18} /></span>
              <span>Forward</span>
            </button>
            <button>
              <span><IoMdTrash size={18} /></span>
              <span>Move to Trash</span>
            </button>
          </div>
        </section>
      </Layout>
    );
}
