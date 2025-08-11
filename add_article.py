#!/usr/bin/env python3
"""
新しい記事を追加するスクリプト
使用方法: python add_article.py --category blog --title "記事タイトル" --content "記事内容"
"""

import json
import os
import argparse
from datetime import datetime
import re

def sanitize_filename(filename):
    filename = re.sub(r'[<>:"/\\|?*]', '', filename)
    filename = re.sub(r'\s+', ' ', filename).strip()
    if len(filename) > 50:
        filename = filename[:50]
    return filename

def add_article(category, title, content, author="if(塾)", excerpt=""):
    """新しい記事を追加"""
    
    # 新しいIDを生成（既存の最大ID + 1）
    base_path = "src/data/posts"
    max_id = 0
    
    # 全カテゴリから最大IDを取得
    for cat_dir in os.listdir(base_path):
        cat_path = os.path.join(base_path, cat_dir)
        if os.path.isdir(cat_path):
            for file in os.listdir(cat_path):
                if file.endswith('.json') and file != 'index.json':
                    try:
                        file_id = int(file.split('_')[0])
                        max_id = max(max_id, file_id)
                    except:
                        pass
    
    new_id = max_id + 1
    
    # 記事データを作成
    article = {
        "id": new_id,
        "title": title,
        "excerpt": excerpt if excerpt else content[:150] + "...",
        "content": content,
        "featuredImage": "https://if-juku.net/wp-content/uploads/2025/02/1.png",
        "link": f"https://if-juku.net/posts/{new_id}",
        "date": datetime.now().strftime('%Y-%m-%d'),
        "author": author,
        "categories": [category]
    }
    
    # ファイル名を作成
    title_safe = sanitize_filename(title)
    filename = f"{new_id}_{title_safe}.json"
    
    # カテゴリフォルダに保存
    category_path = os.path.join(base_path, category)
    os.makedirs(category_path, exist_ok=True)
    
    file_path = os.path.join(category_path, filename)
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(article, f, ensure_ascii=False, indent=2)
    
    # インデックスファイルを更新
    index_path = os.path.join(category_path, 'index.json')
    if os.path.exists(index_path):
        with open(index_path, 'r', encoding='utf-8') as f:
            index_data = json.load(f)
    else:
        index_data = {
            'category': category,
            'posts': [],
            'total': 0,
            'updated_at': datetime.now().isoformat()
        }
    
    # 新しい記事をインデックスに追加
    index_data['posts'].insert(0, {
        'id': new_id,
        'title': title,
        'filename': filename,
        'date': article['date'],
        'author': author
    })
    index_data['total'] = len(index_data['posts'])
    index_data['updated_at'] = datetime.now().isoformat()
    
    # インデックスファイルを更新
    with open(index_path, 'w', encoding='utf-8') as f:
        json.dump(index_data, f, ensure_ascii=False, indent=2)
    
    print(f"新しい記事を追加しました: {title} (ID: {new_id})")
    return new_id

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='新しい記事を追加')
    parser.add_argument('--category', required=True, help='カテゴリ名 (blog, ai-lectures, programming, news, events, others)')
    parser.add_argument('--title', required=True, help='記事のタイトル')
    parser.add_argument('--content', required=True, help='記事の内容')
    parser.add_argument('--author', default='if(塾)', help='投稿者名')
    parser.add_argument('--excerpt', default='', help='記事の要約')
    
    args = parser.parse_args()
    
    add_article(args.category, args.title, args.content, args.author, args.excerpt)
