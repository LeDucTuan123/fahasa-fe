import React, { useState } from 'react';

import { styles } from './Styles';

const Avatar = (props: any) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div style={props.style}>
      <div
        className="transition-3"
        style={{
          ...styles.avatarHello,
          ...{ opacity: hovered ? '1' : '0' },
        }}
      >
        Hey it's Adam 🤙
      </div>

      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => props.onClick && props.onClick()}
        className="transition-3 hover:bg-black"
        style={{
          ...styles.chatWithMeButton,
          ...{ border: hovered ? '1px solid #f9f0ff' : '4px solid #7a39e0' },
        }}
      />
    </div>
  );
};

export default Avatar;
