#!/usr/bin/env python3
"""
記事をカテゴリ別フォルダに分類して管理するスクリプト
"""

import json
import os
from datetime import datetime
import re

def sanitize_filename(filename):
    """ファイル名として使用できない文字を除去"""
    # 危険な文字を除去
    filename = re.sub(r'[<>:"/\\|?*]', '', filename)
    # 改行や余分な空白を除去
    filename = re.sub(r'\s+', ' ', filename).strip()
    # 長すぎる場合は短縮
    if len(filename) > 50:
        filename = filename[:50]
    return filename

def create_category_structure(posts_data, base_path):
    """カテゴリ別フォルダ構成を作成"""
    
    # カテゴリマッピング（日本語→英語）
    category_mapping = {
        'if塾ブログ': 'blog',
        'AI講座': 'ai-lectures',
        'プログラミング': 'programming',
        'ニュース': 'news',
        'イベント': 'events',
        'その他': 'others'
    }
    
    # カテゴリ別に記事を分類
    categorized_posts = {}
    
    for post in posts_data['posts']:
        categories = post.get('categories', ['その他'])
        
        # 最初のカテゴリを使用（複数ある場合）
        primary_category = categories[0] if categories else 'その他'
        
        # 英語フォルダ名に変換
        folder_name = category_mapping.get(primary_category, 'others')
        
        if folder_name not in categorized_posts:
            categorized_posts[folder_name] = []
        
        categorized_posts[folder_name].append(post)
    
    # 各カテゴリのフォルダを作成
    for category, posts in categorized_posts.items():
        category_path = os.path.join(base_path, category)
        os.makedirs(category_path, exist_ok=True)
        
        # カテゴリ用のindex.jsonを作成
        category_index = {
            'category': category,
            'posts': [],
            'total': len(posts),
            'updated_at': datetime.now().isoformat()
        }
        
        # 各記事を個別ファイルとして保存
        for post in posts:
            # ファイル名を作成（ID_タイトル.json）
            title_safe = sanitize_filename(post['title'])
            filename = f"{post['id']}_{title_safe}.json"
            file_path = os.path.join(category_path, filename)
            
            # 記事をファイルに保存
            with open(file_path, 'w', encoding='utf-8') as f:
                json.dump(post, f, ensure_ascii=False, indent=2)
            
            # インデックスに追加
            category_index['posts'].append({
                'id': post['id'],
                'title': post['title'],
                'filename': filename,
                'date': post['date'],
                'author': post['author']
            })
        
        # カテゴリのインデックスファイルを保存
        index_path = os.path.join(category_path, 'index.json')
        with open(index_path, 'w', encoding='utf-8') as f:
            json.dump(category_index, f, ensure_ascii=False, indent=2)
        
        print(f"カテゴリ '{category}': {len(posts)}件の記事を保存しました")
    
    # メインのインデックスファイルを作成
    main_index = {
        'categories': {},
        'total_posts': len(posts_data['posts']),
        'updated_at': datetime.now().isoformat()
    }
    
    for category, posts in categorized_posts.items():
        main_index['categories'][category] = {
            'name': category,
            'count': len(posts),
            'latest_post': posts[0]['date'] if posts else None
        }
    
    main_index_path = os.path.join(base_path, 'index.json')
    with open(main_index_path, 'w', encoding='utf-8') as f:
        json.dump(main_index, f, ensure_ascii=False, indent=2)
    
    return categorized_posts

def create_article_template():
    """新しい記事追加用のテンプレートを作成"""
    template = {
        "id": 0,
        "title": "新しい記事のタイトル",
        "excerpt": "記事の要約（150文字程度）",
        "content": "記事の本文をここに記載",
        "featuredImage": "https://if-juku.net/wp-content/uploads/2025/02/1.png",
        "link": "https://if-juku.net/記事のURL",
        "date": datetime.now().strftime('%Y-%m-%d'),
        "author": "投稿者名",
        "categories": ["カテゴリ名"]
    }
    
    return template

def create_add_article_script():
    """記事追加用スクリプトを作成"""
    script_content = '''#!/usr/bin/env python3
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
    filename = re.sub(r'[<>:"/\\\\|?*]', '', filename)
    filename = re.sub(r'\\s+', ' ', filename).strip()
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
'''
    
    return script_content

if __name__ == "__main__":
    # JSONファイルを読み込み
    posts_file = "/Users/takasaki19841121/Desktop/if(塾)/new-lp/src/data/posts.json"
    
    with open(posts_file, 'r', encoding='utf-8') as f:
        posts_data = json.load(f)
    
    # カテゴリ別フォルダ構成を作成
    base_path = "/Users/takasaki19841121/Desktop/if(塾)/new-lp/src/data/posts"
    os.makedirs(base_path, exist_ok=True)
    
    categorized_posts = create_category_structure(posts_data, base_path)
    
    # 記事追加用スクリプトを作成
    add_script_path = "/Users/takasaki19841121/Desktop/if(塾)/new-lp/add_article.py"
    with open(add_script_path, 'w', encoding='utf-8') as f:
        f.write(create_add_article_script())
    
    # 記事テンプレートを作成
    template_path = "/Users/takasaki19841121/Desktop/if(塾)/new-lp/src/data/article_template.json"
    with open(template_path, 'w', encoding='utf-8') as f:
        json.dump(create_article_template(), f, ensure_ascii=False, indent=2)
    
    print(f"\\n=== 完了 ===")
    print(f"総記事数: {len(posts_data['posts'])}件")
    print(f"カテゴリ数: {len(categorized_posts)}個")
    print(f"\\n各カテゴリの記事数:")
    for category, posts in categorized_posts.items():
        print(f"  {category}: {len(posts)}件")
    
    print(f"\\n=== 使用方法 ===")
    print(f"新しい記事を追加:")
    print(f"  python add_article.py --category blog --title '新しい記事' --content '記事内容'")
    print(f"\\n記事テンプレート: {template_path}")
    print(f"記事追加スクリプト: {add_script_path}")