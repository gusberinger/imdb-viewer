import build_database
import shutil


def main():
    build_database.download(delete_existing=False)
    series_path = build_database.PUBLIC_DIR_PATH / "series"
    # delete smaller folders instead of one big folder to avoid issues
    print("Deleting existing series folder")
    for file in series_path.iterdir():
        shutil.rmtree(file)
    build_database.database()


if __name__ == "__main__":
    main()
