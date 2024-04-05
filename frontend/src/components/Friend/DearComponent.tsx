import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import defaultProfileImage from '@/assets/images/profile.png';
import useLetterStore from '@/store/letterStore';

import { instance } from '@/api/instance';

import SearchInput from '@/components/SearchInput/SearchInput';

import * as S from './DearComponentStyle';

interface Friend {
  friendId: string;
  friendName: string;
  imageUrl: string;
}

const DearComponent = () => {
  const [friendList, setFriendList] = useState<Friend[]>([]);
  const [checkText, setCheckText] = useState<string>('');

  const navigate = useNavigate();
  const { setLetter } = useLetterStore((state) => ({
    setLetter: state.setLetter,
  }));

  useEffect(() => {
    instance
      .get(`/user/friends/myFriend`)
      .then((response) => {
        console.log('Data:', response.data);
        setFriendList(response.data.data);
      })
      .catch((error) => {
        console.error('error', error);
      });
  }, []); // 빈 배열을 전달하여 컴포넌트 마운트 시에만 요청이 실행되도록 함

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckText(e.target.value);
  };

  const searchFriend = () => {
    instance
      .get(`/user/friends/myFriend`)
      .then((response) => {
        console.log('Data:', response.data); // 성공 시 데이터 출력
        const getFriendList = response.data.data;
        const searchFriendData = getFriendList.filter((friend: { friendName: string | string[] }) =>
          friend.friendName.includes(checkText),
        );
        setFriendList(searchFriendData);
      })
      .catch((error) => {
        console.error('error', error);
      });
  };
  const selectFriend = (name: string) => {
    navigate('/letter');
    setLetter({ dearNickname: name });
    setLetter({ dear: name });
  };

  return (
    <S.Container>
      <SearchInput
        value={checkText}
        placeholder="닉네임을 입력해주세요."
        handleInput={handleChange}
        handleOnClick={searchFriend}
      />
      <S.List>
        {friendList ? (
          friendList.map((friend) => (
            <S.ListItem
              onClick={() => {
                selectFriend(friend.friendName);
              }}
              key={friend.friendId}
            >
              <S.ListItemBox>
                {friend.imageUrl === 'null' ? (
                  <S.ImgBox src={defaultProfileImage} />
                ) : (
                  <S.ImgBox src={friend.imageUrl} />
                )}
                {friend.friendName}
              </S.ListItemBox>
            </S.ListItem> // 각 친구의 이름을 리스트 아이템으로 표시
          ))
        ) : (
          <S.ListItem>Loading friends...</S.ListItem>
        )}
      </S.List>
    </S.Container>
  );
};

export default DearComponent;
