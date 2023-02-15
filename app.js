// Function to extract URLs from the input text
function extractUrls(inputText) {
  // we have to match https://mdisk.me/convertor/160x71/NmSp4C or  https://mdisk.me/convertor/192x85/0gxCiA etc

  const regex = /https:\/\/mdisk\.me\/convertor\/\d+x\d+\/[a-zA-Z0-9]+/g;
  const urls = inputText.match(regex);

  return urls || [];
}

// Function to download a file from a URL
function downloadFile(url) {
  const cid = url.split("/").pop();

  const apiURL = `https://diskuploader.entertainvideo.com/v1/file/cdnurl?param=${cid}`;

  const header = {
    Accept: "*/*",
    "Accept-Language": "en-US,en;q=0.5",
    "Accept-Encoding": "gzip, deflate, br",
    Referer: "https://mdisk.me/",
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36",
  };

  fetch(apiURL, { headers: header })
    .then((response) => response.json())
    .then((data) => {
      const fn = data.filename;
      const dn = data.display_name;
      const dr = data.duration;
      const sz = data.size;
      const ht = data.height;
      const wt = data.width;
      const downloadURL = data.download;

      outputText = `Filename: ${fn}\nDisplay Name: ${dn}\nDuration: ${dr}\nSize: ${sz}\nHeight: ${ht}\nWidth: ${wt}\nDownload URL: ${downloadURL}`;

      // attach the output text to the url list     <div class="output-area">
      //     <p id="num-urls"></p>
      //     <ul id="urls"></ul>
      //     <button id="download-btn">Download All Videos</button>
      // </div>
      const urlsListElement = document.getElementById("urls");
      const li = document.createElement("li");
      li.textContent = outputText;
      urlsListElement.appendChild(li);

      window.open(downloadURL);
    });
}

// Main function to process the input and download all videos
function processInput() {
  // Get the input text
  const inputText = document.getElementById("input-text").value;

  // Extract the URLs from the input text
  const urls = extractUrls(inputText);

  console.log(urls);

  // Display the number of URLs found
  const numUrlsElement = document.getElementById("num-urls");
  numUrlsElement.textContent = `Found ${urls.length} video URLs`;

  // Clear the list of URLs
  const urlsListElement = document.getElementById("urls");
  urlsListElement.innerHTML = "";

  // Add each URL to the list
  urls.forEach((url) => {
    const li = document.createElement("li");
    li.textContent = url;
    urlsListElement.appendChild(li);
  });

  // Add a click event listener to the "Download All Videos" button
  const downloadBtn = document.getElementById("download-btn");
  downloadBtn.addEventListener("click", () => {
    // Download each video file
    urls.forEach((url) => {
      downloadFile(url);
    });
  });
}

// Add a click event listener to the "Process" button
const processBtn = document.getElementById("process-btn");
processBtn.addEventListener("click", processInput);
