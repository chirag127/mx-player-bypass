// Get DOM elements
const textArea = document.getElementById('text-area');
const processButton = document.getElementById('process-button');
const urlList = document.getElementById('url-list');
const downloadButton = document.getElementById('download-button');

let urls = []; // Initialize urls array

// Add click event listener to process button
processButton.addEventListener('click', () => {
  const text = textArea.value;
  urls = getUrls(text);
  displayUrls(urls);
});

// Add click event listener to download button
downloadButton.addEventListener('click', () => {
  downloadAllVideos(urls);
});

// Function to extract urls from text
function getUrls(text) {
  const regex = /https:\/\/mdisk\.me\/convertor\/\S*/g;
  return text.match(regex);
}

// Function to display urls on the webpage
function displayUrls(urls) {
  // Display number of urls found
  urlList.innerHTML = `<p>${urls.length} URLs found:</p>`;

  // Create and append a list item for each url
  urls.forEach((url) => {
    const listItem = document.createElement('li');
    listItem.textContent = url;
    urlList.appendChild(listItem);
  });
}

// Function to download all videos
async function downloadAllVideos(urls) {
  for (let i = 0; i < urls.length; i++) {
    const downloadUrl = await getDownloadUrl(urls[i]);
    const fileInfo = await getFileInfo(downloadUrl);
    const downloadLink = document.createElement('a');
    downloadLink.href = downloadUrl;
    downloadLink.download = `${fileInfo.fn} ${i + 1}.mp4`;
    downloadLink.click();
  }
}

// Function to get download url from mdisk url
async function getDownloadUrl(url) {
  const fxl = url.split('/');
  const cid = fxl[fxl.length - 1];
  const cdnUrl = `https://diskuploader.entertainvideo.com/v1/file/cdnurl?param=${cid}`;
  const response = await fetch(cdnUrl);
  const data = await response.json();
  return data.download;
}

// Function to get file info from download url
async function getFileInfo(downloadUrl) {
  const response = await fetch(downloadUrl, {
    method: 'HEAD',
  });
  const contentDisposition = response.headers.get('content-disposition');
  const fn = contentDisposition.split('=')[1];
  return { fn };
}
