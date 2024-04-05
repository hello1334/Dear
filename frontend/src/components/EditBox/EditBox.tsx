import { useState, useRef, useEffect, ChangeEvent } from 'react';

import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';

import * as S from './EditBoxStyle';

type EditBoxProps = {
  editStatus: boolean;
  text: string;
  setText: (text: string) => void;
};
const EditBox = ({ editStatus, text, setText }: EditBoxProps) => {
  const [editable, setEditable] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setEditable(editStatus);
  }, [editStatus]);
  const editOn = () => {
    setEditable(true);
  };
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };
  const deleteText = () => {
    setText('');
    setEditable(false);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (editable == true && ref.current && !ref.current.contains(e.target as Node)) setEditable(false);
  };

  const adjustHeight = () => {
    const textarea = textRef.current;
    if (!textarea) return;
    else {
      textarea.style.height = 'auto'; // Reset height to recalculate
      textarea.style.height = `${textarea.scrollHeight}px`; // Set to content height
    }
  };
  useEffect(() => {
    const textarea = textRef.current;
    window.addEventListener('click', handleClickOutside, true);
    if (textarea) {
      textarea.addEventListener('input', adjustHeight);
      adjustHeight();
      return () => textarea.removeEventListener('input', adjustHeight);
    }
  });
  return (
    <>
      <S.EditTitleWrapper>
        <S.EditTitle>편지 내용 생성 결과 </S.EditTitle>
        <S.EditButtonBox>
          <FaRegEdit onClick={editOn} />
          <FaRegTrashAlt onClick={deleteText} />
        </S.EditButtonBox>
      </S.EditTitleWrapper>
      <S.EditBoxContainer>
        <S.EditTextWrapper ref={ref}>
          {editable ? (
            <S.EditTextBox
              ref={textRef}
              value={text}
              onChange={handleChange}
              onBlur={() => setEditable(false)}
              autoFocus
            />
          ) : (
            <S.EditTextBox ref={textRef} value={text} readOnly />
          )}
        </S.EditTextWrapper>
      </S.EditBoxContainer>
    </>
  );
};

export default EditBox;
