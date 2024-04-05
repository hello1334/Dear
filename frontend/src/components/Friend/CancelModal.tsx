import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const CancelModal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  const handleInnerDivClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation(); // 이벤트 버블링 중단
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onClick={onClose}
    >
      <div
        onClick={handleInnerDivClick}
        style={{
          backgroundColor: 'rgb(34, 31, 31)',
          padding: '20px',
          borderRadius: '5px',
          width: '320px',
          height: '170px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default CancelModal;
