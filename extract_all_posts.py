#!/usr/bin/env python3
"""
WordPressのXMLファイルから全記事を抽出してJSON形式で保存するスクリプト
"""

import xml.etree.ElementTree as ET
import json
import html
import re
import os
from datetime import datetime
from collections import defaultdict

def clean_content(text):
    """HTMLタグを除去してテキストをクリーンアップ"""
    if not text:
        return ""
    
    # HTMLタグを除去
    text = re.sub(r'<[^>]+>', '', text)
    # HTMLエンティティをデコード
    text = html.unescape(text)
    # 改行や空白を整理
    text = re.sub(r'\n+', '\n', text)
    text = re.sub(r'\s+', ' ', text)
    return text.strip()

def extract_first_image(content):
    """コンテンツから最初の画像URLを抽出"""
    if not content:
        return None
    
    # img タグを探す
    img_match = re.search(r'<img[^>]+src=["\']([^"\']+)["\']', content)
    if img_match:
        url = img_match.group(1)
        return convert_image_url(url)
    
    # WordPress の画像ブロックを探す
    wp_image_match = re.search(r'wp:image.*?src="([^"]+)"', content)
    if wp_image_match:
        url = wp_image_match.group(1)
        return convert_image_url(url)
    
    return None

def convert_image_url(url):
    """WordPressのURLを相対パスに変換"""
    if not url:
        return None
    
    # WordPress の wp-content/uploads URL を変換
    match = re.search(r'/wp-content/uploads/(\d{4})/(\d{2})/([^/?]+)', url)
    if match:
        year, month, filename = match.groups()
        return f"/{year}/{month}/{filename}"
    
    # 既に相対パスの場合はそのまま返す
    if url.startswith('/'):
        return url
    
    return url

def parse_wordpress_xml(xml_file):
    """WordPressのXMLファイルを解析して記事データを抽出"""
    tree = ET.parse(xml_file)
    root = tree.getroot()
    
    # 名前空間の定義
    namespaces = {
        'wp': 'http://wordpress.org/export/1.2/',
        'content': 'http://purl.org/rss/1.0/modules/content/',
        'excerpt': 'http://wordpress.org/export/1.2/excerpt/',
        'dc': 'http://purl.org/dc/elements/1.1/'
    }
    
    posts = []
    category_posts = defaultdict(list)
    
    # すべての記事を処理
    for item in root.findall('.//item'):
        # 基本情報を取得
        title_elem = item.find('title')
        title = title_elem.text if title_elem is not None and title_elem.text else ''
        
        link_elem = item.find('link')
        link = link_elem.text if link_elem is not None and link_elem.text else ''
        
        # 投稿日時
        pubdate_elem = item.find('pubDate')
        pub_date = pubdate_elem.text if pubdate_elem is not None and pubdate_elem.text else ''
        
        # 投稿IDを取得
        post_id_elem = item.find('.//wp:post_id', namespaces)
        post_id = int(post_id_elem.text) if post_id_elem is not None and post_id_elem.text else 0
        
        # 投稿日（WordPress形式）
        post_date_elem = item.find('.//wp:post_date', namespaces)
        post_date = post_date_elem.text if post_date_elem is not None and post_date_elem.text else ''
        
        # 著者
        creator_elem = item.find('.//dc:creator', namespaces)
        author = creator_elem.text if creator_elem is not None and creator_elem.text else ''
        
        # カテゴリー
        categories = []
        for cat in item.findall('category[@domain="category"]'):
            if cat.text:
                categories.append(cat.text)
        
        # コンテンツ
        content_elem = item.find('.//content:encoded', namespaces)
        content_html = content_elem.text if content_elem is not None and content_elem.text else ''
        
        # 画像を抽出
        featured_image = extract_first_image(content_html)
        
        # コンテンツをクリーンアップ
        content = clean_content(content_html)
        
        # 概要を作成（コンテンツの最初の200文字）
        excerpt = content[:200] + '...' if len(content) > 200 else content
        
        # 日付をフォーマット
        if pub_date:
            try:
                dt = datetime.strptime(pub_date, '%a, %d %b %Y %H:%M:%S %z')
                formatted_date = dt.strftime('%Y-%m-%d')
            except:
                formatted_date = post_date[:10] if post_date else ''
        else:
            formatted_date = post_date[:10] if post_date else ''
        
        # 記事データを作成
        post_data = {
            'id': post_id,
            'title': title,
            'excerpt': excerpt,
            'content': content,
            'featuredImage': featured_image,
            'link': link,
            'date': formatted_date,
            'author': author,
            'categories': categories
        }
        
        # 記事を保存
        if title and post_id:  # タイトルとIDがある記事のみ
            posts.append(post_data)
            
            # カテゴリー別に分類
            for category in categories:
                category_posts[category].append(post_data)
    
    return posts, category_posts

def save_posts_to_json(posts, category_posts, output_dir='src/data/posts'):
    """記事データをJSON形式で保存"""
    os.makedirs(output_dir, exist_ok=True)
    
    # カテゴリーの正規化
    category_mapping = {
        'Minecraft': 'minecraft',
        'Minecraft Java': 'minecraft',
        'Minecraft BE': 'minecraft',
        'お知らせ': 'news',
        'if塾ブログ': 'blog',
        'if(夢)': 'blog',
        '未分類': 'others',
        'プロフィール': 'others',
        '鬼ごっこ': 'minecraft',
        '講座': 'others',
        'AI講座': 'ai-lectures'
    }
    
    # 新しいカテゴリー別に記事を整理
    organized_posts = defaultdict(list)
    
    for category, posts in category_posts.items():
        normalized_category = category_mapping.get(category, 'others')
        organized_posts[normalized_category].extend(posts)
    
    # 重複を削除（同じIDの記事）
    for category in organized_posts:
        seen_ids = set()
        unique_posts = []
        for post in organized_posts[category]:
            if post['id'] not in seen_ids:
                seen_ids.add(post['id'])
                unique_posts.append(post)
        organized_posts[category] = unique_posts
    
    # 各カテゴリーのフォルダを作成して記事を保存
    all_posts_index = []
    
    for category, posts in organized_posts.items():
        category_dir = os.path.join(output_dir, category)
        os.makedirs(category_dir, exist_ok=True)
        
        # カテゴリーのインデックスファイル
        category_index = {
            'category': category,
            'posts': []
        }
        
        # 日付でソート（新しい順）
        posts.sort(key=lambda x: x['date'] if x['date'] else '', reverse=True)
        
        # 各記事を個別のJSONファイルとして保存
        for post in posts:
            filename = f"{post['id']}.json"
            filepath = os.path.join(category_dir, filename)
            
            # 記事を保存
            with open(filepath, 'w', encoding='utf-8') as f:
                json.dump(post, f, ensure_ascii=False, indent=2)
            
            # インデックスに追加
            category_index['posts'].append({
                'id': post['id'],
                'title': post['title'],
                'date': post['date'],
                'excerpt': post['excerpt'],
                'filename': filename
            })
            
            # 全体のインデックスにも追加
            all_posts_index.append({
                'id': post['id'],
                'title': post['title'],
                'date': post['date'],
                'category': category,
                'excerpt': post['excerpt']
            })
        
        # カテゴリーのインデックスを保存
        with open(os.path.join(category_dir, 'index.json'), 'w', encoding='utf-8') as f:
            json.dump(category_index, f, ensure_ascii=False, indent=2)
    
    # 全体のインデックスを保存
    all_posts_index.sort(key=lambda x: x['date'] if x['date'] else '', reverse=True)
    with open(os.path.join(output_dir, 'index.json'), 'w', encoding='utf-8') as f:
        json.dump({
            'posts': all_posts_index,
            'categories': list(organized_posts.keys()),
            'total': len(all_posts_index)
        }, f, ensure_ascii=False, indent=2)
    
    return organized_posts

def main():
    xml_file = 'if.WordPress.post.xml'
    
    print(f"XMLファイルを解析中: {xml_file}")
    posts, category_posts = parse_wordpress_xml(xml_file)
    
    print(f"\n抽出された記事数: {len(posts)}")
    print("\nカテゴリー別記事数:")
    for category, posts_list in sorted(category_posts.items()):
        print(f"  {category}: {len(posts_list)}記事")
    
    print("\nJSON形式で保存中...")
    organized_posts = save_posts_to_json(posts, category_posts)
    
    print("\n保存されたカテゴリー別記事数:")
    for category, posts_list in sorted(organized_posts.items()):
        print(f"  {category}: {len(posts_list)}記事")
    
    print("\n完了しました！")

if __name__ == '__main__':
    main()