import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Inner = styled.div`
  background-color: #1d2026;
  padding: 20px 30px;
  margin: 0 20px;
  min-width: 310px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const ModalTitle = styled.div`
  font-size: 18px;
  margin: 20px 0px 30px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  white-space: pre-wrap;
`;

export const CloseButton = styled.button``;
