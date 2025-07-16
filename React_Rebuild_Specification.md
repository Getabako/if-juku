# if(塾) React化 詳細指示書

## 概要
既存のif(塾)スワイプ型ランディングページをReactベースで完全再構築するための詳細指示書です。すべてのコンテンツ、デザイン、機能を忠実に再現します。

## 技術スタック要件

### 必須ライブラリ
- React 18+
- Swiper React (react-swiper)
- styled-components または Emotion
- Framer Motion (アニメーション用)
- react-responsive (レスポンシブ制御)

### 推奨パッケージ
```json
{
  "react": "^18.0.0",
  "swiper": "^11.0.0",
  "styled-components": "^6.0.0",
  "framer-motion": "^10.0.0",
  "react-responsive": "^9.0.0"
}
```

## ディレクトリ構造

```
src/
├── components/
│   ├── Navigation/
│   │   ├── CyberNav.jsx
│   │   └── MobileNav.jsx
│   ├── Sections/
│   │   ├── MainVisual.jsx
│   │   ├── About.jsx
│   │   ├── Courses.jsx
│   │   ├── Schedule.jsx
│   │   ├── Services.jsx
│   │   ├── Challenge.jsx
│   │   ├── ChallengeForBeginner.jsx
│   │   ├── Issues.jsx
│   │   ├── Flow.jsx
│   │   ├── Members.jsx
│   │   ├── Materials.jsx
│   │   ├── News.jsx
│   │   ├── FAQ.jsx
│   │   ├── YouTube.jsx
│   │   ├── PowerUp.jsx
│   │   ├── Message.jsx
│   │   └── Contact.jsx
│   ├── UI/
│   │   ├── Modal.jsx
│   │   ├── CyberButton.jsx
│   │   └── TwinklingText.jsx
│   └── Background/
│       ├── StarsBackground.jsx
│       ├── CyberGridBackground.jsx
│       └── ParticlesBackground.jsx
├── hooks/
│   ├── useDeviceDetection.js
│   └── useSwiper.js
├── styles/
│   ├── GlobalStyles.js
│   └── theme.js
└── assets/
    └── media/
        ├── 2025/
        │   ├── 03/
        │   └── 04/
        └── 2024/
```

## セクション詳細仕様

### 1. ナビゲーション
**ファイル**: `components/Navigation/CyberNav.jsx`, `MobileNav.jsx`

#### 機能要件
- サイバー風デザインのナビゲーション
- PC版とモバイル版の切り替え
- ドロップダウンメニュー対応
- スムーススクロール機能

#### 構造
```jsx
const CyberNav = () => {
  const items = [
    {
      label: "if(塾)について",
      href: "#if-about",
      submenu: [
        { label: "コース紹介", href: "#courses" },
        { label: "授業スケジュール", href: "#schedule" },
        // 他のサブメニュー項目
      ]
    },
    // 他のメニュー項目
  ];
};
```

### 2. メインビジュアル
**ファイル**: `components/Sections/MainVisual.jsx`

#### 動画ファイル
- PC版: `public/2025/04/ifmv2.mp4`
- モバイル版: `public/2025/04/ifmvsp-1.mp4`

#### 実装ポイント
- autoplay, loop, muted, playsinline属性対応
- デバイス判定による動画切り替え
- フルスクリーン表示

### 3. if(塾)について
**ファイル**: `components/Sections/About.jsx`

#### 機能要件
- サイバー風背景エフェクト
- Twinkling Text アニメーション

### 4. コース紹介
**ファイル**: `components/Sections/Courses.jsx`

#### 機能要件
- タブ切り替え機能
- リベラルコース/自己実現コースの表示切り替え
- サイバーカードデザイン

#### コンテンツ詳細
**リベラルコース**
- 説明: マインクラフトで学ぶ創造力・基礎ITスキルコース
- 頻度: 週1回から参加可能
- 対象: 小学生～中学生にオススメ
- 特徴:
  - マインクラフトをメタバース化した空間で自由に探索・建築
  - AI先生やゲームコンテンツを活用した遊び感覚の学習
  - 子ども一人ひとりに合った学習スタイルを発見

**自己実現コース**
- 説明: AIと起業を学ぶ自己実現コース
- 頻度: 週2～3回推奨
- 対象: 中学生～高校生にオススメ
- 特徴:
  - AIを活用したプログラミングやビジネスモデルの構築
  - 起業家精神を育成し、自分の興味や特性を活かしたプロジェクト企画・実行
  - メンターのサポートを受けながら、実際の仕事に挑戦し収益を得る経験

### 5. 授業スケジュール
**ファイル**: `components/Sections/Schedule.jsx`

#### 機能要件
- Google Calendar埋め込み
- PC/モバイル版別表示
- サイバーフレームデザイン

#### Googleカレンダー設定
- PC版: カレンダー表示モード
- モバイル版: アジェンダ表示モード

### 6. サービス内容
**ファイル**: `components/Sections/Services.jsx`

#### サービスブロック画像
1. オンライン授業: `public/2025/02/1.png`
2. オフラインイベント: `public/2025/02/2.png`
3. 教育相談: `public/2025/02/3.png`
4. 案件割振: `public/2025/02/4.png`
5. 独立サポート: `public/2025/02/5.png`
6. AI先生: `public/2025/02/6.png`

#### 機能要件
- ホバーエフェクト
- モーダルポップアップ
- 雲の背景アニメーション

#### サブスクリプション情報
「月額11,000円（税込）〜で利用できる、if(塾)の全面サポートサブスクリプション！」

### 7. if(チャレンジ)
**ファイル**: `components/Sections/Challenge.jsx`

#### 画像ファイル
- PC版: `public/2025/04/能動的に学ぶ.png`
- モバイル版: `public/2025/04/名称未設定のデザイン-34.png`

#### コンテンツ
説明文: 「能動的に楽しく学ぶことでスキルを獲得し、スキルを活かして学びながら稼ぐ！学びの好循環により、成長が加速！」

### 8. if(チャレンジ)forビギナー
**ファイル**: `components/Sections/ChallengeForBeginner.jsx`

#### クエストアイコン
1. Minecraft建築: `public/2025/03/quest2.png`
2. 動画編集: `public/2025/03/quest1.png`
3. Web開発: `public/2025/03/quest3.png`
4. SNS投稿: `public/2025/03/quest4.png`
5. イラスト: `public/2025/03/quest5.png`
6. AI開発: `public/2025/03/quest6.png`

#### 仕事内容詳細
1. **マインクラフト建築**
   - ステータス: 募集中
   - ツール: Minecraft

2. **動画編集**
   - ステータス: 募集中
   - ツール: DavinchResolve

3. **Web開発**
   - ステータス: 募集中
   - ツール: WordPress

4. **SNS投稿**
   - ステータス: 募集中
   - ツール: Instagram / Canva

5. **イラスト**
   - ステータス: 募集中
   - ツール: ClipStudio

6. **AI開発**
   - ステータス: 募集中
   - ツール: ChatGPT / Gemini

### 9. if(塾)が取り組む課題
**ファイル**: `components/Sections/Issues.jsx`

#### 機能要件
- スライダー機能（3枚のカード）
- ナビゲーションボタン
- インジケーター

#### カード内容
1. **増え続ける不登校**
   - 画像: `public/2025/03/ideal2.png`
   - 内容: 日本の不登校数は年々増加し、現在は過去最高を記録しています。if(塾)は学校でも家でもない第三の居場所を目指し、不登校になりがちな子どもたちが自分らしく安心して学べる環境を提供します。遊びを通じて心が解けるようになり、意欲や学習習慣を再構築していきます。

2. **地方と都市部のデジタルディバイド**
   - 画像: `public/2025/03/ideal3.png`
   - 内容: 日本はICT後進国で、特に教育分野では諸外国に大きな遅れをとっています。if(塾)は最新AIを開発し、いつでも最大効率で学習できる環境を整えます。人間先生・AI先生どちらにも気軽に質問でき、地方からICT教育を革命的に進めるプロジェクトを推進します。

3. **広がる経済格差**
   - 画像: `public/2025/03/ideal1.png`
   - 内容: 地方と都市部の経済格差は深刻で、大学進学や就職の選択肢が狭まりがちです。if(塾)は「自ら稼ぐ力」を育成することで、家庭環境や地域に左右されずに将来の夢を切り拓けるよう支援します。地域の仕事にチャレンジしながら報酬を得て、高校生自身が社会で活躍できる道を広げていきます。

### 10. 入塾までの流れ
**ファイル**: `components/Sections/Flow.jsx`

#### 画像ファイル
- PC版: `public/2025/04/flow_pc.png`
- モバイル版: `public/2025/04/flow_sp.png`

### 11. 運営メンバー
**ファイル**: `components/Sections/Members.jsx`

#### 機能要件
- メンバースライダー（5人）
- PC/モバイル版画像切り替え

#### メンバー詳細

1. **塾頭: 高崎翔太**
   - PC画像: `public/2025/02/IMG_9646-scaled.jpg`
   - モバイル画像: `public/2025/02/1-1.png`
   - 説明: 元々は実は臨床心理士。ICTものづくりを通して、言葉による表現が難しかった子が自分の思いを伝えられるようになったり、学習に意欲を持てなかった子が目標を見つけて難関大学へ進学したり…多くの子どもたちが持つ可能性の扉を開くお手伝いをしてきた、経験豊富なメンターだよ！

2. **塾長: 山﨑琢己**
   - PC画像: `public/2025/02/takumi.png`
   - モバイル画像: `public/2025/02/2-1.png`
   - 説明: 高校1年でIT会社を起業！Web開発やPCコンサルタントとして活躍後、if(塾)を開業。塾長としてみんなをまとめ、授業もメインで回す頼れるリーダーだよ！AI開発や講演も行う、AI活用の最前線に立つ若きイノベーター！中学時代は支援級で過ごした経験も力に、現役で国立大学合格！

3. **CFO: 加賀屋結眞**
   - PC画像: `public/2025/02/IMG_9909-scaled.jpg`
   - モバイル画像: `public/2025/02/3-1.png`
   - 説明: 高校1年でIT会社を起業！Web開発やマーケティングコンサルタントとして活躍後、if(塾)を開業。CFOとして、みんなにif(塾)の魅力を伝えるコミュニケーターだよ！年上の起業家たちとも積極的に交流し、ホリエモンにプレゼンした経験も持つチャレンジャー！パソコンを使った表現力で周りが驚くような発想力と行動力を発揮し、次の事業立ち上げを計画中！

4. **CTO: 井上陽斗**
   - PC画像: `public/2025/02/120362.jpg`
   - モバイル画像: `public/2025/02/4-1.png`
   - 説明: 高校1年からif(塾)に参加！プログラミング未経験からスタートし、if(塾)のマインクラフトワールドのシステムを全て開発した天才クリエイター！まるでドラえもんみたいに、お願いしたものをいつの間にか作ってくれる頼れる存在！集中して自分の世界に入り込み、周りがびっくりするような天才的なアイデアを次々と生み出している開発の達人だよ！

5. **専属e-Sports Player: Y君**
   - PC画像: `public/2024/12/IMG_20240825_151743-scaled.jpg`
   - モバイル画像: `public/2025/02/5-1.png`
   - 説明: 高校生で格闘ゲームを始め、わずか数ヶ月でトップクラスの実力を獲得！県内大学の大会では最年少で優勝した期待のアスリート！抜群の集中力で塾頭をゲームで打ち負かす実力の持ち主！プロゲーマーを目指して本格始動し、YouTubeやTwitchでの配信も積極的に行っているよ！

### 12. オンライン教材
**ファイル**: `components/Sections/Materials.jsx`

#### 実装要件
- WordPressショートコード代替実装
- カード型レイアウト（3列、モバイル2列）
- "もっと見る"ボタン

### 13. お知らせ
**ファイル**: `components/Sections/News.jsx`

#### 実装要件
- WordPressショートコード代替実装
- カード型レイアウト（3列、モバイル2列）
- "もっと見る"ボタン

### 14. よくある質問
**ファイル**: `components/Sections/FAQ.jsx`

#### キャラクター画像
- 閉じた状態: `public/2025/02/getabako0.png`
- 開いた状態: `public/2025/02/getabako1.png`

#### FAQ項目
**左側のボタン**
1. **どこで開催されますか？**
   - 回答: 普段の授業はオンラインでdiscordを使って行うので、いつでもどこでも参加可能です。秋田県内では定期的にオフラインイベントを開催予定です。

2. **Minecraft未経験でも大丈夫？**
   - 回答: もちろん大丈夫です！マイクラに詳しい講師と、高校生の助手が1から優しく教えてくれます。

3. **PCのみでしょうか？**
   - 回答: 申し訳ありませんが、様々なものを作るためにはPC版Minecraftが必要です。お子様がやりたいことを実現できるPCについては、塾長たくみが選び方からサポートしますので、お気軽にご相談ください。

**右側のボタン**
1. **体験に必要なものは？**
   - 回答: 体験授業にはお子様が使えるPC、discord、java版マインクラフトが必要です。詳しくはお申し込み後のメールでもご案内しています。

2. **資料はありますか？**
   - 回答: 資料請求ボタンから資料請求をお願いします。

3. **カメラオフで参加できますか？**
   - 回答: はい、ビデオオフOK。食べながらでも踊りながらでも自由に参加できます。

### 15. YouTube
**ファイル**: `components/Sections/YouTube.jsx`

#### 実装要件
- YouTubeフィード表示
- WordPress代替実装

### 16. if(塾)でキミもパワーUP！（コミックセクション）
**ファイル**: `components/Sections/PowerUp.jsx`

#### PC版画像（10枚）
1. `public/2025/03/ifcomicpc5.png`
2. `public/2025/03/ifcomicpc6.png`
3. `public/2025/04/ifcomicpc7.png`
4. `public/2025/03/ifcomicpc8.png`
5. `public/2025/03/ifcomicpc9.png`
6. `public/2025/03/ifcomicpc10.png`
7. `public/2025/03/ifcomicpc11.png`
8. `public/2025/03/ifcomicpc12.png`
9. `public/2025/03/ifcomicpc13.png`
10. `public/2025/03/ifcomicpc14.png`

#### モバイル版画像（19枚）
1. `public/2025/03/ifcomicsp2.png`
2. `public/2025/03/ifcomicsp3.png`
3. `public/2025/03/ifcomicsp4.png`
4. `public/2025/03/ifcomicsp5.png`
5. `public/2025/03/ifcomicsp6.png`
6. `public/2025/03/ifcomicsp7.png`
7. `public/2025/03/ifcomicsp8.png`
8. `public/2025/03/ifcomicsp9.png`
9. `public/2025/03/ifcomicsp10.png`
10. `public/2025/03/ifcomicsp11.png`
11. `public/2025/03/ifcomicsp12.png`
12. `public/2025/03/ifcomicsp13.png`
13. `public/2025/03/ifcomicsp14.png`
14. `public/2025/03/ifcomicsp15.png`
15. `public/2025/03/ifcomicsp16.png`
16. `public/2025/03/ifcomicsp17.png`
17. `public/2025/03/ifcomicsp18.png`
18. `public/2025/03/ifcomicsp19.png`
19. `public/2025/03/ifcomicsp20.png`
20. `public/2025/03/ifcomicsp21.png`

### 17. if(メッセージ)
**ファイル**: `components/Sections/Message.jsx`

#### メッセージ内容
現代は目まぐるしく変化する時代です。AIの活用は今後さらに重要になり、教育の在り方も価値観も変わっていくでしょう。

このサイトは最新AIで制作されています。表現手段とAIを組み合わせれば表現できないものはありません。皆さんもAIを使った開発や起業、自由な表現に挑戦してほしいです。

学校が面白くないと感じる人もいるかもしれません。私たちもそうでした。だからこそ、誰でも楽しめる塾を目指しています。

行動すれば世界は変わります。if(塾)の運営メンバーも高校生から始め、挑戦を形にしています。

まずは日常の何かを変えてみましょう。第一歩として、if(塾)で好きなことに取り組んでみませんか？

if(塾)で、あなたの可能性を最大限に引き出しましょう。

**署名**
- 塾頭: 高崎翔太
- 塾長: 山﨑琢己

### 18. 各種お問い合わせ
**ファイル**: `components/Sections/Contact.jsx`

#### リンク設定
1. **お問い合わせ**: https://if-juku.net/contact/
2. **資料請求**: https://if-juku.net/wp-content/uploads/2024/08/if塾パンフレット.pdf
3. **体験授業申し込み**: https://if-juku.net/trial/
4. **LINE公式アカウント**: https://lin.ee/lGK9c4Nx

## アニメーション・エフェクト仕様

### 1. Twinkling Text
各セクションタイトルに適用するキラキラアニメーション

### 2. 背景エフェクト
- **星空背景**: 複数レイヤーの星座アニメーション
- **サイバーグリッド**: デジタル格子背景
- **パーティクル**: 浮遊する粒子エフェクト
- **炎エフェクト**: チャレンジセクション用
- **雲エフェクト**: サービスセクション用

### 3. ホバーエフェクト
- サービスブロックのホバー
- ボタンのグリッチエフェクト
- ナビゲーションメニュー

## レスポンシブ対応

### ブレークポイント
- PC: 769px以上
- モバイル: 768px以下

### 切り替え要素
- 動画ファイル
- 画像ファイル
- レイアウト
- ナビゲーション形式

## Swiper設定

### 基本設定
```javascript
const swiperConfig = {
  direction: 'vertical',
  slidesPerView: 1,
  spaceBetween: 0,
  mousewheel: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  allowTouchMove: true,
  speed: 600,
};
```

### スライド順序
1. メインビジュアル
2. if(塾)について
3. コース紹介
4. 授業スケジュール
5. サービス内容
6. if(チャレンジ)
7. if(チャレンジ)forビギナー
8. if(塾)が取り組む課題
9. 入塾までの流れ
10. 運営メンバー
11. オンライン教材
12. お知らせ
13. よくある質問
14. YouTube
15. if(塾)でキミもパワーUP！（PC: 10スライド、モバイル: 19スライド）
16. if(メッセージ)
17. 各種お問い合わせ

## データ管理

### 静的データ
メンバー情報、FAQ、サービス内容などは定数として管理

### 動的データ
WordPressからのブログ投稿、YouTubeフィードは別途API実装

## スタイリング要件

### テーマカラー
- メイン: サイバーブルー
- アクセント: ネオングリーン
- 背景: ダークトーン

### フォント
- 日本語: Noto Sans Japanese
- 英数字: Roboto

### エフェクト
- グロー効果
- ネオンライト
- グリッチエフェクト
- パーティクル

## パフォーマンス要件

### 最適化ポイント
- 画像の遅延読み込み
- 動画の最適化
- アニメーションのパフォーマンス調整
- バンドルサイズの最適化

## 互換性要件

### ブラウザサポート
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### デバイス対応
- PC（Windows/Mac）
- スマートフォン（iOS/Android）
- タブレット

---

## 使用画像・動画一覧

### 動画
1. `public/2025/04/ifmv2.mp4` - メインビジュアル（PC版）
2. `public/2025/04/ifmvsp-1.mp4` - メインビジュアル（モバイル版）

### サービス画像
1. `public/2025/02/1.png` - オンライン授業
2. `public/2025/02/2.png` - オフラインイベント
3. `public/2025/02/3.png` - 教育相談
4. `public/2025/02/4.png` - 案件割振
5. `public/2025/02/5.png` - 独立サポート
6. `public/2025/02/6.png` - AI先生

### チャレンジ画像
1. `public/2025/04/能動的に学ぶ.png` - チャレンジサイクル（PC版）
2. `public/2025/04/名称未設定のデザイン-34.png` - チャレンジサイクル（モバイル版）

### クエスト画像
1. `public/2025/03/quest1.png` - 動画編集
2. `public/2025/03/quest2.png` - Minecraft建築
3. `public/2025/03/quest3.png` - Web開発
4. `public/2025/03/quest4.png` - SNS投稿
5. `public/2025/03/quest5.png` - イラスト
6. `public/2025/03/quest6.png` - AI開発

### 課題画像
1. `public/2025/03/ideal1.png` - 広がる経済格差
2. `public/2025/03/ideal2.png` - 増え続ける不登校
3. `public/2025/03/ideal3.png` - 地方と都市部のデジタルディバイド

### フロー画像
1. `public/2025/04/flow_pc.png` - 入塾フロー（PC版）
2. `public/2025/04/flow_sp.png` - 入塾フロー（モバイル版）

### メンバー画像（PC版）
1. `public/2025/02/IMG_9646-scaled.jpg` - 塾頭: 高崎翔太
2. `public/2025/02/takumi.png` - 塾長: 山﨑琢己
3. `public/2025/02/IMG_9909-scaled.jpg` - CFO: 加賀屋結眞
4. `public/2025/02/120362.jpg` - CTO: 井上陽斗
5. `public/2024/12/IMG_20240825_151743-scaled.jpg` - 専属e-Sports Player: Y君

### メンバー画像（モバイル版）
1. `public/2025/02/1-1.png` - 塾頭: 高崎翔太
2. `public/2025/02/2-1.png` - 塾長: 山﨑琢己
3. `public/2025/02/3-1.png` - CFO: 加賀屋結眞
4. `public/2025/02/4-1.png` - CTO: 井上陽斗
5. `public/2025/02/5-1.png` - 専属e-Sports Player: Y君

### FAQ画像
1. `public/2025/02/getabako0.png` - キャラクター（閉じた状態）
2. `public/2025/02/getabako1.png` - キャラクター（開いた状態）

### パワーUP画像（PC版）
1. `public/2025/03/ifcomicpc5.png` - パワーアップ1
2. `public/2025/03/ifcomicpc6.png` - パワーアップ2
3. `public/2025/04/ifcomicpc7.png` - パワーアップ3
4. `public/2025/03/ifcomicpc8.png` - パワーアップ4
5. `public/2025/03/ifcomicpc9.png` - パワーアップ5
6. `public/2025/03/ifcomicpc10.png` - パワーアップ6
7. `public/2025/03/ifcomicpc11.png` - パワーアップ7
8. `public/2025/03/ifcomicpc12.png` - パワーアップ8
9. `public/2025/03/ifcomicpc13.png` - パワーアップ9
10. `public/2025/03/ifcomicpc14.png` - パワーアップ10

### パワーUP画像（モバイル版）
1. `public/2025/03/ifcomicsp2.png` - パワーアップSP1
2. `public/2025/03/ifcomicsp3.png` - パワーアップSP2
3. `public/2025/03/ifcomicsp4.png` - パワーアップSP3
4. `public/2025/03/ifcomicsp5.png` - パワーアップSP4
5. `public/2025/03/ifcomicsp6.png` - パワーアップSP5
6. `public/2025/03/ifcomicsp7.png` - パワーアップSP6
7. `public/2025/03/ifcomicsp8.png` - パワーアップSP7
8. `public/2025/03/ifcomicsp9.png` - パワーアップSP8
9. `public/2025/03/ifcomicsp10.png` - パワーアップSP9
10. `public/2025/03/ifcomicsp11.png` - パワーアップSP10
11. `public/2025/03/ifcomicsp12.png` - パワーアップSP11
12. `public/2025/03/ifcomicsp13.png` - パワーアップSP12
13. `public/2025/03/ifcomicsp14.png` - パワーアップSP13
14. `public/2025/03/ifcomicsp15.png` - パワーアップSP14
15. `public/2025/03/ifcomicsp16.png` - パワーアップSP15
16. `public/2025/03/ifcomicsp17.png` - パワーアップSP16
17. `public/2025/03/ifcomicsp18.png` - パワーアップSP17
18. `public/2025/03/ifcomicsp19.png` - パワーアップSP18
19. `public/2025/03/ifcomicsp20.png` - パワーアップSP19
20. `public/2025/03/ifcomicsp21.png` - パワーアップSP20

**合計: 動画2本、画像59枚**