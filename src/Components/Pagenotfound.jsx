import React from 'react';

const Pagenotfound = () => {
    return (
      <div>
        <div className="text-danger">
          Page not found. Go to <a href='/home' className="text-underline text-primary">Home?</a>
        </div>
      </div>
    );
};

export default Pagenotfound;