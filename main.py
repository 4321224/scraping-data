import requests
from bs4 import BeautifulSoup

url = 'https://id.hm.com/id_id/ladies/trending-now/style-reload-id.html'
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36 Edge/17.17134'
}
response = requests.get(url, headers=headers)

if response.status_code != 200:
    print(f'Failed to retrieve the page: {response.status_code}')
    exit()

soup = BeautifulSoup(response.text, 'html.parser')

# Adjusted selectors to hypothetical correct values
products = soup.find_all('div', {'class': 'product-item'})

for product in products:
    name_element = product.find('h3', {'class': 'item-heading'})
    price_element = product.find('span', {'class': 'item-price'})

    if name_element and price_element:
        name = name_element.text.strip()
        price = price_element.text.strip()

        print(f'Product Name: {name}, Price: {price}')
