import requests
import streamlit as st


def get_video_details(url):
    fxl = url.split("/")
    cid = fxl[-1]
    URL = f"https://diskuploader.entertainvideo.com/v1/file/cdnurl?param={cid}"
    header = {
        "Accept": "*/*",
        "Accept-Language": "en-US,en;q=0.5",
        "Accept-Encoding": "gzip, deflate, br",
        "Referer": "https://mdisk.me/",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36",
    }
    resp = requests.get(url=URL, headers=header).json()
    return resp


def download_video(url):
    st.write(f"Downloading {url}...")
    st.markdown(
        f'<a href="{url}" download="{url.split("/")[-1]}.mp4">Download Video</a>',
        unsafe_allow_html=True,
    )


def app():
    st.title("MDisk Video Downloader")
    text_input = st.text_area("Enter the text content of the MDisk website:")

    if st.button("Extract URLs"):
        urls = []
        for line in text_input.split("\n"):
            if line.startswith(" https://mdisk.me/convertor/"):
                urls.append(line.strip())

        st.write(f"Found {len(urls)} video URLs:")
        for i, url in enumerate(urls):
            st.write(f"{i+1}. {url}")

        if st.button("Download"):
            for url in urls:
                resp = get_video_details(url)
                fn = resp["filename"]
                dn = resp["display_name"]
                dr = resp["duration"]
                sz = resp["size"]
                ht = resp["height"]
                wt = resp["width"]
                download = resp["download"]
                st.write(f"File Name: {fn}")
                st.write(f"Display Name: {dn}")
                st.write(f"Duration: {dr}")
                st.write(f"Size: {sz}")
                st.write(f"Height: {ht}")
                st.write(f"Width: {wt}")
                download_video(download)
