#!/usr/bin/env python3
"""
WordPress XMLファイルをJSONに変換するスクリプト
"""

import xml.etree.ElementTree as ET
import json
import re
from datetime import datetime
import html

def clean_html(html_content):
    """HTMLタグを除去してプレーンテキストに変換"""
    # HTMLエンティティをデコード
    content = html.unescape(html_content)
    
    # WordPressのブロックコメントを除去
    content = re.sub(r'<!-- /?wp:.*? -->', '', content)
    
    # HTMLタグを除去
    content = re.sub(r'<[^>]+>', '', content)
    
    # 改行を整理
    content = re.sub(r'\n\s*\n', '\n\n', content)
    content = content.strip()
    
    return content

def extract_excerpt(content, max_length=150):
    """コンテンツから抜粋を生成"""
    clean_content = clean_html(content)
    if len(clean_content) <= max_length:
        return clean_content
    
    # 文章を切り取り、最後に...を追加
    excerpt = clean_content[:max_length]
    last_space = excerpt.rfind(' ')
    if last_space > 0:
        excerpt = excerpt[:last_space]
    
    return excerpt + '...'

def extract_featured_image(content):
    """コンテンツから画像URLを抽出"""
    # img srcを検索
    img_pattern = r'<img[^>]*src=["\'](https://if-juku\.net/wp-content/uploads/[^"\']*)["\'][^>]*>'
    match = re.search(img_pattern, content)
    if match:
        return match.group(1)
    
    # デフォルト画像を返す
    return 'https://if-juku.net/wp-content/uploads/2025/02/1.png'

def convert_wp_xml_to_json(xml_file_path, output_file_path):
    """WordPress XMLファイルをJSONに変換"""
    
    # XMLファイルを読み込み
    tree = ET.parse(xml_file_path)
    root = tree.getroot()
    
    # 名前空間を定義
    namespaces = {
        'content': 'http://purl.org/rss/1.0/modules/content/',
        'wp': 'http://wordpress.org/export/1.2/',
        'dc': 'http://purl.org/dc/elements/1.1/'
    }
    
    posts = []
    
    # 全ての投稿を処理
    for item in root.findall('.//item'):
        # 投稿タイプを確認（postのみ処理）
        post_type = item.find('wp:post_type', namespaces)
        if post_type is None or post_type.text != 'post':
            continue
            
        # 投稿ステータスを確認（publishのみ処理）
        post_status = item.find('wp:status', namespaces)
        if post_status is None or post_status.text != 'publish':
            continue
        
        # 投稿データを抽出
        title = item.find('title').text if item.find('title') is not None else ''
        link = item.find('link').text if item.find('link') is not None else ''
        pub_date = item.find('pubDate').text if item.find('pubDate') is not None else ''
        creator = item.find('dc:creator', namespaces).text if item.find('dc:creator', namespaces) is not None else ''
        content = item.find('content:encoded', namespaces).text if item.find('content:encoded', namespaces) is not None else ''
        post_id = item.find('wp:post_id', namespaces).text if item.find('wp:post_id', namespaces) is not None else ''
        
        # 日付を変換
        try:
            date_obj = datetime.strptime(pub_date, '%a, %d %b %Y %H:%M:%S %z')
            formatted_date = date_obj.strftime('%Y-%m-%d')
        except:
            formatted_date = pub_date
        
        # カテゴリーを抽出
        categories = []
        for category in item.findall('category'):
            if category.get('domain') == 'category':
                categories.append(category.text)
        
        # 投稿データを作成
        post_data = {
            'id': int(post_id) if post_id.isdigit() else 0,
            'title': title,
            'excerpt': extract_excerpt(content),
            'content': clean_html(content),
            'featuredImage': extract_featured_image(content),
            'link': link,
            'date': formatted_date,
            'author': creator,
            'categories': categories
        }
        
        posts.append(post_data)
    
    # 投稿を日付順でソート（新しい順）
    posts.sort(key=lambda x: x['date'], reverse=True)
    
    # JSONファイルに保存
    output_data = {
        'posts': posts,
        'total': len(posts),
        'generated_at': datetime.now().isoformat()
    }
    
    with open(output_file_path, 'w', encoding='utf-8') as f:
        json.dump(output_data, f, ensure_ascii=False, indent=2)
    
    print(f"変換完了: {len(posts)}件の投稿を {output_file_path} に保存しました")
    return posts

if __name__ == "__main__":
    # XMLファイルをJSONに変換
    xml_file = "/Users/takasaki19841121/Desktop/if(塾)/new-lp/if.WordPress.post.xml"
    json_file = "/Users/takasaki19841121/Desktop/if(塾)/new-lp/src/data/posts.json"
    
    # データディレクトリを作成
    import os
    os.makedirs(os.path.dirname(json_file), exist_ok=True)
    
    # 変換実行
    posts = convert_wp_xml_to_json(xml_file, json_file)
    
    # 結果を表示
    print(f"\n変換された投稿:")
    for i, post in enumerate(posts[:5]):  # 最初の5件を表示
        print(f"{i+1}. {post['title']} ({post['date']})")
    
    if len(posts) > 5:
        print(f"... 他 {len(posts) - 5} 件")