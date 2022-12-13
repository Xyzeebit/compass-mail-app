import Layout from '../components/Layout-v2';
import { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import { useMessage } from '../hooks';
import combineReducers, { initState } from "../reducer/reducer";
import { IoArrowForward, IoPerson, IoShare, IoTrashBin } from 'react-icons/io5';
import { GoTrashcan } from 'react-icons/go';
import { IoMdTrash } from 'react-icons/io';

export default function Mail() {
    const [state, dispatch] = useReducer(combineReducers, initState);
    const { sidebar, user } = state;
    const params = useParams();
    const data = useMessage(user.username, params.id);
    console.log(data)
    useEffect(() => {
      document.title = 'Compass | Message'
    }, []);


  
    return (
      <Layout sidebar={sidebar} user={user} dispatch={dispatch}>
        {/* <p>{ params.slug }:{ params.id }</p> */}
        <section className='mail-body'>
          <div className='mail-info'>
            <span><IoPerson size={25} /></span>
            <span>example@example.com</span>
          </div>
          <div className='mail-info'>
            <span><IoPerson size={18} /></span>
            <span>example@example.com</span>
          </div>

          <div className='mail-time'>
            <time>{ new Date().toDateString() }</time>
          </div>

          <h1>This is the mail subject, it is about Rust path module</h1>

          <p>
            The Path struct represents file paths in the underlying filesystem.
            There are two flavors of Path: posix::Path, for UNIX-like systems,
            and windows::Path, for Windows. The prelude exports the appropriate
            platform-specific Path variant.

            The Path struct represents file paths in the underlying filesystem.
            There are two flavors of Path: posix::Path, for UNIX-like systems,
            and windows::Path, for Windows. The prelude exports the appropriate
            platform-specific Path variant.

            The Path struct represents file paths in the underlying filesystem.
            There are two flavors of Path: posix::Path, for UNIX-like systems,
            and windows::Path, for Windows. The prelude exports the appropriate
            platform-specific Path variant.
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
      </Layout>
    );
}
