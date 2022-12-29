import React from 'react';

import { Link, useNavigate, NavLink } from 'react-router-dom';
import Logo from '../../assets/whiteLogoSym.png';
import Logout from '../../assets/logout.png';
import { loggedInNavData } from '../../Data/loggedInNavData';
// import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import axios from 'axios';

export const LoggedInSidebar = ({

  
  hover,
  handleHoverClose,
  handleHoverOpen,
}) => {

  const navigate = useNavigate();
  const {setAuth, setUser, auth, user, setReRender, reRender}= useAuth();
  // const {loggedIn, setLoggedIn} = useState(true)
  const openSidebar = {
    width: '250px',
  };
  const closeSidebar = {
    width: '85px',
  };

// const logout = async ()=>{

//   let response = await axios.delete(
//     "https://code-ask-backend-production.up.railway.app/v1/api/auth/logout",
//      {refreshToken: auth.refresh.token},
//     ) 
//   console.log(auth.refresh.token)

// console.log(response)
// localStorage.clear() 
//   setAuth({})
//   setUser({})
//   console.log(auth, user)
 


//   navigate('/')
// }
function logout() {
 
// let response = axios.delete(
//   "https://code-ask-backend-production.up.railway.app/v1/api/auth/logout",
//    {refreshToken: auth.refresh.token},
//   ) 
  setAuth({})
  setUser({})
 
  localStorage.clear()
  console.log(auth)
  console.log(user)
  navigate('/')
  setReRender(!reRender);
}

  return (
    <React.Fragment>
      <div
        id='mySidebar'
        className={'sidebar'}
        style={hover ? openSidebar : closeSidebar}
        onMouseEnter={handleHoverOpen}
        onMouseLeave={handleHoverClose}
      >
        <div className='sidebar-logo'>
          <Link to={'/'}>
            <img src={Logo} className='logo-icon' alt='' />
            <span className='icon-text logo-text'>CodeAsk</span>
          </Link>
        </div>
        <div className='sidebar-links'>
          {loggedInNavData.map(({ id, icon, text, link }) => {
            return (
              <React.Fragment key={id} >
                <NavLink key={id} to={link}>
                  {icon}
                  <span className='icon-text'>{text}</span>
                </NavLink>
                <br />
              </React.Fragment>
            );
          })}
        </div>
        <div className='sidebar-logout'>  
          
            <img src={Logout} className='material-icons logout' alt='' onClick={logout} />
            <span className='icon-text' onClick={logout} >Logout</span>
            </div>

            </div>
    </React.Fragment>
  );
};
