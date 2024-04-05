import React, { createContext, useEffect, useState } from 'react';

import SockJS from 'sockjs-client/dist/sockjs.min.js';
import Stomp, { Client } from 'webstomp-client';

import newStampStore from '@/store/newStampStore';
import userStore from '@/store/userStore';

import { instance } from '@/api/instance';

type Stamp = {
  stamp: string;
  dear: string;
  from: string;
  letterId: number;
  letter: string;
  music: string;
  musicTitle: string;
  createAt: string;
};

export const SocketContext = createContext<Client | null>(null);

const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const { nickname } = userStore();
  const { setStamp } = newStampStore();

  const recvStamp = (stamp: Stamp) => {
    console.log('stamp: ', stamp);
    setStamp(stamp);
  };

  const connectSocket = () => {
    const domain = import.meta.env.VITE_HOST === 'localhost' ? 'http://localhost:8020' : 'https://dear103.store:8020';
    const socket = new SockJS(`${domain}/ws/notification`);
    const stomp = Stomp.over(socket);
    const queryString = encodeURIComponent(nickname || '');

    stomp.connect({}, () => {
      stomp.subscribe(`/topic/notification/${queryString}`, (message) => {
        recvStamp(JSON.parse(message.body));
      });
    });

    setStompClient(stomp);
  };

  useEffect(() => {
    if (!['/login', '/login/google', '/login/naver', '/login/kakao'].includes(window.location.pathname)) {
      connectSocket();
      instance
        .get('/letter/stamps/unRead')
        .then((res) => {
          if (res && res.data) {
            console.log('!!!!!!!!!!', res.data);
            newStampStore.setState({ stamps: [] });
            res.data.data.map((stamp: Stamp) => {
              setStamp(stamp);
            });
          }
        })
        .catch(() => {});
    }
    return () => {
      if (stompClient) {
        stompClient.disconnect();
        setStompClient(null);
      }
    };
  }, []);

  return <SocketContext.Provider value={stompClient}>{children}</SocketContext.Provider>;
};

export default SocketProvider;
