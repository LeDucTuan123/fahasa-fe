import React, { useState } from 'react';

import { styles } from '../Styles';

import axios from 'axios';

import { LoadingOutlined } from '@ant-design/icons';

import Avatar from '../Avatar';

const EmailForm = (props: any) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [isEmailError, setIsEmailError] = useState(true);

  function getOrCreateUser(callback: any) {
    axios
      .put(
        'https://api.chatengine.io/users/',
        { username: email, email: email, secret: email },
        { headers: { 'Private-Key': process.env.REACT_APP_CE_PRIVATE_KEY } },
      )
      .then((r) => callback(r.data))
      .catch((e) => console.log('Get or create user error', e));
  }

  function getOrCreateChat(callback: any) {
    axios
      .put(
        'https://api.chatengine.io/chats/',
        { usernames: [email, 'Supporter'], is_direct_chat: true },
        {
          headers: {
            'Project-ID': process.env.REACT_APP_CE_PROJECT_ID,
            'User-Name': email,
            'User-Secret': email,
          },
        },
      )
      .then((r) => callback(r.data))
      .catch((e) => console.log('Get or create chat error', e));
  }

  function handleSubmit(event: any) {
    event.preventDefault();
    if (isEmailError === false) {
      setLoading(true);
      getOrCreateUser((user: any) => {
        props.setUser(user);
        getOrCreateChat((chat: any) => props.setChat(chat));
      });
    }
  }

  const validateEmail = (inputEmail: any) => {
    // Biểu thức chính quy để kiểm tra định dạng email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(inputEmail)) {
      setIsEmailError(false); // Địa chỉ email hợp lệ, không có lỗi
      return true;
    } else {
      setIsEmailError(true);
      return false;
    }
  };

  const handleEmailChange = (e: any) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    validateEmail(newEmail);
  };
  return (
    <div
      style={{
        ...styles.emailFormWindow,
        ...{
          height: props.visible ? '100%' : '0px',
          display: props.visible ? 'block' : 'none',
        },
      }}
    >
      <div style={{ height: '0px' }}>
        <div style={styles.stripe} />
      </div>

      <div
        className="transition-5"
        style={{
          ...styles.loadingDiv,
          ...{
            zIndex: loading ? '10' : '-1',
            opacity: loading ? '0.33' : '0',
          },
        }}
      />

      <LoadingOutlined
        className="transition-5"
        style={{
          ...styles.loadingIcon,
          ...{
            zIndex: loading ? '10' : '-1',
            opacity: loading ? '1' : '0',
            fontSize: '82px',
            top: 'calc(50% - 41px)',
            left: 'calc(50% - 41px)',
          },
        }}
      />

      <div style={{ position: 'absolute', height: '100%', width: '100%', textAlign: 'center' }}>
        <Avatar
          style={{
            position: 'relative',
            left: 'calc(50% - 44px)',
            top: '10%',
          }}
        />

        <div style={styles.topText}>
          Hỗ trợ trực tuyến <br /> Giải đáp thắc mắc
        </div>

        <form
          onSubmit={(e) => handleSubmit(e)}
          style={{ position: 'relative', width: '100%', top: '19.75%' }}
        >
          <input
            placeholder="Điền Email"
            onChange={handleEmailChange}
            style={styles.emailInput}
            type="email"
          />
        </form>

        <div style={styles.bottomText}>
          Nhập Email của bạn
          <br /> Để chúng tôi có thể hỗ trợ
        </div>
      </div>
    </div>
  );
};

export default EmailForm;
