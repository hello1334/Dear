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
  background-color: rgb(34, 31, 31);
  padding-top: 20px;
  padding-bottom: 30px;
  padding-left: 30px;
  padding-right: 30px;
  border-radius: 15px;
  display: flex;
  justify-content: center;
`;

export const InnerTextBox = styled.div`
  display: flex;
  justify-content: center;
`;

export const InnerText = styled.p`
  font-size: 2rem;
  font-weight: 700;
  margin-top: 3rem;
  margin-bottom: 1rem;
`;

export const InnerSubTextBox = styled.div`
  display: flex;
  justify-content: center;
`;

export const InnerSubText = styled.p`
  font-size: 1.5rem;
  margin-top: 1rem;
  margin-bottom: 5rem;
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
