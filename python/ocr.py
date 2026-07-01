import easyocr
import sys
import json
import re

image_path = sys.argv[1]

reader = easyocr.Reader(
    ['en'],
    gpu=False
)

results = reader.readtext(image_path)

medicines = []

for item in results:

    text = item[1].strip()

    text = re.sub(r'R\/', '', text)

    if len(text) < 4:
        continue

    if not any(c.isalpha() for c in text):
        continue

    medicines.append(text)

medicines = list(dict.fromkeys(medicines))

print(json.dumps(medicines))