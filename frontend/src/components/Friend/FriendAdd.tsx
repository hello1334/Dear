import React, { useState, useEffect } from 'react';

import defaultProfileImage from '@/assets/images/profile.png';

import { instance } from '@/api/instance';

import AcceptModal from '@/components/Modal/Modal';
import SearchInput from '@/components/SearchInput/SearchInput';

import * as S from './FriendAddStyle';

interface Friend {
  friendName: string;
  imageUrl: string;
}

const FriendAdd = () => {
  const [friendData, setFriendData] = useState<Friend[]>([]);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState<boolean>(false);
  const [checkText, setCheckText] = useState<string>('');
  const [saveNickname, setSaveNickname] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('login-state')!).state;
    const storageNickname = user.nickname;
    if (storageNickname !== null) {
      setNickname(storageNickname);
    }
  }, []); // 빈 배열을 전달하여 컴포넌트 마운트 시에만 요청이 실행되도록 함

  const findFriend = () => {
    instance
      .post('/user/friends', {
        nickname: checkText,
      })
      .then((res) => {
        if (res.data && res.data.data) {
          const tmp: Friend[] = [];
          res.data.data.map((friend: Friend) => {
            const wantUser = { friendName: friend.friendName, imageUrl: friend.imageUrl };
            tmp.push(wantUser);
          });
          setFriendData(tmp);
        }
      })
      .catch(() => {});

    setCheckText('');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      findFriend();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckText(e.target.value);
  };

  const handleAdd = (friendName: string): void => {
    setSaveNickname(friendName);
    setIsRequestModalOpen(true);
  };

  const goToRequest = (): void => {
    instance
      .post('/user/friends/requests', {
        fromUserNickname: nickname,
        toUserNickname: saveNickname,
      })
      .then((response) => {
        console.log('Data:', response.data); // 성공 시 데이터 출력
        if (response.data.code === 200) {
          console.log('친구 신청을 성공하였습니다.');
          const removeFriendInArray = friendData.filter((fd) => fd.friendName !== saveNickname);
          setFriendData(removeFriendInArray);

          setIsRequestModalOpen(false);
        }
      })
      .catch((err) => {
        console.error('error', err);
        setIsRequestModalOpen(false);
      });
  };

  const backToRequest = () => {
    setIsRequestModalOpen(false);
  };

  return (
    <S.Container>
      <S.HeadText>친구를 찾아보세요!</S.HeadText>
      <SearchInput
        value={checkText}
        placeholder="닉네임을 입력해주세요"
        handleOnKeyPress={handleKeyPress}
        handleInput={handleChange}
        handleOnClick={findFriend}
      />
      <S.List>
        {friendData ? (
          friendData.map((friend) => (
            <S.ListItem key={friend.friendName}>
              <S.ListItemBox>
                <S.ImgBox src={defaultProfileImage} />
                {friend.friendName}
              </S.ListItemBox>
              <S.ListItemBtn>
                <S.AddButton
                  onClick={() => {
                    handleAdd(friend.friendName);
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="10" cy="8" r="4" stroke="#ffffff" strokeLinecap="round" />
                    <path
                      d="M15.7956 20.4471C15.4537 19.1713 14.7004 18.0439 13.6526 17.2399C12.6047 16.4358 11.3208 16 10 16C8.6792 16 7.3953 16.4358 6.34743 17.2399C5.29957 18.0439 4.5463 19.1713 4.20445 20.4471"
                      stroke="#ffffff"
                      strokeLinecap="round"
                    />
                    <path d="M19 10L19 16" stroke="#ffffff" strokeLinecap="round" />
                    <path d="M22 13L16 13" stroke="#ffffff" strokeLinecap="round" />
                  </svg>
                </S.AddButton>
              </S.ListItemBtn>
            </S.ListItem> // 각 친구의 이름을 리스트 아이템으로 표시
          ))
        ) : (
          <S.ListItem>Loading friends...</S.ListItem> // 데이터가 null일 때 로딩 메시지를 표시
        )}
      </S.List>
      <AcceptModal
        title={'친구 신청을 하시겠습니까?'}
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
      >
        <S.AnswerStrap>
          <S.YesButton onClick={goToRequest}>확인</S.YesButton>
          <S.NoButton onClick={backToRequest}>취소</S.NoButton>
        </S.AnswerStrap>
      </AcceptModal>
    </S.Container>
  );
};

export default FriendAdd;
