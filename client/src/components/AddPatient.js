import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const AddPatient = () => {
    const location = useLocation();
  return (
    <div>
      <button><Link to={`/user-info/${location.state.info}`}>Add Patient</Link></button>
    </div>
  )
}

export default AddPatient
