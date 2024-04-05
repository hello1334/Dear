// baseurl/stamps?isDearMe={true}
export const FakeStampstrue = {
  code: 200,
  message: 'OK',
  data: {
    unReadLettersCnt: 12,
    stamps: [
      {
        stampId: 1,
        image: '/src/assets/postimages/image_1.jpg',
      },
      {
        stampId: 2,
        image: '/src/assets/postimages/image_2.jpg',
      },
    ],
  },
};

export const FakeStampsfalse = {
  code: 200,
  message: 'OK',
  data: {
    unReadLettersCnt: 12,
    stamps: [
      {
        stampId: 1,
        image: '/src/assets/postimages/image_1.jpg',
      },
      {
        stampId: 2,
        image: '/src/assets/postimages/image_2.jpg',
      },
    ],
  },
};

// baseurl/stamp/1
export const FakeStamp1 = {
  code: 200,
  message: 'OK',
  data: {
    dear: '혜승손녀', // 수신인
    from: '이가영', // 발신인
    musicUrl: 'https://pixabay.com/music/pulses-perfect-beauty-191271/',
    musicTitle: 'Perfect Beauty',
    letterUrl: '/src/assets/postimages/letter_1.png',
    createAt: '2024-03-18T17:29:48',
  },
};
// baseurl/stamp/1
export const FakeStamp2 = {
  code: 200,
  message: 'OK',
  data: {
    dear: '혜승손녀', // 수신인
    from: '송찬의', // 발신인
    musicUrl: 'https://pixabay.com/music/beats-coverless-book-186307/',
    musicTitle: 'Coverless book',
    letterUrl: '/src/assets/postimages/letter_2.png',
    createAt: '2024-03-18T17:29:48',
  },
};

// /stamps/unRead
export const FakeUnReadStamps = {
  code: 200,
  message: 'OK',
  data: {
    stamps: [
      {
        stamp: '/src/assets/postimages/image_3.jpg',
        dear: '혜승손녀', // 수신인
        from: '전건휘', // 발신인
        music: 'https://pixabay.com/music/upbeat-solitude-dark-ambient-electronic-197737/',
        musicTitle: 'Solitude',
        letterId: 1,
        letter: '/src/assets/postimages/letter_1.png',
        createAt: '2024-04-03T10:42:26.418444',
      },
      {
        stamp: '/src/assets/postimages/image_4.jpg',
        dear: '혜승손녀', // 수신인
        from: '김동훈', // 발신인
        music: 'https://pixabay.com/music/beats-ethereal-vistas-191254/',
        musicTitle: 'Ethereal Vistas',
        letterId: 2,
        letter: '/src/assets/postimages/letter_2.png',
        createAt: '2024-04-03T10:42:26.418444',
      },
      {
        stamp: '/src/assets/postimages/image_5.jpg',
        dear: '혜승손녀', // 수신인
        from: '전건휘', // 발신인
        music: 'https://pixabay.com/music/upbeat-solitude-dark-ambient-electronic-197737/',
        musicTitle: 'Solitude',
        letterId: 3,
        letter: '/src/assets/postimages/letter_1.png',
        createAt: '2024-04-03T10:42:26.418444',
      },
      {
        stamp: '/src/assets/postimages/image_6.jpg',
        dear: '혜승손녀', // 수신인
        from: '김동훈', // 발신인
        music: 'https://pixabay.com/music/beats-ethereal-vistas-191254/',
        musicTitle: 'Ethereal Vistas',
        letterId: 4,
        letter: '/src/assets/postimages/letter_2.png',
        createAt: '2024-04-03T10:42:26.418444',
      },
      {
        stamp: '/src/assets/postimages/image_7.jpg',
        dear: '혜승손녀', // 수신인
        from: '김동훈', // 발신인
        music: 'https://pixabay.com/music/beats-ethereal-vistas-191254/',
        musicTitle: 'Ethereal Vistas',
        letterId: 5,
        letter: '/src/assets/postimages/letter_2.png',
        createAt: '2024-04-03T10:42:26.418444',
      },
    ],
  },
};
