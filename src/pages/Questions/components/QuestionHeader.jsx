import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from "../../../components/hooks/useAuth";

const QuestionHeader = () => {

  const { auth } = useAuth();

  return (
    <div className='questions-header' id='questionHeader'>
      <div className='question-link'>
        <Link to='#'>Find questions</Link>
      </div>
      <div className='question-button'>

      {auth && auth.access && auth.access.token ?  <Link to='/ask-question'>Ask Question</Link> : null }
       
      </div>
    </div>
  );
};

export default QuestionHeader;
