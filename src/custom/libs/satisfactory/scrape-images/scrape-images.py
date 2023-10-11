import os
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin

# URL of the category page
urls = [
    "https://satisfactory.fandom.com/wiki/Category:Items",
    "https://satisfactory.fandom.com/wiki/Category:Resources",
    "https://satisfactory.fandom.com/wiki/Category:Advanced_Refinement"
]

for url in urls:

    print('Retrieving url ' + url)

    # Send a GET request to the URL
    response = requests.get(url)

    # Parse the HTML content of the page
    soup = BeautifulSoup(response.content, "html.parser")

    # Find the div element with id "mw-pages"
    mw_pages_div = soup.find("div", {"id": "mw-pages"})

    # Find all links within the div
    links = mw_pages_div.find_all("a", href=True)

    # Create a directory to save images
    os.makedirs("product_images", exist_ok=True)

    # Iterate through the links and download product images
    for link in links:
        # Get the absolute URL of the product page
        product_url = urljoin(url, link["href"])
        
        # Send a GET request to the product page
        product_page_response = requests.get(product_url)
        
        # Parse the product page
        product_soup = BeautifulSoup(product_page_response.content, "html.parser")
        
        # Find the product item class from the specified div elements
        blueprint_div = product_soup.find("div", {"data-source": "blueprintPath"})
        if blueprint_div:
            product_item_class = blueprint_div.find_next("div", class_="pi-data-value").text.strip()
            product_item_class = product_item_class.rsplit("/", 1)[-1].rsplit(".", 1)[-1]
            product_item_class = product_item_class.replace("Default__", "")
            product_item_class = product_item_class.replace("BP_EquipmentDescriptor", "Desc_")
            if not product_item_class.endswith('_C'):
                product_item_class = product_item_class + '_C'

            
            # Find the product image (assuming the image has a specific class, adjust if necessary)
            product_image = product_soup.find("img", class_="pi-image-thumbnail")
            
            if product_image:
                # Get the image URL
                image_url = product_image["src"]
                
                # Download the image
                image_response = requests.get(image_url)
                
                # Extract the image filename (replace spaces with underscores)
                image_filename = f"{product_item_class}.jpg"
                
                # Save the image in the product_images directory
                with open(os.path.join("product_images", image_filename), "wb") as f:
                    f.write(image_response.content)
                    print(f"Downloaded: {image_filename}")

print("All product images downloaded successfully.")
