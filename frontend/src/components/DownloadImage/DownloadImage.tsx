// export const toDataURL = (url: string) => {
//   return fetch(url)
//     .then((response) => {
//       return response.blob();
//     })
//     .then((blob) => {
//       return URL.createObjectURL(blob);
//     });
// };

// export const DownloadImage = async (url: string, fileId?: string) => {
//   const a = document.createElement('a');
//   a.href = url;
//   a.download = fileId ?? 'DearLetter';

//   document.body.appendChild(a);
//   a.click();
//   document.body.removeChild(a);
// };

export const DownloadImage = async (url: string, fileName: string = 'DearLetter') => {
  try {
    const name = url.split('/').pop();
    const response = await fetch('https://d180lpc0feeqh4.cloudfront.net/' + name, {
      method: 'GET',
    });
    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = fileName;
    a.style.display = 'none';
    document.body.appendChild(a);

    a.click();

    window.URL.revokeObjectURL(blobUrl);

    document.body.removeChild(a);
  } catch (error) {
    console.error('파일 다운로드 중 오류 발생:', error);
  }
};
