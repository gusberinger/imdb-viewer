import build_database


def main():
    build_database.download(delete_existing=True)
    build_database.database()

if __name__ == "__main__":
    main()
