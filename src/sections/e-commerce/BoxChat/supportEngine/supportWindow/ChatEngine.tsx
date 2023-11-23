import React, { useEffect, useState } from 'react';

// @ts-ignore
import * as ReactChatEngine from 'react-chat-engine';

const ChatEngine = (props: any) => {
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    if (props.visible) {
      setTimeout(() => {
        setShowChat(true);
      }, 500);
    }
  });

  return (
    <div
      className="transition-5"
      style={{
        ...styles.chatEngineWindow,
        ...{
          height: props.visible ? '100%' : '0px',
          zIndex: props.visible ? '100' : '0',
        },
      }}
    >
      {showChat && (
        <ReactChatEngine.ChatEngineWrapper>
          <ReactChatEngine.Socket
            projectID={process.env.REACT_APP_CE_PROJECT_ID}
            userName={props.user.email}
            userSecret={props.user.email}
          />
          <ReactChatEngine.ChatFeed activeChat={props.chat.id} />
        </ReactChatEngine.ChatEngineWrapper>
      )}
    </div>
  );
};

export default ChatEngine;

const styles = {
  chatEngineWindow: {
    width: '100%',
    backgroundColor: '#fff',
  },
};
