import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Logo from '../../assets/headerlogo.png';
import '../../stylesheets/shared.css';
import { headerLinks } from '../../Data/headerLinks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../hooks/useAuth';

export const Header = () => {
  const [show, setShow] = useState(false);
  const {setAuth, setUser, auth, user}= useAuth()

  function mobileNav() {
    setShow(!show);
  }
const navigate = useNavigate()

  const logout = ()=>{
    setAuth({})
    setUser({})
    localStorage.clear()
    console.log(auth)
    console.log(user)
    if(auth){
      navigate("/")
    } 
  }

  return (
    <header>
      <nav>
        <div>
          <Link to={'/'}>
            <img className='footer-image' src={Logo} alt='Header Logo' />
          </Link>
        </div>
        <div className='nav-text'>
          <ul>
            {headerLinks.map(({ id, link, text }) => {
              return (
                <li key={id}>
                  <NavLink
                    className={(navData) => (navData.isActive ? 'active' : '')}
                    to={link}>
                    {text}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
        <div className='header-buttons'>

          {auth && auth.access && auth.access.token?
          <button onClick={logout}>
            <Link to={'/'} className='loginbtn'>
              logout
            </Link>
          </button>:
          <button>
            <Link to={'/sign-in'} className='loginbtn'>
              login
            </Link>
          </button>}

          {auth && auth.access && auth.access.token?
          <button style={{border:"none"}} >
             <Link to={'/dashboard'} className='signupbtn'>
              DashBoard
            </Link>
          </button>:
          <button>
            <Link to={'/sign-up'} className='signupbtn'>
              Create an Account
            </Link>
          </button>}

        </div>
        <div className='mobile-nav' onClick={mobileNav}>
          <div className={show ? 'hide' : 'start'} />
          <div className={show ? 'hide' : 'mid'} />
          <div className={show ? 'hide' : 'end'} />
          <FontAwesomeIcon icon={faClose} className={show ? 'close' : 'hide'} />
        </div>
      </nav>
      <div className={show ? 'mobile-nav-menu' : ''}>
        <ul className='menu'>

          <li>
            <Link to={'/about-us'} href='/question.html'>
              About Us
            </Link>
          </li>
          <li>
            <Link to='/questions'>Questions</Link>
          </li>


          {auth && auth.access && auth.access.token?
             <Link to={'/'} className='btn login'>
              Log Out
            </Link>
          : <Link to='/sign-in' className={show ? 'login-mobile' : ''}>
            Log in
          </Link>}

          {auth && auth.access && auth.access.token?
             <Link to={'/dashboard'} className='btn login'>
              Dashboard
            </Link>
          : <Link to='/sign-up' className={show ? 'login-mobile' : ''}>
            Create an account
          </Link>}

        </ul>
      </div>
    </header>
  );
};
