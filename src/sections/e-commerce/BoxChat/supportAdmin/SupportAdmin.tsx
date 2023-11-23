import React from 'react';

// @ts-ignore
import * as ReactChatEngine from 'react-chat-engine';

const SupportAdmin = () => {
  return (
    <ReactChatEngine.ChatEngine
      projectID={process.env.REACT_APP_CE_PROJECT_ID}
      userName="Kisakiii"
      userSecret="1510Tr0ng@"
      height="calc(100vh - 12px)"
    />
  );
};

export default SupportAdmin;
