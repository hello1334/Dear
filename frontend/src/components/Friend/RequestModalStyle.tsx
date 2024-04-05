import styled from 'styled-components';

export const Container = styled.div`
  position: 'fixed';
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: 'rgba(0, 0, 0, 0.5)';
  display: 'flex';
  justify-content: 'center';
  align-items: 'center';
  z-index: 3;
`;

export const Inner = styled.div`
  background-color: 'rgb(34, 31, 31)';
  padding: '20px';
  border-radius: '5px';
  z-index: 5;
`;

export const CloseButton = styled.button``;
