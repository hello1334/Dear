import styled from 'styled-components';

export const ContentContainer = styled.div<{ $isSelected: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  min-width: 100px;
  height: 150px;
  margin: 8px;
  border-radius: 8px;
  padding: 8px;
  color: ${(props) => (props.$isSelected ? '#33363F' : 'white')};
  background-color: ${(props) => (props.$isSelected ? '#fdf3e7' : '#33363F')};
  c &:hover {
    cursor: pointer;
  }
`;
export const Image = styled.img`
  width: 100%;
  height: 100%;
`;
export const ToolBarContainer = styled.div`
  display: flex;
  width: 100%;
  position: relative;
`;
export const ArrowLeftButtonWrapper = styled.div`
  position: absolute;
  //부모 중앙 위치
  top: 40%;
  left: -20px;
`;
export const ArrowRightButtonWrapper = styled.div`
  position: absolute;
  //부모 중앙 위치
  top: 40%;
  right: -20px;
`;
export const ToolBarContentsContainer = styled.div`
  display: flex;

  overflow-x: auto;
  scroll-behavior: smooth;
  -webkit-scrollbar: no-button;
  &::-webkit-scrollbar {
    display: none;
  }
`;
export const FontHeadLine = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 8px;
`;

export const FontWrapper = styled.div<{ $fontName: string }>`
  font-family: ${(props) => `"${props.$fontName}", sans-serif`};
`;

export const MusicLoadingWrapper = styled.div`
  width: 100%;
  display: flex;
  margin-left: 15px;
  justify-content: center;
  align-items: center;
`;
export const MusicWrapper = styled.div`
  display: flex;
  width: 100%;
  margin-left: 40px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Button = styled.button`
  width: 300px;
  color: #fdf3e7;
  height: 5rem;
  border: 1px solid #fdf3e7;
  font-size: 1.8rem;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
`;
