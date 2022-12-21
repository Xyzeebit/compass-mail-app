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
  // console.log(loading, error, data);
  
    useEffect(() => {
      document.title = 'Compass | Message'
    }, []);

  useEffect(() => {
      const composeButton = document.querySelector('.compose-anchor');
      if (composeButton) {
        composeButton.style.display = 'none';
      }
    }, [loading]);


  
  return (
    <Layout sidebar={sidebar} user={user} dispatch={dispatch}>
      {
        loading ? <div /> : (error ? <div>error</div> : <MailBody message={data.message.message} />)
      }
    </Layout>
  );
}


const MailBody = ({ message }) => (
  <section className='mail-body'>
    <div className='mail-info'>
      <span><IoPerson size={25} /></span>
      <span>{message.to}@compass.com</span>
    </div>
    <div className='mail-info'>
      <span><IoPerson size={18} /></span>
      <span>{message.from}@compass.com</span>
    </div>

    <div className='mail-time'>
      <time>{new Date(message.time).toDateString()}</time>
    </div>

    <h1>{message.subject}</h1>

    <p>
      {message.body}
    </p>

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
);