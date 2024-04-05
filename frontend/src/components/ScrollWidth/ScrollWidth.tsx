import { useState, useEffect } from 'react';

import { IoMdArrowDropright, IoMdArrowDropleft } from 'react-icons/io';

import * as S from './ScrollWidthStyle';
import { useIsOverflow } from './userIsOverflow';

type ItemType = {
  icon: string;
  title: string;
};
interface LetterData {
  dear: string;
  from: string;
  background: string;
  emotion: string;
  characteristics: string[];
  memories: string[];
  options: string[];
  [key: string]: string | string[] | undefined;
}

interface ScrollWidthProps {
  name: string;
  items: ItemType[];
  data: LetterData;
  setData: (update: Partial<LetterData>) => void;
}

const ScrollWidth = ({ name, items, data, setData }: ScrollWidthProps) => {
  const [ref, isOverflow] = useIsOverflow<HTMLDivElement>();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleNextButtonClick = (nextType: 'prev' | 'next') => {
    if (!ref.current) return;
    const scrollAmount = ref.current.offsetWidth;
    const newScrollPosition =
      nextType === 'prev' ? ref.current.scrollLeft - scrollAmount : ref.current.scrollLeft + scrollAmount;

    ref.current.scrollTo({
      left: newScrollPosition,
      behavior: 'smooth',
    });
  };
  useEffect(() => {
    if (data && name && data[name] && items.length > 0) {
      const activeItem = items.find((item) => item.title === data[name]);
      if (activeItem) {
        setActiveIndex(items.indexOf(activeItem));
      }
    }
  }, [data, name, items]);
  const handleButtonClick = (index: number, title: string) => {
    setActiveIndex(index);
    setData({ [name]: title });
  };

  return (
    <S.TypesContainer>
      {isOverflow && (
        <S.ArrowButton onClick={() => handleNextButtonClick('prev')}>
          <IoMdArrowDropleft size={30} color="white" />
        </S.ArrowButton>
      )}
      <S.TypeContainer ref={ref}>
        {items.map((item, index) => (
          <S.TypeButtonWrapper key={index}>
            <S.TypeButton $isActive={index === activeIndex} onClick={() => handleButtonClick(index, item.title)}>
              <S.ButtonImage src={item.icon} alt="button image" />
            </S.TypeButton>
            <S.TypeTitle>{item.title}</S.TypeTitle>
          </S.TypeButtonWrapper>
        ))}
      </S.TypeContainer>
      {isOverflow && (
        <S.ArrowButton onClick={() => handleNextButtonClick('next')}>
          <IoMdArrowDropright size={30} color="white" />
        </S.ArrowButton>
      )}
    </S.TypesContainer>
  );
};

export default ScrollWidth;
