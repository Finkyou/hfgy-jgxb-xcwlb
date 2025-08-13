import os
import json

GALLERY_DIR = os.path.join('img', 'gallery')
OUTPUT_JSON = os.path.join('data', 'gallery.json')

# 维护图片的标题、描述、作者等
# 可直接在此字典中添加/修改图片信息
# 未填写的图片将只显示图片本身

gallery_info = {
    '1.jpg': {'title': '日出', 'desc': '美丽的清晨', 'author': '小明'},
    '2.jpg': {'title': '夜色', 'desc': '城市夜景', 'author': '小红'},
    # ...
}

gallery = []
if os.path.exists(GALLERY_DIR):
    for filename in os.listdir(GALLERY_DIR):
        if filename.lower().endswith(('.jpg', '.jpeg', '.png', '.gif')):
            info = gallery_info.get(filename, {})
            gallery.append({
                'filename': filename,
                'title': info.get('title', ''),
                'desc': info.get('desc', ''),
                'author': info.get('author', ''),
            })

os.makedirs('data', exist_ok=True)
with open(OUTPUT_JSON, 'w', encoding='utf-8') as f:
    json.dump(gallery, f, ensure_ascii=False, indent=2)

print(f'已生成 {OUTPUT_JSON}') 