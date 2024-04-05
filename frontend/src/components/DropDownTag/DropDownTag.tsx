import { useEffect, useState } from 'react';

import * as S from './DropDownTagStyle';

interface DropDownTagProps {
  name: string;
  items: {
    icon: string;
    title: string;
    color: string;
    tag: string[];
  };
  data: LetterData;
  setData: (update: Partial<LetterData>) => void;
}

const DropDownTag = ({ name, items, data, setData }: DropDownTagProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tag, setTag] = useState<string[]>(items.tag);
  const [selectedItem, setSelectedItem] = useState<string[]>(data[name] as string[]);

  const toggling = () => setIsOpen(!isOpen);

  useEffect(() => {
    setData({ [name]: selectedItem });
  }, [selectedItem, name, setData]);

  const onOptionClicked = (item: string) => () => {
    if (selectedItem.includes(item)) {
      setSelectedItem(selectedItem.filter((tag) => tag !== item));
    } else {
      setSelectedItem([...selectedItem, item]);
    }
  };
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const inputValue = event.currentTarget.value;
      if (inputValue !== '' && !tag.includes(inputValue)) {
        setTag([...tag, inputValue]);
        event.currentTarget.value = '';
      }
    }
  };
  return (
    <S.DropdownContainer>
      <S.DropdownHeader onClick={toggling}>
        <S.ButtonImage src={items.icon} alt="button image" />
        {items.title}
        <S.DropdownArrow>{isOpen ? '▲' : '▼'}</S.DropdownArrow>
      </S.DropdownHeader>
      {isOpen && (
        <S.DropdownListContainer>
          <S.DropdownList>
            {tag.map((item: string) => (
              <S.Tag
                $isActive={selectedItem.includes(item)}
                $color={items.color}
                onClick={onOptionClicked(item)}
                key={item}
              >
                # {item}
              </S.Tag>
            ))}
          </S.DropdownList>
          <S.Input $color={items.color} placeholder="태그 추가" onKeyUp={handleKeyPress} />
        </S.DropdownListContainer>
      )}
    </S.DropdownContainer>
  );
};
export default DropDownTag;
