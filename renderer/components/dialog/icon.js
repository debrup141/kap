import React from 'react';

const Icon = () => {
  return (
    <div>
      <img src="/static/kap-icon.png"/>
      <style jsx>{`
        img {
          width: 58px;
          height: 58px;
        }

        div {
          padding: 24px;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
};

export default Icon;
