import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const Spinner = () => {
  return (
    <div>
      <FontAwesomeIcon icon={faSpinner} size="5x" className="spin" />
    </div>
  )
};

export default Spinner;
