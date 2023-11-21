import { useState } from 'react';
import Avatar from './Avatar';
import { SupportWindow } from './supportWindow';

export default function SupportEngine() {
  const [visible, setVisible] = useState(false);
  return (
    <div className="absolute top-0">
      <SupportWindow visible={visible} />
      <Avatar
        onClick={() => setVisible(true)}
        style={{ position: 'fixed', bottom: '24px', right: '24px' }}
      />
    </div>
  );
}
