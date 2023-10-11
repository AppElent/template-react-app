import json
import os
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin
 
# Opening JSON file
f = open('./items.json')
 
# returns JSON object as 
# a dictionary
data = json.load(f)

for product in data:
    print(product)
    print(data[product].get('name'))


    url = "https://satisfactory.fandom.com/wiki/" + data[product].get('name').replace(" ", "_")

    # Send a GET request to the URL
    response = requests.get(url)

    # Parse the HTML content of the page
    soup = BeautifulSoup(response.content, "html.parser")

    product_image = soup.find("img", class_="pi-image-thumbnail")

    if product_image:
        # Get the image URL
        image_url = product_image["src"]
        
        # Download the image
        image_response = requests.get(image_url)
        
        # Extract the image filename (replace spaces with underscores)
        image_filename = f"{product}.jpg"
        
        # Save the image in the product_images directory
        with open(os.path.join("product_images", image_filename), "wb") as f:
            f.write(image_response.content)
            print(f"Downloaded: {image_filename}")

