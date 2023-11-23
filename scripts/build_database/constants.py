from pathlib import Path

ROOT_PATH = Path(__file__).parent.parent.parent
TMP_PATH = ROOT_PATH / "tmp"
TMP_PATH.mkdir(exist_ok=True)

PUBLIC_DIR_PATH = ROOT_PATH / "public"
