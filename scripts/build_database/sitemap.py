import json
from .constants import PUBLIC_DIR_PATH
import lxml.etree as ET


def main():
    search_db = json.loads((PUBLIC_DIR_PATH / "search.json").read_text())
    tconsts = [item["tconst"] for item in search_db]
    sitemap_path = PUBLIC_DIR_PATH / "sitemap.xml"

    # create a sitemap with the url https://imdb.gusberinger.com/series/tconst for each tconst
    # then save it to PUBLIC_DIR_PATH / "sitemap.xml"

    # create the root element
    root = ET.Element("urlset")
    root.attrib["xmlns"] = "http://www.sitemaps.org/schemas/sitemap/0.9"

    url = ET.SubElement(root, "url")
    loc = ET.SubElement(url, "loc")
    loc.text = f"https://imdb.gusberinger.com/"

    for tconst in tconsts:
        url = ET.SubElement(root, "url")
        loc = ET.SubElement(url, "loc")
        loc.text = f"https://imdb.gusberinger.com/series/{tconst}"

    # create a new XML file with the results
    tree = ET.ElementTree(root)
    tree.write(sitemap_path, pretty_print=True, xml_declaration=True, encoding="utf-8")


