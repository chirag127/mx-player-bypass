// Function to extract URLs from the input text
function extractUrls(inputText) {
  // we have to match https://mdisk.me/convertor/160x71/NmSp4C or  https://mdisk.me/convertor/192x85/0gxCiA etc

  const regex = /https:\/\/mdisk\.me\/convertor\/\d+x\d+\/[a-zA-Z0-9]+/g;
  const urls = inputText.match(regex);

  return urls || [];
}
function download(url, filename) {
  // create a new XMLHttpRequest object
  var xhr = new XMLHttpRequest();
  // open the request with GET method
  xhr.open("GET", url, true);
  // set the responseType to blob
  xhr.responseType = "blob";
  // on load event handler
  xhr.onload = function () {
    // check if the status is 200
    if (this.status === 200) {
      // get the blob
      var blob = this.response;
      // create an object URL
      var objectURL = URL.createObjectURL(blob);
      // create an anchor element
      var a = document.createElement("a");
      // set the href attribute to the object URL
      a.href = objectURL;
      // set the download attribute to the filename
      a.download = filename;
      // append the anchor to the body
      document.body.appendChild(a);
      // click the link
      a.click();
      // revoke the object URL
      URL.revokeObjectURL(objectURL);
      // remove the anchor from the body
      document.body.removeChild(a);
    }
  };
  // send the request
  xhr.send();
}

// Function to download a file from a URL
function downloadFile(url, setFilename) {
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
      // const urlsListElement = document.getElementById("urls");
      // const li = document.createElement("li");
      // li.textContent = outputText;
      // urlsListElement.appendChild(li);

      console.log(outputText);

      if (setFilename) {
        complete_filename = `${fn} - ${dn} - ${dr} - ${sz} - ${ht} - ${wt}.mp4`;

        download(downloadURL, complete_filename);
      } else {
        window.open(downloadURL);
      }
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
      downloadFile(url, true);
    });
  });

  const downloadBtnWsn = document.getElementById("download-btn-wsn");
  downloadBtnWsn.addEventListener("click", () => {
    // Download each video file
    urls.forEach((url) => {
      downloadFile(url, false);
    });
  });
}

// Add a click event listener to the "Process" button
const processBtn = document.getElementById("process-btn");
processBtn.addEventListener("click", processInput);
