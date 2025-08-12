#!/usr/bin/env python3
"""
バックグラウンドでWordPressのメディアファイルをダウンロードするスクリプト
nohup python3 download_media_background.py &
で実行してください
"""
import xml.etree.ElementTree as ET
import urllib.request
import os
from urllib.parse import urlparse, unquote
import time
from pathlib import Path
import logging

# ログ設定
logging.basicConfig(
    filename='download_media.log',
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)

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
            
            # ファイルの拡張子に基づいて保存先を決定
            file_extension = filename.lower().split('.')[-1]
            if file_extension in ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp']:
                save_dir = images_dir
            elif file_extension in ['mp4', 'avi', 'mov', 'wmv', 'flv', 'webm']:
                save_dir = videos_dir
            else:
                save_dir = public_dir  # その他のファイルはpublicディレクトリ直下
            
            save_path = save_dir / filename
            
            # ファイルが既に存在する場合はスキップ
            if save_path.exists():
                logging.info(f"スキップ ({idx}/{total_files}): {filename} (既存)")
                success_count += 1
                continue
            
            # ファイルをダウンロード
            logging.info(f"ダウンロード中 ({idx}/{total_files}): {filename}")
            with urllib.request.urlopen(url, timeout=60) as response:
                data = response.read()
            
            # ファイルを保存
            with open(save_path, 'wb') as f:
                f.write(data)
            
            success_count += 1
            logging.info(f"保存完了: {save_path}")
            
            # サーバーへの負荷を避けるため少し待機
            time.sleep(1)
            
        except Exception as e:
            logging.error(f"エラー ({idx}/{total_files}): {filename} - {str(e)}")
            failed_files.append((url, str(e)))
    
    # 結果を記録
    logging.info("=== ダウンロード完了 ===")
    logging.info(f"総ファイル数: {total_files}")
    logging.info(f"成功: {success_count}")
    logging.info(f"失敗: {len(failed_files)}")
    
    if failed_files:
        with open('failed_downloads.txt', 'w') as f:
            for url, error in failed_files:
                f.write(f"{url}\t{error}\n")
        logging.info("失敗したファイルのリストを 'failed_downloads.txt' に保存しました。")

if __name__ == "__main__":
    download_wordpress_media()