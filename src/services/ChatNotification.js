import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-extraneous-dependencies
import toast, { Toaster } from 'react-hot-toast';

import { io as socketIO } from 'socket.io-client';

// @mui
import { Box, Typography } from '@mui/material';

import { useLocation, useNavigate } from 'react-router-dom';

import { SendRequest, onMessageListener } from '../firebase/index';
import { useDispatch } from '../redux/store';

import NotificationAudio from '../audios/notification.wav';

export default function ChatNotification() {
  const dispatch = useDispatch();

  const { pathname } = useLocation();

  const audio = new Audio(NotificationAudio);

  const [notification, setNotification] = useState({ title: '', body: '' });
  const notify = () => toast(<ToastDisplay notification={notification} />);

  useEffect(() => {
    if (notification?.title) {
      notify();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notification]);

  SendRequest();

  useEffect(() => {
    const getNewMessage = async () => {
      // const newMessage = await onMessageListener();
      onMessageListener().then((newMessage) => {
        console.log(newMessage);
        if (!pathname.startsWith('/dashboard/customer_support')) {
          setNotification({
            title: newMessage?.notification?.title,
            body: newMessage?.notification?.body,
          });
        }
      });
    };
    getNewMessage();
    return () => {};
  });

  return <Toaster />;
}

ToastDisplay.propTypes = {
  notification: PropTypes.object,
};
function ToastDisplay({ notification }) {
  const navigate = useNavigate();
  return (
    <Box onClick={() => navigate('/dashboard/customer_support')}>
      <Typography>
        <b>{notification?.title}</b>
      </Typography>
      <Typography>{notification?.body}</Typography>
    </Box>
  );
}
