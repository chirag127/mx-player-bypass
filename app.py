import streamlit as st
import requests
import json

st.title("Mdisk Downloader")

def get_urls(text):
    urls = []
    for line in text.split():
        if line.startswith("https://mdisk.me"):
            urls.append(line)
    return urls

def get_info(url):
    inp = url #input('Enter the Link: ')
    fxl = inp.split("/")
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
    return resp

def open_url(url):
    import webbrowser
    webbrowser.open(url)

text = st.text_area("Enter the text")

if st.button("Process"):
    urls = get_urls(text)
    st.write(f"There are {len(urls)} urls")
    st.write(urls)
    for url in urls:
        info = get_info(url)
        st.write(info)
        st.write(f"Downloading {info['filename']}")
        open_url(info['download'])
