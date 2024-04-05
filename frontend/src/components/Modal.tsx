import React from 'react';

import * as S from './ModalStyle';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const AcceptModal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  const handleInnerDivClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation(); // 이벤트 버블링 중단
  };

  return (
    <S.Container onClick={onClose}>
      <S.Inner onClick={handleInnerDivClick}>{children}</S.Inner>
    </S.Container>
  );
};

export default AcceptModal;
