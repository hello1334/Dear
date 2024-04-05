import styled from 'styled-components';

export const PageContainer = styled.div`
  width: 100%;
  height: calc(var(--vh, 1vh) * 100 - 60px);
  overflow: hidden;
  padding: 0 ${({ theme }) => theme.pagePadding};
`;

export const BoxContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

export const Blank = styled.div`
  width: 5rem;
`;

export const BoxText = styled.div`
  border-radius: 10px;
  font-size: 14px;
  background: #fff;
  padding: 1rem 1.3rem;
  font-family: 'Julius Sans One', sans-serif;
  color: #121212;
`;

export const PointContainer = styled.div`
  display: flex;
  width: 5rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

export const PointImg = styled.img`
  width: 1.5rem;
  height: 1.5rem;
`;

export const PointText = styled.div<{ $textcolor: string }>`
  font-size: 14px;
  font-family: 'Julius Sans One', sans-serif;
  font-weight: 500;
  color: ${(props) => props.$textcolor};
`;

export const TabsContainer = styled.div`
  display: flex;
  background: none;
  gap: 0.5rem;
`;

export const Tab = styled.button<{ color: string; $textcolor: string }>`
  border: 1px solid transparent;
  border-radius: 20px;
  border-color: #fdf3e7;
  background: ${(props) => props.color};
  color: ${(props) => props.$textcolor};
  padding: 0.8rem 1.5rem;
  font-family: 'NotoSansKR-Regular', sans-serif;
  font-size: 14px;
  cursor: pointer;
`;

export const StampContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  flex-flow: wrap;
  padding: 0.8rem 0;
  height: 65%;
  gap: 0.5rem;
`;

export const StampWrapper = styled.button`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 0.5rem 0;
  cursor: pointer;
`;

export const StampImgWrapper = styled.div`
  display: flex;
  justify-content: center;
  background-color: #1b201e;
  border-radius: 15px;
  align-items: center;
  width: 150px;
  height: 130px;
  padding: 1rem;
`;

export const StampImg = styled.img`
  width: 10rem;
  height: 10rem;
`;

export const StampTitleWrapper = styled.div`
  margin: 1rem 0;
`;

export const StampTitleText = styled.div`
  font-family: 'NotoSansKR-Regular', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #fff;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const FloatingBtn = styled.button`
  width: 42px;
  height: 42px;
  background: #fdf3e7;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: end;
`;

export const PaginationBox = styled.div`
  .pagination {
    display: flex;
    justify-content: center;
    gap: 0.2rem;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  ul.pagination li {
    display: inline-block;
    display: flex;
    width: 30px;
    height: 30px;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
  }
  ul.pagination li a {
    text-decoration: none;
    color: #fff;
    font-weight: 500;
    font-size: 14px;
  }
  ul.pagination li:first-child a {
    font-size: 18px;
  }
  ul.pagination li:last-child a {
    font-size: 18px;
  }
  ul.pagination li.active a {
    color: white;
  }
  ul.pagination li.active {
    background-color: #33363f;
    border-radius: 100px;
  }
  ul.pagination li a:hover,
  ul.pagination li a.active {
    color: #fdf3e7;
  }
`;
