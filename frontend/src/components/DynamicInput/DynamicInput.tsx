import { useRef, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import * as S from './DynamicInputStyle';

interface DynamicInputProps {
  data: string;
  setData: (update: Partial<LetterData>) => void;
  title: string;
  color: string;
  buttonType: boolean;
  onClick?: () => void;
}

const DynamicInput = ({ data, setData, title, color, buttonType, onClick }: DynamicInputProps) => {
  const [inputValue, setInputValue] = useState('');
  const [fontWidth, setFontWidth] = useState(0);
  const spanRef = useRef<HTMLSpanElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setInputValue(data);
  }, [data]);

  useEffect(() => {
    if (spanRef.current) {
      const width = spanRef.current.getBoundingClientRect().width;
      setFontWidth(width);
    }
  }, [inputValue]);

  const handleInputSave = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (newValue.length > 7) {
      toast.error('7글자를 넘을 수 없습니다.');
    } else {
      setInputValue(newValue);
      setData({ [title.toLowerCase()]: newValue });
    }
  };

  const handleWrapperClick = () => {
    if (onClick) {
      onClick();
    }
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  return (
    <S.ButtonWrapper $buttonType={buttonType} $color={color} onClick={handleWrapperClick}>
      <S.DynamicTitle $buttonType={buttonType} $color={color}>
        {title}
      </S.DynamicTitle>
      <S.DynamicSpace ref={spanRef}>{inputValue}</S.DynamicSpace>
      <S.DynamicInput
        ref={inputRef}
        $buttonType={buttonType}
        $color={color}
        $fontWidth={fontWidth}
        type="text"
        value={inputValue}
        onChange={handleInputSave}
      />
    </S.ButtonWrapper>
  );
};

export default DynamicInput;
