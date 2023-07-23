from requests_html import HTMLSession
import json
import string
import random
import os

keywords = [
            # Main Developer Website
            'developers.arcgis.com',
            # ArcGIS Pro
            'https://pro.arcgis.com/en/pro-app', 
            # ArcGIS Online
            'https://doc.arcgis.com/en/arcgis-online',
            # ArcGIS Indoors
            'https://doc.arcgis.com/en/indoors',
            # Python SDK
            'https://developers.arcgis.com/python',
            # Java SDK
            'https://developers.arcgis.com/java'

            ]
urls = [
            'https://developers.arcgis.com/', 
            'https://pro.arcgis.com/en/pro-app/latest/help/main/welcome-to-the-arcgis-pro-app-help.htm',
             'https://doc.arcgis.com/en/arcgis-online/get-started/what-is-agol.htm',
             'https://doc.arcgis.com/en/indoors/latest/viewer/introduction-to-indoor-viewer.htm',
             'https://developers.arcgis.com/python/',
             'https://developers.arcgis.com/java/'
               ]
visited_links = []
key_iter = iter(keywords)

def crawl_links(url, session):
    r = session.get(url)
    for link in r.html.absolute_links:
        if len(visited_links) >= 100:
            break
        if link not in visited_links and current_word in link:
            visited_links.append(link)
            print(link)
            crawl_links(link, session)

def get_name(url, session):
    r = session.get(url)
    name_check = r.html.find("main header h1", first=True)
    name_check_2 = r.html.find("header h1", first=True)
    name_check_3 = r.html.find("h1.esri-text__title", first=True)
    if name_check is not None:
        return name_check.text
    if name_check_2 is not None:
        return name_check_2.text
    if name_check_3 is not None:
        return name_check_3.text
    return ''.join(random.choices(string.ascii_lowercase +
                             string.digits, k=5))

def get_description(url, session):
    r = session.get(url)
    desc_check = r.html.find("header p", first=True)
    desc_check_2 = r.html.find("h1.esri-text__description", first=True)
    desc_check_3 = r.html.find("p", first=True)
    if desc_check is not None:
        return desc_check.text
    if desc_check_2 is not None:
        return desc_check_2.text
    if desc_check_3 is not None:
        return desc_check_3.text
    return ''.join(random.choices(string.ascii_lowercase +
                             string.digits, k=5))
    
def main(urls): 
    json_file = open("all_sections.json", "w")
    global current_word
    global visited_links
    enclosing_obj = []
    for url in urls:
        visited_links = []
        current_word = next(key_iter)
        py_obj = {}
        session = HTMLSession()
        crawl_links(url, session)

        #JSON File
        py_obj["name"] = get_name(url, session)
        py_obj["description"] = get_description(url, session)
        py_obj["retriever"] = os.getcwd() + "/" + py_obj['name'] + ".txt" 
        enclosing_obj.append(py_obj)
        file_name = "{}.txt".format(py_obj['name'])
        text_file = open(file_name, "w")
        for link in visited_links:
            print(link)
            text_file.write(link + "\n")

    json_string = json.dumps(enclosing_obj, indent=2)
    json_file.write(json_string)

    
if __name__ == '__main__':
    main(urls)

