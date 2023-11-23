import json
from tqdm import tqdm
from .constants import PUBLIC_DIR_PATH, TMP_PATH
import csv
from typing import TypedDict

basics_tsv_path = TMP_PATH / "title.basics.tsv"
ratings_tsv_path = TMP_PATH / "title.ratings.tsv"
episodes_tsv_path = TMP_PATH / "title.episode.tsv"

series_db_folder = PUBLIC_DIR_PATH / "series"
series_db_folder.mkdir(exist_ok=True)

EST_BASICS_SIZE = 10314338
EST_RATINGS_SIZE = 1369211
EST_EPISODES_SIZE = 7871589


class Ratings(TypedDict):
    tconst: str
    averageRating: float
    numVotes: int


class Episode(TypedDict):
    tconst: str
    parentTconst: str
    seasonNumber: int
    episodeNumber: int
    averageRating: float | None
    numVotes: int | None


class Series(TypedDict):
    tconst: str
    titleType: str
    primaryTitle: str
    originalTitle: str
    isAdult: bool
    startYear: int
    endYear: int | None
    runtimeMinutes: int | None
    genres: str | None
    episodes: list[Episode]


def main():
    ratings_db: dict[str, Ratings] = {}
    episodes_db: dict[str, Episode] = {}
    series_db: dict[str, Series] = {}

    print("Parsing Ratings")
    with open(ratings_tsv_path, "r") as f:
        next(f)
        for tconst, averageRating, numVotes in csv.reader(
            f, delimiter="\t", quoting=csv.QUOTE_NONE
        ):
            ratings_db[tconst] = {
                "averageRating": float(averageRating),
                "numVotes": int(numVotes),
            }

    print("Parsing Episodes")
    with open(episodes_tsv_path, "r") as f:
        next(f)
        for tconst, parentTconst, seasonNumber, episodeNumber in tqdm(
            csv.reader(f, delimiter="\t", quoting=csv.QUOTE_NONE),
            total=EST_EPISODES_SIZE,
        ):
            if seasonNumber == "\\N" or episodeNumber == "\\N":
                continue
            if tconst in ratings_db:
                ratings = ratings_db[tconst]
            else:
                ratings = {"averageRating": None, "numVotes": None}

            episodes_db[tconst] = {
                "tconst": tconst,
                "parentTconst": parentTconst,
                "seasonNumber": int(seasonNumber),
                "episodeNumber": int(episodeNumber),
                "averageRating": ratings["averageRating"],
                "numVotes": ratings["numVotes"],
            }

    print("Parsing Basics")
    with open(basics_tsv_path, "r") as f:
        for (
            tconst,
            titleType,
            primaryTitle,
            originalTitle,
            isAdult,
            startYear,
            endYear,
            runtimeMinutes,
            genres,
        ) in tqdm(
            csv.reader(f, delimiter="\t", quoting=csv.QUOTE_NONE), total=EST_BASICS_SIZE
        ):
            if titleType == "tvSeries" or titleType == "tvMiniSeries":
                rating = ratings_db.get(tconst, None)
                numVotes = rating["numVotes"] if rating else 0
                if numVotes < 1000:
                    continue

                series_db[tconst] = {
                    "tconst": tconst,
                    "titleType": titleType,
                    "primaryTitle": primaryTitle,
                    "originalTitle": originalTitle,
                    "isAdult": isAdult,
                    "startYear": startYear,
                    "endYear": endYear,
                    "episodes": [],
                }

            if titleType != "tvEpisode":
                continue

            if tconst in episodes_db:
                episodes_db[tconst]["primaryTitle"] = primaryTitle
                episodes_db[tconst]["originalTitle"] = originalTitle
                episodes_db[tconst]["startYear"] = startYear
                episodes_db[tconst]["endYear"] = endYear

    for episode in tqdm(episodes_db.values(), total=len(episodes_db)):
        parent_tconst = episode["parentTconst"]
        if parent_tconst not in series_db:
            continue

        series_db[parent_tconst]["episodes"].append(episode)

    search_db = []
    for parent_tconst, series in tqdm(series_db.items(), total=len(series_db)):
        rated_episodes = [
            episode
            for episode in series["episodes"]
            if episode["averageRating"] is not None
        ]
        voted_episodes = [
            episode
            for episode in series["episodes"]
            if episode["numVotes"] is not None
        ]
        if len(rated_episodes) <= 3 or len(voted_episodes) <= 3:
            continue
        series["episodes"].sort(
            key=lambda episode: episode["seasonNumber"] * 10000
            + episode["episodeNumber"]
        )
        series["originalTitle"] = (
            series["originalTitle"]
            if series["originalTitle"] != "\\N"
            and series["originalTitle"] != series["primaryTitle"]
            else None
        )
        series["endYear"] = series["endYear"] if series["endYear"] != "\\N" else None

        group = int(parent_tconst.replace("tt", "")) % 500
        group_folder = series_db_folder / f"{group}"
        group_folder.mkdir(exist_ok=True)
        (group_folder / f"{parent_tconst}.json").write_text(json.dumps(series))
        search_db.append(
            {
                "tconst": parent_tconst,
                "primaryTitle": series["primaryTitle"],
                "originalTitle": series["originalTitle"],
                "startYear": series["startYear"],
                "endYear": series["endYear"],
            }
        )

    # list all the duplicate primary

    (PUBLIC_DIR_PATH / "search.json").write_text(json.dumps(search_db))

    print("Done!")
