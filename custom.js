/**
 * if(塾)ランディングページ用JavaScriptコード
 * スワイプ型LP操作のためのインタラクティブ機能を提供します
 */
document.addEventListener('DOMContentLoaded', function() {
    /**
     * デバイスタイプに応じたスライド表示切り替え機能
     * PCとSP(スマートフォン)で表示するコンテンツを自動的に切り替えます
     * @param {Object} swiper - Swiperインスタンス（nullの場合もあり）
     */
    function toggleDeviceSpecificSlides(swiper) {
        const isMobile = window.innerWidth <= 768;
        const pcSlides = document.querySelectorAll('.pc-only');
        const spSlides = document.querySelectorAll('.sp-only');
        
        // PC向け要素の表示/非表示を切り替え
        pcSlides.forEach(slide => {
            if (isMobile) {
                slide.style.display = 'none';
            } else {
                // PCモードで表示する際にdisplayを'block'ではなく、元のdisplay値を保持
                if (slide.classList.contains('flow-steps-container')) {
                    slide.style.display = 'flex'; // フローステップコンテナには'flex'を適用
                } else {
                    slide.style.display = 'block';
                }
            }
        });
        
        // SP向け要素の表示/非表示を切り替え
        spSlides.forEach(slide => {
            if (isMobile) {
                if (slide.classList.contains('flow-steps-container')) {
                    slide.style.display = 'block'; // スマホ用フローステップコンテナは'block'を適用
                }
                else {
                    slide.style.display = 'block';
                }
            } else {
                slide.style.display = 'none';
            }
        });
        
        // swiperが初期化されている場合のみupdateを呼び出す
        if (swiper) {
            swiper.update();
        }
    }

    /**
     * WordPressショートコードをロードする関数
     * 各セクションの動的コンテンツをAjaxで取得してレンダリングします
     */
    function loadShortcodes() {
        // メンバープロフィールセクション
        const membersContent = document.querySelector('.members-content');
        if (membersContent && membersContent.innerHTML.trim().length < 10) {
            // ショートコードが読み込まれていない場合はAjaxで取得
            fetch('/wp-admin/admin-ajax.php?action=load_members_content')
                .then(response => response.text())
                .then(data => {
                    membersContent.innerHTML = data;
                })
                .catch(error => console.error('Error loading members content:', error));
        }
        
        // オンライン教材セクション
        const materialsContent = document.querySelector('.materials-content');
        if (materialsContent && materialsContent.innerHTML.includes('[post_list')) {
            // ショートコードをレンダリング
            fetch('/wp-admin/admin-ajax.php?action=render_shortcode&shortcode=' + encodeURIComponent(materialsContent.innerHTML))
                .then(response => response.text())
                .then(data => {
                    materialsContent.innerHTML = data;
                })
                .catch(error => console.error('Error rendering materials shortcode:', error));
        }
        
        // お知らせセクション
        const newsContent = document.querySelector('.news-content');
        if (newsContent && newsContent.innerHTML.includes('[post_list')) {
            // ショートコードをレンダリング
            fetch('/wp-admin/admin-ajax.php?action=render_shortcode&shortcode=' + encodeURIComponent(newsContent.innerHTML))
                .then(response => response.text())
                .then(data => {
                    newsContent.innerHTML = data;
                })
                .catch(error => console.error('Error rendering news shortcode:', error));
        }
        
        // YouTube フィードセクション
        const youtubeContent = document.querySelector('.youtube-feed-container');
        if (youtubeContent && youtubeContent.innerHTML.includes('[youtube-feed')) {
            // ショートコードをレンダリング
            fetch('/wp-admin/admin-ajax.php?action=render_shortcode&shortcode=' + encodeURIComponent(youtubeContent.innerHTML))
                .then(response => response.text())
                .then(data => {
                    youtubeContent.innerHTML = data;
                })
                .catch(error => console.error('Error rendering youtube shortcode:', error));
        }
        
        // お問い合わせフォームセクション
        const contactContent = document.querySelector('.contact-form-container');
        if (contactContent && contactContent.innerHTML.includes('[contact-form-7')) {
            // ショートコードをレンダリング
            fetch('/wp-admin/admin-ajax.php?action=render_shortcode&shortcode=' + encodeURIComponent(contactContent.innerHTML))
                .then(response => response.text())
                .then(data => {
                    contactContent.innerHTML = data;
                })
                .catch(error => console.error('Error rendering contact form shortcode:', error));
        }
    }

    // 最初にデバイスごとの表示/非表示を設定（swiperなしで呼び出し）
    toggleDeviceSpecificSlides(null);
    
    // 取り組む課題セクションのスライダー初期化
    setupIssuesSlider();
    
    /**
     * Swiperの初期化と設定
     * 垂直方向のスワイプによるページ切り替え機能を提供します
     */
    const swiper = new Swiper('.swiper-container', {
        direction: 'vertical', // 縦方向のスワイプ
        slidesPerView: 1,
        spaceBetween: 0,
        mousewheel: {
            enabled: true,
            sensitivity: 0.5, // マウスホイールの感度を下げて誤操作を防ぐ
            releaseOnEdges: true, // エッジでリリース
            thresholdDelta: 50, // より大きな閾値で意図的な操作のみ反応
            thresholdTime: 300, // 連続操作の間隔を調整
        },
        keyboard: {
            enabled: true,
        },
        speed: 600, // より軽快なトランジションスピード
        effect: 'slide', // スライドエフェクト
        autoplay: false, // 自動再生を完全に無効
        freeMode: false, // フリーモードを無効にして意図的な操作のみ
        resistanceRatio: 0.85, // 抵抗を強めて誤操作を防ぐ
        touchRatio: 1.0, // タッチ操作の感度を標準に戻す
        touchAngle: 30, // タッチ角度を狭めて縦方向スワイプのみ認識
        threshold: 20, // より大きな動きでスワイプを認識（誤操作防止）
        followFinger: true, // 指の動きにリアルタイムで追従
        shortSwipes: false, // 短いスワイプを無効にして意図的な操作のみ
        longSwipesRatio: 0.5, // 長いスワイプの閾値を上げる
        longSwipesMs: 300, // 長いスワイプの時間を長めに
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            renderBullet: function (index, className) {
                return '<span class="' + className + '"></span>';
            },
        },
        on: {
            // Swiper初期化時の処理
            init: function() {
                // 初期化時に特定のクラスを持つスライドを表示/非表示
                toggleDeviceSpecificSlides(this);
                // コースタブの初期化（遅延実行して確実に初期化）
                setTimeout(initCourseTabs, 300);
                // メンバープロフィールを初期化（遅延実行）
                setTimeout(setupMemberProfiles, 300);
                // 取り組む課題セクションのスライダー初期化
                setTimeout(setupIssuesSlider, 300);
            },
            // リサイズ時の処理
            resize: function() {
                // ウィンドウサイズ変更時に再計算
                toggleDeviceSpecificSlides(this);
                setupMemberProfiles(); // メンバープロフィールを再初期化
                setupIssuesSlider(); // 課題セクションのスライダーを再初期化
            },
            // スライド変更時の処理
            slideChange: function() {
                // 現在のスライドを取得
                const currentSlide = this.slides[this.activeIndex];
                
                // コースセクション移動時の処理
                if (currentSlide && currentSlide.classList.contains('course-section')) {
                    setTimeout(initCourseTabs, 100);
                }
                
                // メンバープロフィールセクション移動時の処理
                if (currentSlide && currentSlide.classList.contains('members-section')) {
                    setTimeout(setupMemberProfiles, 100);
                }
                
                // よくある質問セクション移動時の処理
                if (currentSlide && currentSlide.classList.contains('faq-section')) {
                    setTimeout(setupFAQSystem, 100);
                }
                
                // 課題セクション移動時の処理
                if (currentSlide && currentSlide.classList.contains('issues-section')) {
                    setTimeout(setupIssuesSlider, 100);
                }
                
                // ショートコードを使用するセクション移動時の処理
                if (currentSlide && (
                    currentSlide.classList.contains('members-section') || 
                    currentSlide.classList.contains('materials-section') || 
                    currentSlide.classList.contains('news-section') ||
                    currentSlide.classList.contains('youtube-section') ||
                    currentSlide.classList.contains('contact-section')
                )) {
                    setTimeout(loadShortcodes, 100);
                }
            }
        }
    });

    /**
     * タッチ操作時のスクロール制御
     * よりレスポンシブなタッチ操作のための改善
     */
    let touchStartY = 0;
    let touchMoveY = 0;
    let isSwiping = false;
    
    document.addEventListener('touchstart', function(e) {
        touchStartY = e.touches[0].clientY;
        isSwiping = false;
    }, { passive: true });
    
    document.addEventListener('touchmove', function(e) {
        if (e.touches.length > 1) return;
        
        touchMoveY = e.touches[0].clientY;
        const deltaY = Math.abs(touchMoveY - touchStartY);
        
        // より大きな動きでスワイプとして認識（誤操作防止）
        if (deltaY > 15) {
            isSwiping = true;
        }
        
        // コースセクション内ではスクロールを許可
        const courseContainer = document.querySelector('.course-bg');
        if (courseContainer && courseContainer.contains(e.target)) {
            return; // スクロールを許可
        }
        
        // スワイプ中は適切に処理
        if (isSwiping) {
            // Swiperが処理するのでpreventDefaultしない
            return;
        }
    }, { passive: true });

    /**
     * スワイプガイド表示制御
     * ユーザーにスワイプ操作を促すためのガイドを表示します
     */
    const swipeGuide = document.querySelector('.swipe-guide');
    let fadeTimeout;

    function showSwipeGuide() {
        if (!swipeGuide) return;
        swipeGuide.style.opacity = 1;
        clearTimeout(fadeTimeout);
        fadeTimeout = setTimeout(() => {
            swipeGuide.style.opacity = 0;
        }, 3000);
    }

    // スライド変更時にガイドを表示
    swiper.on('slideChange', function() {
        showSwipeGuide();
    });

    // 初期表示時にもガイドを表示
    showSwipeGuide();

    // 操作がない場合、定期的にガイドを表示
    setInterval(showSwipeGuide, 7000);

    /**
     * メインビデオの自動進行処理
     * 動画が終了したら自動的に次のスライドに進みます
     */
    const mainVideos = document.querySelectorAll('.main-video');
    mainVideos.forEach(video => {
        video.addEventListener('ended', function() {
            swiper.slideNext();
        });
    });

    /**
     * モバイルデバイス用の操作制御
     * ダブルタップによるズームを防止します
     */
    document.addEventListener('gesturestart', function(e) {
        e.preventDefault();
    });
    
    // タブボタンのクリックイベント設定
    addTabButtonEvents();
    
    /**
     * 初期表示時のタブ選択
     * リベラルコースタブをデフォルトで選択状態にします
     */
    setTimeout(function() {
        const liberalButton = document.querySelector('.tab-button[data-tab="liberal"]');
        if (liberalButton) {
            liberalButton.classList.add('active');
            const tabId = liberalButton.getAttribute('data-tab');
            showTabContent(tabId);
        }
    }, 500);
    
    // サービスブロッククリックイベント設定
    setupServiceBlocks(swiper);
    
    // メンバープロフィールのナビゲーション設定
    setupMemberProfiles();
    
    // FAQシステム設定
    setupFAQSystem();
    
    // 初期表示時にショートコードを読み込み
    loadShortcodes();
});

/**
 * 取り組む課題セクションのスライダー処理
 * カード型スライダーの動作を設定します
 */
function setupIssuesSlider() {
    const slides = document.querySelectorAll('.issue-slide');
    const dots = document.querySelectorAll('.issue-dot');
    const prevBtn = document.querySelector('.issues-slider-controls .prev-btn');
    const nextBtn = document.querySelector('.issues-slider-controls .next-btn');
    
    if (slides.length === 0 || dots.length === 0) return;
    
    let currentSlideIndex = 0;
    
    /**
     * スライドを表示する関数
     * 指定されたインデックスのスライドをアクティブにします
     * @param {number} index - 表示するスライドのインデックス
     */
    function showSlide(index) {
        // すべてのスライドを非表示にする
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // 指定されたスライドとドットをアクティブにする
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        
        currentSlideIndex = index;
    }
    
    /**
     * 次のスライドを表示する関数
     * 現在のスライドの次のスライドを表示します（最後の場合は最初に戻る）
     */
    function showNextSlide() {
        let nextIndex = currentSlideIndex + 1;
        if (nextIndex >= slides.length) {
            nextIndex = 0;
        }
        showSlide(nextIndex);
    }
    
    /**
     * 前のスライドを表示する関数
     * 現在のスライドの前のスライドを表示します（最初の場合は最後に移動）
     */
    function showPrevSlide() {
        let prevIndex = currentSlideIndex - 1;
        if (prevIndex < 0) {
            prevIndex = slides.length - 1;
        }
        showSlide(prevIndex);
    }
    
    // 前後ボタンイベントの設定
    if (nextBtn) nextBtn.addEventListener('click', showNextSlide);
    if (prevBtn) prevBtn.addEventListener('click', showPrevSlide);
    
    // ドットクリックイベント
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showSlide(index);
        });
    });
    
    // 初期表示
    showSlide(0);
    
    // 自動スライド（10秒ごとに切り替え）
    const autoSlideInterval = setInterval(showNextSlide, 10000);
    
    // スライダーが存在しない場合は自動スライドを停止
    const observer = new MutationObserver((mutations) => {
        const slider = document.querySelector('.issues-slider-container');
        if (!slider || !document.body.contains(slider)) {
            clearInterval(autoSlideInterval);
            observer.disconnect();
        }
    });
    
    observer.observe(document.body, { childList: true, subtree: true });
}

/**
 * サービスブロックとモーダルの設定
 * サービス紹介モーダルの表示・非表示を制御します
 * @param {Object} swiper - Swiperインスタンス
 */
function setupServiceBlocks(swiper) {
    const serviceBlocks = document.querySelectorAll('.service-block');
    const serviceSection = document.querySelector('.service-section');
    
    if (!serviceSection) return;
    
    // モーダルを.service-sectionの中に移動
    const modal = document.getElementById('service-modal');
    if (!modal) return;
    
    // 現在のモーダルをサービスセクションに移動 (既に子要素の場合は移動しない)
    if (modal.parentElement !== serviceSection) {
        serviceSection.appendChild(modal);
    }
    
    const modalTitle = modal.querySelector('.modal-title');
    const modalBody = modal.querySelector('.modal-body');
    const modalClose = modal.querySelector('.modal-close');
    const modalOverlay = modal.querySelector('.modal-overlay');
    
    // サービス情報定義
    const serviceInfo = {
        'online': {
            title: 'オンライン授業',
            content: '最新のテクノロジーを活用した双方向型のオンライン授業です。自宅にいながら、専門講師からマインクラフトやAIを学ぶことができます。'
        },
        'offline': {
            title: 'オフラインイベント',
            content: '定期的に開催される対面イベントで、仲間と一緒に学び、交流を深めましょう。実際に会って話すことで生まれる化学反応を体験できます。'
        },
        'consultation': {
            title: '教育相談',
            content: '発達特性や学習面でのお悩みに、専門知識を持った講師が丁寧に対応します。お子様に合った学び方を一緒に見つけていきましょう。'
        },
        'projects': {
            title: '案件割振',
            content: '身につけたスキルを活かして実際の仕事に挑戦できます。報酬を得ながら実践的な経験を積むことができる貴重な機会です。'
        },
        'independence': {
            title: '独立サポート',
            content: '将来独立して働きたい方向けに、ビジネスモデルの構築から起業までをサポートします。自分の強みを活かした働き方を実現しましょう。'
        },
        'ai': {
            title: 'AI先生',
            content: '最新のAI技術を活用した個別学習支援システムです。24時間いつでも質問できる環境で、自分のペースで学習を進められます。'
        }
    };
    
    // サービスブロッククリックイベント
    serviceBlocks.forEach(block => {
        block.addEventListener('click', function() {
            const serviceType = this.getAttribute('data-service');
            const service = serviceInfo[serviceType];
            
            if (service) {
                modalTitle.textContent = service.title;
                modalBody.textContent = service.content;
                modal.classList.add('show');
                
                // モーダル表示中はスワイプを無効化
                if (swiper) swiper.allowTouchMove = false;
            }
        });
    });
    
    /**
     * モーダルを閉じる関数
     * モーダルを非表示にし、スワイプを再度有効化します
     */
    function closeModal() {
        modal.classList.remove('show');
        // スワイプを再度有効化
        if (swiper) swiper.allowTouchMove = true;
    }
    
    // 閉じるボタンとオーバーレイのクリックイベント
    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalOverlay) modalOverlay.addEventListener('click', closeModal);
}

/**
 * 運営メンバーセクションのナビゲーション設定
 * メンバープロフィールスライダーの操作と自動切り替えを設定します
 */
function setupMemberProfiles() {
    const profiles = document.querySelectorAll('.member-profile');
    const dots = document.querySelectorAll('.member-dot');
    const prevBtn = document.querySelector('.members-controls .prev-btn');
    const nextBtn = document.querySelector('.members-controls .next-btn');
    
    if (profiles.length === 0) return;
    
    let currentProfileIndex = 0;
    
    // 最初のプロフィールをアクティブにする
    profiles.forEach(profile => profile.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // 最初のプロフィールをアクティブにする
    profiles[0].classList.add('active');
    dots[0].classList.add('active');
    
    // SP版用のバナーが既に存在しない場合のみ追加
    profiles.forEach(profile => {
        const memberTitle = profile.querySelector('.member-title');
        const memberImage = profile.querySelector('.member-image');
        
        if (memberTitle && memberImage && !memberImage.querySelector('.member-banner')) {
            const banner = document.createElement('div');
            banner.className = 'member-banner';
            
            const bannerText = document.createElement('div');
            bannerText.className = 'member-banner-text';
            bannerText.textContent = memberTitle.textContent;
            
            banner.appendChild(bannerText);
            memberImage.appendChild(banner);
        }
    });
    
    /**
     * プロフィールを表示する関数
     * 指定されたインデックスのプロフィールをアクティブにします
     * @param {number} index - 表示するプロフィールのインデックス
     */
    function showProfile(index) {
        // 現在のプロフィールを非アクティブにする
        profiles.forEach(profile => profile.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // 指定されたプロフィールをアクティブにする
        profiles[index].classList.add('active');
        dots[index].classList.add('active');
        
        currentProfileIndex = index;
    }
    
    /**
     * 次のプロフィールを表示する関数
     * 現在のプロフィールの次のプロフィールを表示します（最後の場合は最初に戻る）
     */
    function showNextProfile() {
        let nextIndex = currentProfileIndex + 1;
        if (nextIndex >= profiles.length) {
            nextIndex = 0;
        }
        showProfile(nextIndex);
    }
    
    /**
     * 前のプロフィールを表示する関数
     * 現在のプロフィールの前のプロフィールを表示します（最初の場合は最後に移動）
     */
    function showPrevProfile() {
        let prevIndex = currentProfileIndex - 1;
        if (prevIndex < 0) {
            prevIndex = profiles.length - 1;
        }
        showProfile(prevIndex);
    }
    
    // 前後ボタンイベントの設定
    if (nextBtn) nextBtn.addEventListener('click', showNextProfile);
    if (prevBtn) prevBtn.addEventListener('click', showPrevProfile);
    
    // ドットクリックイベント
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showProfile(index);
        });
    });
    
    // 自動スライド（12秒ごとに切り替え）
    setInterval(showNextProfile, 12000);
}

/**
 * よくある質問セクションFAQシステムの設定
 * 質問ボタンクリック時のアニメーションと回答表示を設定
 */
function setupFAQSystem() {
    console.log('FAQ System Setup Start'); // デバッグログ
    
    // DOM要素の取得
    const questionBtns = document.querySelectorAll('.question-btn');
    const messageDisplay = document.getElementById('message-display');
    const characterClosed = document.querySelector('.character-image.closed');
    const characterOpen = document.querySelector('.character-image.open');
    
    if (!messageDisplay) {
        console.log('Message display element not found');
        return;
    }
    
    // 状態管理変数
    let isAnimating = false;
    let mouthInterval = null;
    let typeInterval = null;
    
    // 既存のイベントリスナーをすべて削除（重要）
    questionBtns.forEach(btn => {
        const newBtn = btn.cloneNode(true);
        if (btn.parentNode) {
            btn.parentNode.replaceChild(newBtn, btn);
        }
    });
    
    // 新しいボタン要素を取得
    const newQuestionBtns = document.querySelectorAll('.question-btn');
    
    // タイピングエフェクト用関数
    function typeText(text, element, onComplete) {
        console.log('Starting typing effect with text:', text.substring(0, 20) + '...'); // デバッグログ
        
        if (!text || !element) return;
        
        // 表示する文字列を配列に変換
        const characters = text.split('');
        let index = 0;
        element.textContent = '';
        
        // すべての実行中のインターバルをクリア
        if (typeInterval) {
            clearInterval(typeInterval);
            typeInterval = null;
        }
        
        // 口パクアニメーションの開始
        if (mouthInterval) {
            clearInterval(mouthInterval);
            mouthInterval = null;
        }
        
        let mouthState = true;
        mouthInterval = setInterval(() => {
            mouthState = !mouthState;
            if (mouthState) {
                characterClosed.style.opacity = 0;
                characterOpen.style.opacity = 1;
            } else {
                characterClosed.style.opacity = 1;
                characterOpen.style.opacity = 0;
            }
        }, 150);
        
        // 文字の表示を開始（setTimeout を使用）
        function typeLetter() {
            if (index < characters.length) {
                element.textContent += characters[index];
                index++;
                setTimeout(typeLetter, 50);
            } else {
                // アニメーション完了
                if (mouthInterval) {
                    clearInterval(mouthInterval);
                    mouthInterval = null;
                }
                characterClosed.style.opacity = 1;
                characterOpen.style.opacity = 0;
                
                if (typeof onComplete === 'function') {
                    onComplete();
                }
            }
        }
        
        // 最初の文字をタイプ開始
        setTimeout(typeLetter, 50);
    }
    
    // 各質問ボタンにクリックイベントを設定
    newQuestionBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            if (isAnimating) {
                console.log('Animation already in progress, ignoring click');
                return;
            }
            
            const answer = this.getAttribute('data-answer') || '';
            console.log('Button clicked, answer:', answer.substring(0, 20) + '...'); // デバッグログ
            
            isAnimating = true;
            
            // タイピングエフェクトの実行
            typeText(answer, messageDisplay, () => {
                console.log('Typing complete'); // デバッグログ
                isAnimating = false;
            });
        });
    });
    
    // 初期メッセージが設定されていない場合に設定
    if (!messageDisplay.textContent || messageDisplay.textContent.trim() === '') {
        messageDisplay.textContent = '質問を選んでね！答えるよ～';
    }
    
    console.log('FAQ System Setup Complete'); // デバッグログ
}

/**
 * コースタブの初期化処理
 * タブ切り替え機能を初期化します
 */
function initCourseTabs() {
    addTabButtonEvents();
    
    // 既にアクティブなタブがあればそれを表示、なければ最初のタブを表示
    const activeButton = document.querySelector('.tab-button.active');
    if (activeButton) {
        const tabId = activeButton.getAttribute('data-tab');
        showTabContent(tabId);
    } else {
        const firstButton = document.querySelector('.tab-button');
        if (firstButton) {
            firstButton.classList.add('active');
            const tabId = firstButton.getAttribute('data-tab');
            showTabContent(tabId);
        }
    }
}

/**
 * タブボタンにイベントを追加
 * タブのクリックイベントを設定します
 */
function addTabButtonEvents() {
    const tabButtons = document.querySelectorAll('.tab-button');
    
    tabButtons.forEach(button => {
        // すでにイベントが設定されている場合は、一旦削除
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);
    });
    
    // 新しいボタン要素を再取得
    const newTabButtons = document.querySelectorAll('.tab-button');
    
    newTabButtons.forEach(button => {
        // 新しいクリックイベントを設定
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // すべてのボタンから active クラスを削除（新しいボタンリストを使用）
            newTabButtons.forEach(btn => btn.classList.remove('active'));
            
            // クリックされたボタンに active クラスを追加
            this.classList.add('active');
            
            // 対応するタブコンテンツを表示
            const tabId = this.getAttribute('data-tab');
            showTabContent(tabId);
        });
    });
}

/**
 * タブコンテンツの表示を切り替える
 * 指定されたタブIDに対応するコンテンツを表示します
 * @param {string} tabId - 表示するタブのID
 */
function showTabContent(tabId) {
    // すべてのタブコンテンツを非表示
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.classList.remove('active');
        content.style.display = 'none';
    });
    
    // 指定されたタブコンテンツを表示
    const activeContent = document.getElementById(tabId + '-content');
    if (activeContent) {
        activeContent.style.display = 'block';
        setTimeout(() => {
            activeContent.classList.add('active');
        }, 50);
    }
}

/**
 * ウィンドウのリサイズやデバイス回転時の処理
 * 画面サイズ変更時に各コンポーネントを再初期化します
 */
window.addEventListener('resize', function() {
    // コースタブを再初期化
    initCourseTabs();
    
    // メンバープロフィールの初期化
    if (typeof setupMemberProfiles === 'function') {
        setupMemberProfiles();
    }
    
    // 課題セクションのスライダー初期化
    if (typeof setupIssuesSlider === 'function') {
        setupIssuesSlider();
    }
    
    // FAQ システムの初期化
    if (typeof setupFAQSystem === 'function') {
        setupFAQSystem();
    }
    
    // ショートコードの再読み込み
    if (typeof loadShortcodes === 'function') {
        loadShortcodes();
    }
});

// スワイパー更新のための追加コード
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        // すべての swiper-slide を再度取得
        const allSlides = document.querySelectorAll('.swiper-slide');
        console.log('Total slides:', allSlides.length);
        
        // スワイパーがすでに初期化されていれば更新
        if (window.swiper) {
            window.swiper.update();
            console.log('Swiper updated');
        }
        
        // 最後のスライドの後に各種お問い合わせセクションが配置されているか確認
        const contactSection = document.querySelector('.contact-links-section');
        if (contactSection) {
            console.log('Contact section found');
            // 必要に応じて親要素（swiper-wrapper）に追加
            const swiperWrapper = document.querySelector('.swiper-wrapper');
            if (swiperWrapper && !swiperWrapper.contains(contactSection)) {
                swiperWrapper.appendChild(contactSection);
                console.log('Contact section added to swiper-wrapper');
                
                // スワイパーを更新
                if (window.swiper) {
                    window.swiper.update();
                    console.log('Swiper updated after adding contact section');
                }
            }
        } else {
            console.log('Contact section not found');
        }
    }, 1000); // 1秒後に実行（ページ読み込み完了を待つ）
});

/**
 * if(塾)カスタムナビゲーションスクリプト (Swiper連携版) v3
 * - Swiperスライドへの移動 (URL形式のhref対応強化)
 * - PC版サブメニューホバー
 * - SP版ハンバーガーメニュー動作
 * - SP版サブメニューアコーディオン
 * - Swiperインスタンス取得のログ強化と安定化試行
 */
document.addEventListener('DOMContentLoaded', function() {
  console.log('if(塾)カスタムナビゲーションスクリプト (Swiper連携版) v3 読み込み');

  // --- Swiperインスタンス取得処理 ---
  let swiperInitializationAttempts = 0;
  const maxSwiperInitializationAttempts = 10;

  function initializeSwiperIntegration() {
    swiperInitializationAttempts++;
    console.log(`Swiperインスタンス取得試行 ${swiperInitializationAttempts}回目`);

    // --- ↓↓↓ Swiperコンテナ要素の【正しいセレクタ】に置き換えてください ↓↓↓ ---
    const swiperSelector = '.swiper-container';
    // --- ↑↑↑ Swiperコンテナ要素の【正しいセレクタ】に置き換えてください ↑↑↑ ---

    const swiperElem = document.querySelector(swiperSelector);

    if (!swiperElem) {
        console.error(`Swiperコンテナ要素 (${swiperSelector}) がDOMに見つかりません。`);
        if (swiperInitializationAttempts < maxSwiperInitializationAttempts) {
             setTimeout(initializeSwiperIntegration, 500);
        } else {
            console.error('Swiperコンテナ要素が見つからないため、初期化を中止。');
        }
        return;
    }

    if (swiperElem.swiper && typeof swiperElem.swiper.slideTo === 'function' && !window.swiper) { // slideToメソッドの存在も確認
        window.swiper = swiperElem.swiper;
        console.log('%cSwiperインスタンス取得成功！', 'color: green; font-weight: bold;');
        try {
            document.dispatchEvent(new CustomEvent('swiper:initialized', { detail: { swiper: window.swiper } }));
            console.log('swiper:initialized イベントを発火しました。');
        } catch (e) {
            console.error('swiper:initialized イベントの発火失敗:', e);
        }
    } else if (!window.swiper) {
        if (swiperInitializationAttempts < maxSwiperInitializationAttempts) {
             console.log('Swiperインスタンスはまだ利用できません。500ms後に再試行...');
             setTimeout(initializeSwiperIntegration, 500);
        } else {
             console.error(`Swiperインスタンスを ${maxSwiperInitializationAttempts}回試行しても取得できませんでした。`);
        }
    } else {
         console.log('Swiperインスタンスは既に取得済み。');
         // 既に取得済みでもイベントを発火
         if (document.dispatchEvent) {
            document.dispatchEvent(new CustomEvent('swiper:initialized', { detail: { swiper: window.swiper } }));
         }
    }
  }
  setTimeout(initializeSwiperIntegration, 100);

  // --- cyberNav オブジェクト定義 ---
  const cyberNav = {
    pcNavContainer: document.querySelector('.cyber-nav-container'),
    hamburger: document.querySelector('.cyber-hamburger'),
    mobileNav: document.querySelector('.cyber-mobile-nav'),
    mobileNavContainer: document.querySelector('.cyber-mobile-nav__container'),
    mobileNavCloseBtn: document.querySelector('.cyber-mobile-nav__close'),
    mobileNavOverlay: document.querySelector('.cyber-mobile-nav__overlay'),
    pcSubmenuItems: document.querySelectorAll('.cyber-nav__item.has-submenu'),
    mobileSubmenuToggles: document.querySelectorAll('.cyber-mobile-nav__toggle'),
    smoothScrollLinks: document.querySelectorAll('.cyber-nav__link, .cyber-nav__sublink, .cyber-mobile-nav__link, .cyber-mobile-nav__sublink'), // 対象を全てのリンクに変更

    init: function() {
      try {
        if (this.pcNavContainer) { // PCナビコンテナがあれば初期化
            if (this.pcSubmenuItems.length > 0) this.setupPcSubmenus();
        } else {
            console.log("PCナビゲーションコンテナ (.cyber-nav-container) が見つかりません。");
        }

        if (this.hamburger && this.mobileNav) { // SPナビ関連要素があれば初期化
          this.setupMobileMenu();
          if (this.mobileSubmenuToggles.length > 0) this.setupMobileSubmenus();
        } else {
          console.log('SPナビゲーション要素 (.cyber-hamburger または .cyber-mobile-nav) が見つかりません。');
        }

        // Swiper連携セットアップ
        if (this.smoothScrollLinks.length > 0) {
            if (window.swiper) {
                console.log('既にSwiper準備完了、スライド移動リンク設定開始');
                this.setupSlideLinks();
            } else {
                console.log('Swiper準備待機中... swiper:initialized イベントを待ちます。');
                document.addEventListener('swiper:initialized', () => {
                    console.log('swiper:initialized イベント受信、スライド移動リンク設定開始');
                    this.setupSlideLinks();
                }, { once: true });
            }
        } else {
             console.log('ナビゲーションリンクが見つかりません。');
        }

        console.log('if(塾)カスタムナビゲーション初期化処理完了');

      } catch (error) {
          console.error("cyberNav.init 中にエラーが発生しました:", error);
      }
    },

    setupMobileMenu: function() { /* ... 前回と同じ ... */
       const self = this;
       if (!this.hamburger) return; // 要素チェック
       this.hamburger.addEventListener('click', function(e) {
         e.preventDefault(); e.stopPropagation();
         const isActive = self.mobileNav.classList.toggle('is-active');
         this.classList.toggle('is-active');
         this.setAttribute('aria-expanded', isActive);
         document.body.style.overflow = isActive ? 'hidden' : '';
         try {
             if(window.swiper && typeof window.swiper.allowTouchMove !== 'undefined') {
                window.swiper.allowTouchMove = !isActive;
                if (window.swiper.navigation) isActive ? window.swiper.navigation.disable() : window.swiper.navigation.enable();
                if (window.swiper.pagination) isActive ? window.swiper.pagination.disable() : window.swiper.pagination.enable();
                console.log(`Swiper操作を ${isActive ? '無効化' : '有効化'} しました。`);
             } else if(window.swiper) {
                 console.warn('window.swiper に allowTouchMove プロパティが存在しません。');
             }
         } catch (swiperError) {
             console.warn("メニュー開閉時のSwiper操作切り替えでエラー:", swiperError);
         }
       });
       if (this.mobileNavCloseBtn) { this.mobileNavCloseBtn.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); self.closeMobileMenu(); }); }
       if (this.mobileNavOverlay) { this.mobileNavOverlay.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); self.closeMobileMenu(); }); }
    },

    closeMobileMenu: function() { /* ... 前回と同じ ... */
      if (this.mobileNav && this.mobileNav.classList.contains('is-active')) {
        this.mobileNav.classList.remove('is-active');
        if (this.hamburger) {
          this.hamburger.classList.remove('is-active');
          this.hamburger.setAttribute('aria-expanded', 'false');
        }
        document.body.style.overflow = '';
         try {
             if(window.swiper && typeof window.swiper.allowTouchMove !== 'undefined') {
                window.swiper.allowTouchMove = true;
                if (window.swiper.navigation && window.swiper.navigation.enabled === false) window.swiper.navigation.enable();
                if (window.swiper.pagination && window.swiper.pagination.enabled === false) window.swiper.pagination.enable();
                console.log("Swiper操作を有効化しました。");
             } else if(window.swiper) {
                 console.warn('window.swiper に allowTouchMove プロパティが存在しません。');
             }
         } catch (swiperError) {
             console.warn("メニュークローズ時のSwiper操作有効化でエラー:", swiperError);
         }
      }
    },

    setupPcSubmenus: function() { /* ... 前回と同じ ... */
      this.pcSubmenuItems.forEach(item => {
        const submenu = item.querySelector('.cyber-nav__submenu');
        if (!submenu) return;
        let showTimeout, hideTimeout;
        // mouseenter/mouseleaveで is-hover クラスを付け外し (CSS側で表示制御)
        item.addEventListener('mouseenter', () => { clearTimeout(hideTimeout); item.classList.add('is-hover'); });
        item.addEventListener('mouseleave', () => { clearTimeout(showTimeout); hideTimeout = setTimeout(() => { item.classList.remove('is-hover'); }, 100); });
        // サブメニュー自体にホバーしても消えないように
        submenu.addEventListener('mouseenter', () => { clearTimeout(hideTimeout); });
        submenu.addEventListener('mouseleave', () => { hideTimeout = setTimeout(() => { item.classList.remove('is-hover'); }, 100); });
      });
    },

    setupMobileSubmenus: function() { /* ... 前回と同じ ... */
       const self = this;
       this.mobileSubmenuToggles.forEach(button => {
         // 既存リスナー削除（念のため）
         const newButton = button.cloneNode(true);
         button.parentNode.replaceChild(newButton, button);

         newButton.addEventListener('click', function(e) {
           e.preventDefault(); e.stopPropagation();
           const parentItem = this.closest('.cyber-mobile-nav__item'); if (!parentItem) return;
           const submenu = parentItem.querySelector('.cyber-mobile-nav__submenu'); if (!submenu) return;
           const isActive = submenu.classList.toggle('is-active');
           this.classList.toggle('is-active');
           this.setAttribute('aria-expanded', isActive);
           this.textContent = isActive ? '-' : '+';
         });
       });
    },

    setupSlideLinks: function() {
      if (!window.swiper) {
          console.error('Swiper未初期化: スライドリンク設定不可');
          return;
      }
      if (this.smoothScrollLinks.length === 0) {
          console.log('スライド移動対象リンクが見つかりません。');
          return;
      }

      this.smoothScrollLinks.forEach(link => {
        // 既存のリスナーを削除し、新しいリスナーを登録（重複防止）
        const newLink = link.cloneNode(true); // クローンを作成してイベントリスナーをクリア
        link.parentNode.replaceChild(newLink, link);
        newLink.addEventListener('click', this.handleSlideLinkClick.bind(this));
      });
       console.log(`${this.smoothScrollLinks.length}個のスライド移動リンク設定完了 (更新)`);
    },

    handleSlideLinkClick: function(e) {
        const link = e.currentTarget;
        const hrefAttribute = link.getAttribute('href');

        if (!hrefAttribute) return; // href属性がない場合は無視

        let targetId = '';

        // href属性の値からターゲットID (#...) を抽出する
        try {
            // URLオブジェクトが使えるか試す (https://...#id の形式に対応)
            const url = new URL(hrefAttribute, window.location.origin); // ベースURLを指定
            if (url.hash) { // #以降が存在すれば
                targetId = url.hash.substring(1); // '#'を除去
            }
        } catch (error) {
            // URLオブジェクトが使えない場合 (例: href="#id" の形式)
            if (hrefAttribute.startsWith('#')) {
                targetId = hrefAttribute.substring(1);
            } else {
                console.warn(`無効なhref属性またはターゲットIDの抽出失敗: ${hrefAttribute}`);
                return; // IDが抽出できなければ処理終了
            }
        }

        if (!targetId) {
            console.warn(`ターゲットIDが空です: ${hrefAttribute}`);
            return;
        }

        console.log(`リンククリック: href="${hrefAttribute}", 抽出ID="${targetId}"`);

        const targetSlideIndex = this.findSlideByTargetId(targetId);

        console.log(`ターゲットID "${targetId}" のスライド検索結果: index=${targetSlideIndex}`);

        if (targetSlideIndex !== -1) {
            e.preventDefault();
            this.closeMobileMenu();

            console.log(`Swiper スライド移動実行: index ${targetSlideIndex} へ`);
            try {
                if (window.swiper && typeof window.swiper.slideTo === 'function') {
                    window.swiper.slideTo(targetSlideIndex, 800); // 800msでアニメーション
                } else {
                    console.error('window.swiper または slideTo メソッドが存在しません。');
                }
            } catch (slideError) {
                console.error(`Swiper slideTo(${targetSlideIndex}) でエラー:`, slideError);
            }
        } else {
            console.warn(`移動先のSwiperスライドが見つかりません: ID="${targetId}"`);
            // IDが見つからない場合でも、ページ遷移は防ぐことが多い
            e.preventDefault();
        }
    },

    findSlideByTargetId: function(targetId) { /* ... 前回と同じ ... */
        if (!window.swiper || !window.swiper.slides) {
            console.warn('findSlideByTargetId: Swiper または slides が未定義');
            return -1;
        }
        const slides = window.swiper.slides;
        for (let i = 0; i < slides.length; i++) {
            const slide = slides[i];
            // スライド自体のID、またはスライド内の要素ID、またはdata-hashをチェック
            if (slide.id === targetId || slide.querySelector(`#${targetId}`) || slide.dataset.hash === targetId) {
                return i;
            }
        }
        console.log(`findSlideByTargetId: ID "${targetId}" を持つスライドが見つかりませんでした。`);
        return -1;
    }
  }; // cyberNav オブジェクト定義終了

  // 初期化実行
  cyberNav.init();

}); // DOMContentLoaded 終了