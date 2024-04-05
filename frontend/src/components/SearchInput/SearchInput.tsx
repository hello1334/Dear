import React from 'react';

import { CiSearch } from 'react-icons/ci';

import * as S from '@/components/SearchInput/SearchInputStyle';

interface SearchInputProps {
  value: string;
  placeholder?: string;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleOnKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleOnClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const SearchInput = React.memo(
  ({ value, placeholder, handleInput, handleOnKeyPress, handleOnClick }: SearchInputProps) => {
    return (
      <S.SearchContainer>
        <S.SearchBtn onClick={handleOnClick}>
          <CiSearch color="white" size={24} />
        </S.SearchBtn>
        <S.SearchInput
          name="search"
          value={value}
          onChange={handleInput}
          onKeyDown={handleOnKeyPress}
          placeholder={placeholder}
        />
      </S.SearchContainer>
    );
  },
);

export default SearchInput;
