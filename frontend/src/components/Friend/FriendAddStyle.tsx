import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: calc(var(--vh, 1vh) * 100 - 60px);
  padding: 0 ${({ theme }) => theme.pagePadding};
`;

export const HeadText = styled.div`
  width: 250px;
  font-weight: bold;
  font-family: sans-serif;
  line-height: 1.5;
  font-size: 24px;
  margin-left: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const SearchBox = styled.div`
  display: flex;
  background-color: rgb(51, 54, 63);
  border-radius: 15px;
  /* justify-content: center; */
  align-items: center;
  height: 45px;
  margin-top: 3px;
  margin-bottom: 10px;
  /* margin-left: 20px;
  margin-right: 20px; */
`;

export const SearchButton = styled.button`
  margin-left: 10px;
  margin-top: 10px;
`;

export const InputTag = styled.input`
  margin-left: 10px;
  background: none;
  border: none;
  outline: none;
  color: white;
`;

export const List = styled.div`
  overflow-y: auto;

  /* 스크롤바의 전체 컨테이너 스타일링 */
  &::-webkit-scrollbar {
    width: 8px; /* 스크롤바의 너비 */
  }

  /* 스크롤바 트랙 (바탕) 스타일링 */
  &::-webkit-scrollbar-track {
    background: black; /* 트랙의 배경색 */
  }

  /* 스크롤바 핸들 (움직이는 부분) 스타일링 */
  &::-webkit-scrollbar-thumb {
    background: #888; /* 핸들의 배경색 */
    border-radius: 4px; /* 핸들의 둥근 모서리 */
  }

  /* 스크롤바 핸들 위에 마우스를 올렸을 때 */
  &::-webkit-scrollbar-thumb:hover {
    background: #555; /* 핸들의 배경색 변경 */
  }
`;

export const ListItem = styled.div`
  display: flex;
  /* justify-content: center; */
  justify-content: space-between;
  align-items: center;
  /* border-bottom: 1px solid white; */
  margin: 0 10px;
`;

export const ListItemBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

export const ImgBox = styled.img`
  border-radius: 50%;
  width: 50px;
  height: 50px;
  margin-right: 25px;
`;

export const NicknameBox = styled.span``;

export const ListItemBtn = styled.div`
  margin-right: 20px;
`;

export const AddButton = styled.button``;

export const DeleteFriendButton = styled.button``;

export const ModalInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const AnswerStrap = styled.div`
  display: flex;
`;

export const YesButton = styled.button`
  width: 139px;
  height: 50px;
  background-color: rgb(253, 243, 231);
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  color: black;
  margin-right: 10px;
`;

export const NoButton = styled.button`
  width: 139px;
  height: 50px;
  background-color: rgb(34, 31, 31);
  border: 1px solid rgb(253, 243, 231);
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  color: rgb(253, 243, 231);
  margin-left: 10px;
`;
