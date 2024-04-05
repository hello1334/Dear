import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Font from '@/pages/Font';
import Friend from '@/pages/Friend';
import FriendAdd from '@/pages/FriendAdd';
import FriendLetter from '@/pages/FriendLetter';
import LetterCreate from '@/pages/LetterCreate';
import LetterDeco from '@/pages/LetterDeco';
import Login from '@/pages/Login';
import GoogleLoginRedirection from '@/pages/Login/Google';
import KakaoLoginRedirection from '@/pages/Login/Kakao';
import NaverLoginRedirection from '@/pages/Login/Naver';
import Main from '@/pages/Main/index';
import MainMenu from '@/pages/MainMenu';
import MyPage from '@/pages/MyPage/index';
import NotFound from '@/pages/NotFound/index';
import Point from '@/pages/Point/index';
import ReadLetter from '@/pages/ReadLetter/index';
import Stamp from '@/pages/Stamp';
import StampImage from '@/pages/StampImage';
import StampMarket from '@/pages/StampMarket/index';
import StampMarketDetail from '@/pages/StampMarketDetail/index';
import Stamps from '@/pages/Stamps';
import StampSale from '@/pages/StampSale/index';
import StampsUnread from '@/pages/StampsUnread';

import Layout from '@/components/Layout/Layout';
import SocketProvider from '@/components/Socket/SocketProvider';

const Router = () => (
  <SocketProvider>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/login/google" element={<GoogleLoginRedirection />} />
          <Route path="/login/kakao" element={<KakaoLoginRedirection />} />
          <Route path="/login/naver" element={<NaverLoginRedirection />} />
          <Route path="/mainmenu" element={<MainMenu />} />
          <Route path="/fonts" element={<Font />} />
          <Route path="/stamp/:stampId" element={<Stamp />} />
          <Route path="/stamps/unread" element={<StampsUnread />} />
          <Route path="/stamps" element={<Stamps />} />
          <Route path="/stamps/:letterId/read" element={<ReadLetter />} /> {/* 읽지않은 편지 */}
          <Route path="/stamps/read" element={<ReadLetter />} /> {/* 읽은 편지 */}
          <Route path="/letter" element={<LetterCreate />} />
          <Route path="/letter/deco" element={<LetterDeco />} />
          <Route path="/market" element={<StampMarket />} />
          <Route path="/market/detail" element={<StampMarketDetail />} />
          <Route path="/market/sale" element={<StampSale />} />
          <Route path="/market/sale/image" element={<StampImage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/mypage/point" element={<Point />} />
          <Route path="/friend" element={<Friend />} />
          <Route path="/friend/add" element={<FriendAdd />} />
          <Route path="/friend/letter" element={<FriendLetter />} />
        </Route>
        <Route element={<Layout isHeader={false} />}>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Main />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </SocketProvider>
);

export default Router;
