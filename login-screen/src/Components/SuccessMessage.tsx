import React from 'react';

const SuccessMessage: React.FC = () => {
  return (
    <div className="success-message">
      <h2>Password Successfully Reset!</h2>
      <p>You can now use your new password to log in.</p>
    </div>
  );
};

export default SuccessMessage;
