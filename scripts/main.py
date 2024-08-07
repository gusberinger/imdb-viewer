import build_database
import shutil
import time


def main():
    build_database.download(delete_existing=True)
    series_path = build_database.PUBLIC_DIR_PATH / "series"

    # delete smaller folders instead of one big folder to avoid filesystem slowdowns
    print("Deleting existing series folder")
    for file in series_path.iterdir():
        shutil.rmtree(file)

    build_database.database()
    build_database.trending()
    build_database.sitemap()
    (build_database.PUBLIC_DIR_PATH / "timestamp.txt").write_text(str(int(time.time())))


if __name__ == "__main__":
    main()
