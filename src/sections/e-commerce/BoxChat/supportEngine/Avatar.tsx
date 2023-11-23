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
        Hỗ trợ khách hàng
      </div>

      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => props.onClick && props.onClick()}
        className="transition-3"
        style={{
          ...styles.chatWithMeButton,
          ...{ border: hovered ? '1px solid #f9f0ff' : '4px solid #1184e2' },
        }}
      />
    </div>
  );
};

export default Avatar;
