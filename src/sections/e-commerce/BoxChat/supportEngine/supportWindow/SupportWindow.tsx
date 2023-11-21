import React from 'react';
import { styles } from '../Styles';
const SupportWindow = (props: any) => {
  return <div style={{ ...styles.supportWindow, ...{ opacity: props.visible ? '1' : '0' } }}></div>;
};

export default SupportWindow;
