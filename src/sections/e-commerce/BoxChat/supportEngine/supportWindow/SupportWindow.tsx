import React, { useState } from 'react';
import { styles } from '../Styles';
import EmailForm from './EmailForm';
import ChatEngine from './ChatEngine';
const SupportWindow = (props: any) => {
  const [user, setUser] = useState(null);
  const [chat, setChat] = useState(null);
  return (
    <div
      className="transition-5"
      style={{ ...styles.supportWindow, ...{ display: props.visible ? 'flex' : 'none' } }}
    >
      <EmailForm
        setUser={(user: any) => setUser(user)}
        setChat={(chat: any) => setChat(chat)}
        visible={user === null || chat === null}
      />

      <ChatEngine
        visible={user !== null && chat !== null}
        user={user}
        chat={chat}
      />
    </div>
  );
};

export default SupportWindow;
