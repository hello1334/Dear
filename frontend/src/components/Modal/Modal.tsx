import React from 'react';

import * as S from './ModalStyle';

interface ModalProps {
  title: string;
  isOpen?: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
}

const AcceptModal = ({ title, isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  const handleInnerDivClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
  };

  return (
    <S.Container onClick={onClose}>
      <S.Inner onClick={handleInnerDivClick}>
        <S.ModalTitle>{title}</S.ModalTitle>
        {children}
      </S.Inner>
    </S.Container>
  );
};

export default AcceptModal;
