from PIL import Image
import base64, io

# change this to your JPEG or PNG path
img_path = "Untitled_Artwork 10.jpeg"
svg_path = "Untitled_Artwork_10_exact.svg"

im = Image.open(img_path).convert("RGBA")
w, h = im.size

buf = io.BytesIO()
im.save(buf, format="PNG")
b64 = base64.b64encode(buf.getvalue()).decode("ascii")

svg = f'''<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" 
     viewBox="0 0 {w} {h}" preserveAspectRatio="xMidYMid meet">
  <image href="data:image/png;base64,{b64}" x="0" y="0" 
         width="{w}" height="{h}" />
</svg>
'''

with open(svg_path, "w", encoding="utf-8") as f:
    f.write(svg)

print("Saved as", svg_path)
