#!/usr/bin/env python3
"""
残りのWordPressメディアファイルをダウンロードするスクリプト
日本語ファイル名にも対応
"""
import xml.etree.ElementTree as ET
import urllib.request
import urllib.parse
import os
from urllib.parse import urlparse, unquote
import time
from pathlib import Path
import logging

# ログ設定
logging.basicConfig(
    filename='download_remaining.log',
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)

def safe_filename(filename):
    """ファイル名を安全な形式に変換"""
    # 特殊文字を置換
    filename = filename.replace('/', '_')
    filename = filename.replace('\\', '_')
    return filename

def download_file(url, save_path):
    """URLエンコードされたURLからファイルをダウンロード"""
    # 日本語を含むURLを適切にエンコード
    parsed = urlparse(url)
    # パス部分を適切にエンコード
    encoded_path = urllib.parse.quote(parsed.path.encode('utf-8'))
    encoded_url = f"{parsed.scheme}://{parsed.netloc}{encoded_path}"
    
    req = urllib.request.Request(encoded_url)
    req.add_header('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36')
    
    with urllib.request.urlopen(req, timeout=60) as response:
        data = response.read()
    
    with open(save_path, 'wb') as f:
        f.write(data)

def download_wordpress_media():
    logging.info("ダウンロード開始")
    
    # XMLファイルをパース
    tree = ET.parse('if.WordPress.2025-07-11.xml')
    root = tree.getroot()
    
    # 名前空間の定義
    ns = {'wp': 'http://wordpress.org/export/1.2/'}
    
    # publicフォルダを作成
    public_dir = Path('public')
    public_dir.mkdir(exist_ok=True)
    
    # 画像と動画用のサブフォルダを作成
    images_dir = public_dir / 'images'
    videos_dir = public_dir / 'videos'
    images_dir.mkdir(exist_ok=True)
    videos_dir.mkdir(exist_ok=True)
    
    # すべての添付ファイルURLを処理
    total_files = 0
    success_count = 0
    failed_files = []
    
    # 全URLを収集
    urls = []
    for item in root.findall('.//item'):
        post_type = item.find('.//wp:post_type', ns)
        if post_type is not None and post_type.text == 'attachment':
            attachment_url = item.find('.//wp:attachment_url', ns)
            if attachment_url is not None and attachment_url.text:
                urls.append(attachment_url.text)
    
    total_files = len(urls)
    logging.info(f"総ファイル数: {total_files}")
    
    for idx, url in enumerate(urls, 1):
        try:
            # URLからファイル名を取得
            parsed_url = urlparse(url)
            filename = os.path.basename(unquote(parsed_url.path))
            filename = safe_filename(filename)
            
            # ファイルの拡張子に基づいて保存先を決定
            file_extension = filename.lower().split('.')[-1]
            if file_extension in ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp']:
                save_dir = images_dir
            elif file_extension in ['mp4', 'avi', 'mov', 'wmv', 'flv', 'webm']:
                save_dir = videos_dir
            elif file_extension == 'pdf':
                save_dir = public_dir  # PDFはpublicディレクトリ直下
            else:
                save_dir = public_dir  # その他のファイルもpublicディレクトリ直下
            
            save_path = save_dir / filename
            
            # ファイルが既に存在する場合はスキップ
            if save_path.exists():
                logging.info(f"スキップ ({idx}/{total_files}): {filename} (既存)")
                success_count += 1
                continue
            
            # ファイルをダウンロード
            logging.info(f"ダウンロード中 ({idx}/{total_files}): {filename}")
            download_file(url, save_path)
            
            success_count += 1
            logging.info(f"保存完了: {save_path}")
            
            # サーバーへの負荷を避けるため少し待機
            time.sleep(1)
            
        except Exception as e:
            logging.error(f"エラー ({idx}/{total_files}): {url} - {str(e)}")
            failed_files.append((url, str(e)))
    
    # 結果を記録
    logging.info("=== ダウンロード完了 ===")
    logging.info(f"総ファイル数: {total_files}")
    logging.info(f"成功: {success_count}")
    logging.info(f"失敗: {len(failed_files)}")
    
    if failed_files:
        with open('failed_downloads_final.txt', 'w', encoding='utf-8') as f:
            for url, error in failed_files:
                f.write(f"{url}\t{error}\n")
        logging.info("失敗したファイルのリストを 'failed_downloads_final.txt' に保存しました。")

if __name__ == "__main__":
    download_wordpress_media()