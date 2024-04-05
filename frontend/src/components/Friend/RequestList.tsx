import { useEffect, useState } from 'react';

import defaultProfileImage from '@/assets/images/profile.png';

import { instance } from '@/api/instance';

import AcceptModal from '@/components/Modal/Modal';

import * as S from './RequestListStyle';

interface Friend {
  requestId: string;
  userId: string;
  status: string;
  imageUrl?: string;
  opponentNickname: string;
}

const RequestList = () => {
  const [sendData, setSendData] = useState<Friend[]>([]);
  const [receiveData, setReceiveData] = useState<Friend[]>([]);
  const [saveNickname, setSaveNickname] = useState<string>('');
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState<boolean>(false);
  const [isRefuseModalOpen, setIsRefuseModalOpen] = useState<boolean>(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState<boolean>(false);
  const [nickname, setNickname] = useState<string>('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('login-state')!).state;
    const storageNickname = user.nickname;
    if (storageNickname) {
      setNickname(storageNickname);
    }
    instance
      .get(`/user/friends/requests`)
      .then((response) => {
        console.log('Data:', response.data); // 성공 시 데이터 출력
        setSendData(response.data.data.sentRequests);
        setReceiveData(response.data.data.receivedRequests);
      })
      .catch((error) => {
        console.error('error', error);
      });
  }, []); // 빈 배열을 전달하여 컴포넌트 마운트 시에만 요청이 실행되도록 함

  const handleAcceptRequest = (opponentNickname: string): void => {
    setIsAcceptModalOpen(true);
    setSaveNickname(opponentNickname);
  };

  const goToAccept = () => {
    instance
      .post('/user/friends/requests/accept', {
        fromUserNickname: saveNickname,
        toUserNickname: nickname,
      })
      .then((response) => {
        console.log('Data:', response.data); // 성공 시 데이터 출력
        console.log('수락 요청을 성공하였습니다.');
        instance
          .get(`/user/friends/requests`)
          .then((response) => {
            console.log('Data:', response.data); // 성공 시 데이터 출력
            setSendData(response.data.data.sentRequests);
            setReceiveData(response.data.data.receivedRequests);
          })
          .catch((error) => {
            console.error('error', error);
          });
        setIsAcceptModalOpen(false);
      })
      .catch((err) => {
        console.error('error', err);
      });
  };

  const backToAccept = () => {
    setIsAcceptModalOpen(false);
  };

  const handleRefuseRequest = (opponentNickname: string): void => {
    setIsRefuseModalOpen(true);
    setSaveNickname(opponentNickname);
    console.log(opponentNickname);
    console.log(saveNickname);
    console.log('!!!!!!!!!!!!!!!!!!');
  };

  const goToRefuse = () => {
    instance
      .put('/user/friends/requests/refuse', {
        fromUserNickname: saveNickname,
        toUserNickname: nickname,
      })
      .then((response) => {
        console.log('Data:', response.data); // 성공 시 데이터 출력
        console.log('거절 요청을 성공하였습니다.');
        instance
          .get(`/user/friends/requests`)
          .then((response) => {
            console.log('Data:', response.data); // 성공 시 데이터 출력
            setSendData(response.data.data.sentRequests);
            setReceiveData(response.data.data.receivedRequests);
          })
          .catch((error) => {
            console.error('error', error);
          });
        setIsRefuseModalOpen(false);
      })
      .catch((err) => {
        console.error('error', err);
      });
  };

  const backToRefuse = () => {
    setIsRefuseModalOpen(false);
  };

  const handleCancelRequest = (opponentNickname: string): void => {
    setIsCancelModalOpen(true);
    setSaveNickname(opponentNickname);
  };

  const goToCancel = () => {
    instance
      .put('/user/friends/requests/cancel', {
        fromUserNickname: nickname,
        toUserNickname: saveNickname,
      })
      .then((response) => {
        console.log('Data:', response.data); // 성공 시 데이터 출력
        instance
          .get(`/user/friends/requests`)
          .then((response) => {
            console.log('Data:', response.data); // 성공 시 데이터 출력
            setSendData(response.data.data.sentRequests);
            setReceiveData(response.data.data.receivedRequests);
          })
          .catch((error) => {
            console.error('error', error);
          });
        setIsCancelModalOpen(false);
      })
      .catch((err) => {
        console.error('error', err);
      });
  };

  const backToCancel = () => {
    setIsCancelModalOpen(false);
  };

  return (
    <S.Container>
      <S.TextStyle>받은 요청</S.TextStyle>
      <S.List>
        {receiveData ? (
          receiveData.map((friend) => (
            <S.ListItem key={friend.opponentNickname}>
              <S.ListItemBox>
                {friend.imageUrl === 'null' ? (
                  <S.ImgBox src={defaultProfileImage} />
                ) : (
                  <S.ImgBox src={friend.imageUrl} />
                )}
                {friend.opponentNickname}
              </S.ListItemBox>
              <S.ListItemBtn>
                <S.CancelButton onClick={() => handleAcceptRequest(friend.opponentNickname)}>수락</S.CancelButton>
                <S.CancelButton onClick={() => handleRefuseRequest(friend.opponentNickname)}>거절</S.CancelButton>
              </S.ListItemBtn>
            </S.ListItem> // 각 친구의 이름을 리스트 아이템으로 표시
          ))
        ) : (
          <S.ListItem>Loading friends...</S.ListItem> // 데이터가 null일 때 로딩 메시지를 표시
        )}
        <S.HrTag />
        <S.TextStyle>보낸 요청</S.TextStyle>
        {sendData ? (
          sendData.map((friend) => (
            <S.ListItem key={friend.opponentNickname}>
              <S.ListItemBox>
                {friend.imageUrl === 'null' ? (
                  <S.ImgBox src={defaultProfileImage} />
                ) : (
                  <S.ImgBox src={friend.imageUrl} />
                )}
                {friend.opponentNickname}
              </S.ListItemBox>
              <S.ListItemBtn>
                <S.CancelButton onClick={() => handleCancelRequest(friend.opponentNickname)}>취소</S.CancelButton>
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
      <AcceptModal
        title={'친구 요청을 수락하시겠습니까?'}
        isOpen={isAcceptModalOpen}
        onClose={() => setIsAcceptModalOpen(false)}
      >
        <S.AnswerStrap>
          <S.YesButton
            onClick={() => {
              goToAccept();
              setIsAcceptModalOpen(false);
            }}
          >
            예
          </S.YesButton>
          <S.NoButton
            onClick={() => {
              backToAccept();
              setIsAcceptModalOpen(false);
            }}
          >
            아니오
          </S.NoButton>
        </S.AnswerStrap>
      </AcceptModal>
      <AcceptModal
        title={'친구 요청을 거절하시겠습니까?'}
        isOpen={isRefuseModalOpen}
        onClose={() => setIsRefuseModalOpen(false)}
      >
        <S.AnswerStrap>
          <S.YesButton onClick={goToRefuse}>확인</S.YesButton>
          <S.NoButton onClick={backToRefuse}>취소</S.NoButton>
        </S.AnswerStrap>
      </AcceptModal>
      <AcceptModal
        title={'친구 요청을 취소하시겠습니까?'}
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
      >
        <S.AnswerStrap>
          <S.YesButton onClick={goToCancel}>확인</S.YesButton>
          <S.NoButton onClick={backToCancel}>취소</S.NoButton>
        </S.AnswerStrap>
      </AcceptModal>
    </S.Container>
  );
};

export default RequestList;
