import React from 'react';
import { useParams } from 'react-router-dom';

const EdifForm = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Edit Form Placeholder component</h1>
      {id ? <p style={{ color: 'red' }}>Id: {id}</p> : <p>NO ID so we will need to 404!</p>}
    </div>
  );
};

export default EdifForm;
