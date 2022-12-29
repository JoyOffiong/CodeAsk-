import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import '../../stylesheets/shared.css';
import LoggedInHeaderMobile from './LoggedInHeaderMobile';
import { useAuth } from "../../components/hooks/useAuth.js";

import { useNavigate } from "react-router-dom";


export const LoggedInHeader = () => {
  const { user, setSearchField } = useAuth();
  const navigate = useNavigate();

  const handleChange = e => {
    setSearchField(e.target.value);
    navigate("/questions");
  };


  return (
    <React.Fragment>
      <header className={'question-header'}>
         <div className='search'>
          <FontAwesomeIcon icon={faSearch} className='search-icon' />
          <input type="search" placeholder="Search..."  onChange = {handleChange}/>
        </div> 
        <div className='notification'>
          <FontAwesomeIcon icon={faBell} />
          <Link to="/dashboard"><img src={user.profile_image} alt='' className='userAvatar' /></Link>
        </div>
      </header>
      <LoggedInHeaderMobile />
    </React.Fragment>
  );
};
