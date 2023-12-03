from .constants import ROOT_PATH
from .constants import PUBLIC_DIR_PATH
import tomllib
import requests
import json

# backup trending shows in case there are less than 12 trending shows
backup = [
    {
        "tconst": "tt2297757",
        "name": "Nathan for You",
        "poster_path": "https://image.tmdb.org/t/p/w500/6tGXlz61c44onUg6EdRkbhjcaPA.jpg",
    },
    {
        "tconst": "tt0804503",
        "name": "Mad Men",
        "poster_path": "https://image.tmdb.org/t/p/w500//7v8iCNzKFpdlrCMcqCoJyn74Nsa.jpg"
    },
    {
        "tconst": "tt0367279",
        "name": "Arrested Development",
        "poster_path": "https://image.tmdb.org/t/p/w500//qMzwO952hMWQSCfHkp7IL20s4K7.jpg"
    }
]


TMDB_API_URL = "https://api.themoviedb.org/3"
def get_tmdb_api_key():
    wrangler_path = ROOT_PATH / "wrangler.toml"
    wrangler_text = wrangler_path.read_text()
    wrangler = tomllib.loads(wrangler_text)
    return wrangler["vars"]["TMDB_API_KEY"]
TMDB_API_KEY = get_tmdb_api_key()

def main():

    search_db = json.loads((PUBLIC_DIR_PATH / "search.json").read_text())
    search_db_tconst = set([x["tconst"] for x in search_db])

    url = f"{TMDB_API_URL}/trending/tv/week?api_key={TMDB_API_KEY}"
    trending_shows = requests.get(url).json()["results"]

    trending_db = []
    for show in trending_shows:
        if 16 in show["genre_ids"] and show["origin_country"] == ["JP"]:
            print("Skipping anime " + show["name"])
            continue
        if show["adult"]:
            print("Skipping adult show " + show["name"])
            continue
        show_imdb = requests.get(f"{TMDB_API_URL}/tv/{show['id']}/external_ids?api_key={TMDB_API_KEY}").json()
        if "imdb_id" not in show_imdb:
            continue
        tconst = show_imdb["imdb_id"]
        if tconst is None:
            continue
        if tconst not in search_db_tconst:
            continue
        poster_path = f"https://image.tmdb.org/t/p/w500{show['poster_path']}"
        trending_db.append({
            "tconst": tconst,
            "name": show["name"],
            "poster_path": poster_path,
        })

    if len(trending_db) < 12:
        existing_tconsts = {x["tconst"] for x in trending_db}
        for show in backup:
            if show["tconst"] not in search_db_tconst:
                continue
            if show["tconst"] in existing_tconsts:
                continue
            trending_db.append(show)

    (ROOT_PATH / "src" / "assets" / "trending.json").write_text(json.dumps(trending_db, indent=2))
        
