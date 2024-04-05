import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import defaultProfileImage from '@/assets/images/profile.png';
import useLetterStore from '@/store/letterStore';

import { instance } from '@/api/instance';

import AcceptModal from '@/components/Modal/Modal';
import SearchInput from '@/components/SearchInput/SearchInput';

import * as S from './ListStyle';

interface Friend {
  friendId: string;
  friendName: string;
  imageUrl?: string;
}

const List = () => {
  const [friendList, setFriendList] = useState<Friend[]>([]);
  const [saveNickname, setSaveNickname] = useState<string>('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [checkText, setCheckText] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');

  const navigate = useNavigate();
  const { setLetter } = useLetterStore((state) => ({
    setLetter: state.setLetter,
  }));

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('login-state')!).state;
    const storageNickname = user.nickname;
    if (storageNickname !== null) {
      setNickname(storageNickname);
    }
    instance
      .get(`/user/friends/myFriend`)
      .then((response) => {
        console.log('Data:', response.data); // 성공 시 데이터 출력
        setFriendList(response.data.data);
      })
      .catch((error) => {
        console.error('error', error);
      });
  }, []); // 빈 배열을 전달하여 컴포넌트 마운트 시에만 요청이 실행되도록 함

  const handleDelete = (friendName: string): void => {
    setIsDeleteModalOpen(true);
    setSaveNickname(friendName);
  };

  const goToDelete = (): void => {
    instance
      .put('/user/friends/delete', {
        fromUserNickname: saveNickname,
        toUserNickname: nickname,
      })
      .then((response) => {
        console.log('Data:', response.data); // 성공 시 데이터 출력
        console.log('삭제 요청을 성공하였습니다.');
        instance
          .get(`/user/friends/myFriend`)
          .then((response) => {
            console.log('Data:', response.data); // 성공 시 데이터 출력
            setFriendList(response.data.data);
          })
          .catch((error) => {
            console.error('error', error);
          });
        setIsDeleteModalOpen(false);
      })
      .catch((err) => {
        console.error('error', err);
      });
  };

  const backToDelete = () => {
    setIsDeleteModalOpen(false);
  };

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

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      searchFriend();
    }
  };

  return (
    <S.Container>
      <SearchInput
        value={checkText}
        placeholder="닉네임을 입력해주세요"
        handleOnKeyPress={handleKeyPress}
        handleInput={handleChange}
        handleOnClick={searchFriend}
      />
      <S.List>
        {friendList ? (
          friendList.map((friend) => (
            <S.ListItem key={friend.friendId}>
              <S.ListItemBox>
                {friend.imageUrl === 'null' ? (
                  <S.ImgBox src={defaultProfileImage} />
                ) : (
                  <S.ImgBox src={friend.imageUrl} />
                )}
                {friend.friendName}
              </S.ListItemBox>
              <S.ListItemBtn>
                <div>
                  <S.MailButton
                    onClick={() => {
                      setLetter({ dearNickname: friend.friendName });
                      setLetter({ dear: friend.friendName });
                      navigate('/letter');
                    }}
                  >
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="6" y="9" width="24" height="18" rx="2" stroke="white" />
                      <path
                        d="M6 13.5L17.1056 19.0528C17.6686 19.3343 18.3314 19.3343 18.8944 19.0528L30 13.5"
                        stroke="white"
                      />
                    </svg>
                  </S.MailButton>
                </div>
                <div>
                  <S.DeleteFriendButton onClick={() => handleDelete(friend.friendName)}>
                    <svg width="28" height="32" viewBox="0 0 28 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M22.0373 12.7388C22.0373 23.4308 23.384 28.2638 14.3262 28.2638C5.26731 28.2638 6.64175 23.4308 6.64175 12.7388"
                        stroke="#EC4E58"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M23.7593 8.6398H4.91711"
                        stroke="#EC4E58"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M18.334 8.6396C18.334 8.6396 18.9507 3.61865 14.3373 3.61865C9.72512 3.61865 10.3418 8.6396 10.3418 8.6396"
                        stroke="#EC4E58"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </S.DeleteFriendButton>
                </div>
              </S.ListItemBtn>
            </S.ListItem> // 각 친구의 이름을 리스트 아이템으로 표시
          ))
        ) : (
          <S.ListItem>Loading friends...</S.ListItem> // 데이터가 null일 때 로딩 메시지를 표시
        )}
      </S.List>
      <S.FriendAddButton to={`/friend/add`}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="10" cy="8" r="4" stroke="#121212" strokeLinecap="round" />
          <path
            d="M15.7956 20.4471C15.4537 19.1713 14.7004 18.0439 13.6526 17.2399C12.6047 16.4358 11.3208 16 10 16C8.6792 16 7.3953 16.4358 6.34743 17.2399C5.29957 18.0439 4.5463 19.1713 4.20445 20.4471"
            stroke="#121212"
            strokeLinecap="round"
          />
          <path d="M19 10L19 16" stroke="#121212" strokeLinecap="round" />
          <path d="M22 13L16 13" stroke="#121212" strokeLinecap="round" />
        </svg>
        친구추가
      </S.FriendAddButton>
      <AcceptModal title={'삭제하시겠습니까?'} isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
        <S.AnswerStrap>
          <S.YesButton onClick={goToDelete}>확인</S.YesButton>
          <S.NoButton onClick={backToDelete}>취소</S.NoButton>
        </S.AnswerStrap>
      </AcceptModal>
    </S.Container>
  );
};

export default List;
