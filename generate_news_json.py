import json
from datetime import datetime
import os

NEWS_JSON = os.path.join('data', 'news.json')

news = [
    {
        'title': '2024年外联部招新开始啦！',
        'content': '欢迎大家报名加入外联部，详情请见招新页面。',
        'date': datetime.now().strftime('%Y-%m-%d')
    },
    {
        'title': '摄影展区上线',
        'content': '快来欣赏同学们的精彩摄影作品吧！',
        'date': '2024-06-01'
    }
    # 可继续添加新闻
]

os.makedirs('data', exist_ok=True)
with open(NEWS_JSON, 'w', encoding='utf-8') as f:
    json.dump(news, f, ensure_ascii=False, indent=2)

print(f'已生成 {NEWS_JSON}') 