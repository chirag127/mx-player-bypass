import streamlit as st
import requests

def process_url(url):
    fxl = url.split("/")
    cid = fxl[-1]
    URL=f'https://diskuploader.entertainvideo.com/v1/file/cdnurl?param={cid}'
    header = {
        'Accept': '*/*',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate, br',
        'Referer': 'https://mdisk.me/',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36'
    }
    resp = requests.get(url=URL, headers=header).json()
    fn = resp['filename']
    dn = resp['display_name']
    dr = resp['duration']
    sz = resp['size']
    ht = resp['height']
    wt = resp['width']
    download = resp['download']
    return fn, dn, dr, sz, ht, wt, download

def download_all(urls):
    for url in urls:
        # fn, dn, dr, sz, ht, wt, download = process_url(url)
        filename, display_name, duration, size, height, width, download = process_url(url)
        st.write(f"Filename: {fn}")
        st.write(f"Display Name: {dn}")
        st.write(f"Duration: {dr}")
        st.write(f"Size: {sz}")
        st.write(f"Height: {ht}")
        st.write(f"Width: {wt}")
        st.write(f"Download URL: {download}")
        st.download_button("Download", download)

def download_single(url):
    fn, dn, dr, sz, ht, wt, download = process_url(url)
    st.write(f"Filename: {fn}")
    st.write(f"Display Name: {dn}")
    st.write(f"Duration: {dr}")
    st.write(f"Size: {sz}")
    st.write(f"Height: {ht}")
    st.write(f"Width: {wt}")
    st.write(f"Download URL: {download}")
    st.download_button("Download", download)

def app():
    st.title("mdisk Downloader")
    text = st.text_area("Enter the text content of the mdisk website", height=200)
    urls = [url.strip() for url in text.split() if url.startswith("https://mdisk.me")]
    st.write(f"Number of mdisk URLs found: {len(urls)}")
    if st.button("Download All"):
        download_all(urls)
    if st.button("Download Single"):
        for url in urls:
            st.write(url)
            if st.button(f"Process {url}"):

                download_single(url)

if __name__ == "__main__":
    app()
