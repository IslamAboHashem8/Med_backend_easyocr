import easyocr
import sys
import json
import re

image_path = sys.argv[1]

reader = easyocr.Reader(['en'])

results = reader.readtext(image_path)

medicines = []

for item in results:

    text = item[1].strip()

    # تنظيف
    text = re.sub(r'R\/', '', text)

    # تجاهل النصوص القصيرة
    if len(text) < 4:
        continue

    medicines.append(text)

print(json.dumps(medicines))