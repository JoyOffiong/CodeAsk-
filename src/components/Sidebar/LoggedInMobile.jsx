import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate , NavLink } from 'react-router-dom';
import { loggedInNavData } from '../../Data/loggedInNavData';
import Logo from '../../assets/WhiteLogo.png';
import Logout from '../../assets/logout.png';
import { useAuth } from "../../components/hooks/useAuth.js";
import SigninIcon from "../../assets/question-modal-icons/bx_log-in.png";
import SignupIcon from "../../assets/question-modal-icons/Vector.png";

export const LoggedInMobile = ({ onclick }) => {
  const {setAuth, setUser, auth, user, setReRender, reRender}= useAuth();
  console.log(user);
  const navigate = useNavigate();

  function logout() {
 
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
    
      <div id='mySidebar' className={'sidebar mobile'}>
        <div className='sidebar-logo'>
          <Link to={'/'}>
            <img src={Logo} alt='' />
          </Link>
          <FontAwesomeIcon
            icon={faClose}
            className='close-icon'
            onClick={onclick}
          />
        </div>
        {user.username ?
        <div>
        <div className='sidebar-profile'>
          <img src={user.profile_image} alt='icon' />
          <div className='sidebar-details'>
            <h6>{user.username}</h6>
            <p>{user.role}</p>
          </div>
        </div>
        <div className='sidebar-links'>
          {loggedInNavData.map(({ id, icon, text, link }) => {
            return (
              <React.Fragment>
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
          <div>
            <img src={Logout} className='material-icons logout' alt='' onClick={logout} />
            <span className='icon-text' onClick={logout} >Logout</span>
            </div>
        </div>
        </div>
     :  
            <div className="loggedout-mobile">
              <div className="sign-in">
                <div>
                  <img
                    src={SigninIcon}
                    alt="signin icon"
                  />
                  <div className="modal-text-1">


                    <Link to={"/sign-in"}>Sign In</Link>

                   
                  </div>
                </div>
              </div>
              <div className="sign-up">
                <div>
                  <img
                    src={SignupIcon}
                    alt="signup icon"
                  />
                  <div className="modal-text-2">
                  
                    <Link to={"/sign-up"}>Sign Up</Link>
                  </div>
                </div>
              </div>
            </div>
          }
          </div>
    </React.Fragment>
  );
};
