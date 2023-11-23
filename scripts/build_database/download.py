import requests
from tqdm import tqdm
from .constants import TMP_PATH
import gzip


urls = [
    "https://datasets.imdbws.com/title.ratings.tsv.gz",
    "https://datasets.imdbws.com/title.basics.tsv.gz",
    "https://datasets.imdbws.com/title.episode.tsv.gz",
]


def main(*, delete_existing=False):
    for url in tqdm(urls):
        filename = url.split("/")[-1]
        file_path = TMP_PATH / filename.replace(".gz", "")
        if file_path.exists() and not delete_existing:
            continue
        r = requests.get(url)
        gzip_file = gzip.decompress(r.content)
        file_path.write_bytes(gzip_file)


if __name__ == "__main__":
    main()
