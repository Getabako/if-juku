import { useState, useCallback, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [triggerElement, setTriggerElement] = useState(null);
  const modalRef = useRef(null);
  const cleanupRef = useRef(null);

  const positionModal = useCallback(() => {
    if (!triggerElement || !modalRef.current || !isOpen) return;

    const trigger = triggerElement.getBoundingClientRect();
    const modal = modalRef.current;
    const vv = window.visualViewport;
    const vw = vv?.width ?? window.innerWidth;
    const vh = vv?.height ?? window.innerHeight;
    const ox = vv?.offsetLeft ?? 0;
    const oy = vv?.offsetTop ?? 0;
    const gap = 16;

    // モーダルのサイズを取得
    modal.style.visibility = 'hidden';
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';

    requestAnimationFrame(() => {
      const w = modal.offsetWidth;
      const h = modal.offsetHeight;

      // ボタンの位置を基準に配置を計算
      let left = trigger.left + (trigger.width / 2) - (w / 2);
      let top = trigger.bottom + gap;
      
      // 下にスペースがない場合は上に表示
      if (top + h > vh) {
        top = trigger.top - h - gap;
        // 上にもスペースがない場合は中央に
        if (top < gap) {
          top = (vh - h) / 2;
        }
      }
      
      // 左右の調整
      left = Math.min(vw - w - gap, Math.max(gap, left));
      top = Math.min(vh - h - gap, Math.max(gap, top));

      modal.style.left = `${left + ox}px`;
      modal.style.top = `${top + oy}px`;
      modal.style.visibility = 'visible';
    });
  }, [triggerElement, isOpen]);

  const openModal = useCallback((event) => {
    const trigger = event?.currentTarget || event?.target;
    if (trigger) {
      setTriggerElement(trigger);
    }
    setIsOpen(true);

    // Swiperを無効化
    if (window.swiper && window.swiper.allowTouchMove !== undefined) {
      window.swiper.allowTouchMove = false;
    }
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setTriggerElement(null);

    // Swiperを再有効化
    if (window.swiper && window.swiper.allowTouchMove !== undefined) {
      window.swiper.allowTouchMove = true;
    }

    // クリーンアップ
    if (cleanupRef.current) {
      cleanupRef.current();
      cleanupRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    // 位置調整
    positionModal();

    // リサイズ・スクロールイベントリスナー
    const handleReposition = () => positionModal();
    
    window.addEventListener('resize', handleReposition);
    window.addEventListener('scroll', handleReposition, { passive: true });
    
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleReposition);
      window.visualViewport.addEventListener('scroll', handleReposition);
    }

    // ESCキーで閉じる
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };
    document.addEventListener('keydown', handleEscape);

    // クリーンアップ関数を保存
    cleanupRef.current = () => {
      window.removeEventListener('resize', handleReposition);
      window.removeEventListener('scroll', handleReposition);
      document.removeEventListener('keydown', handleEscape);
      
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleReposition);
        window.visualViewport.removeEventListener('scroll', handleReposition);
      }
    };

    return cleanupRef.current;
  }, [isOpen, positionModal, closeModal]);

  const Modal = useCallback(({ children, className }) => {
    if (!isOpen) return null;

    const modalRoot = document.getElementById('modal-root');
    if (!modalRoot) {
      console.error('modal-root not found, falling back to document.body');
      return ReactDOM.createPortal(
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.8)',
            pointerEvents: 'auto',
            zIndex: 10001
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeModal();
            }
          }}
        >
          <div
            ref={modalRef}
            className={className}
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'fixed',
              maxWidth: 'min(600px, 90vw)',
              maxHeight: '80vh',
              overflow: 'auto',
              visibility: 'hidden' // 初期は非表示
            }}
          >
            {children}
          </div>
        </div>,
        document.body
      );
    }

    return ReactDOM.createPortal(
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          pointerEvents: 'auto',
          zIndex: 10001
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            closeModal();
          }
        }}
      >
        <div
          ref={modalRef}
          className={className}
          onClick={(e) => e.stopPropagation()}
          style={{
            position: 'fixed',
            maxWidth: 'min(600px, 90vw)',
            maxHeight: '80vh',
            overflow: 'auto',
            visibility: 'hidden' // 初期は非表示
          }}
        >
          {children}
        </div>
      </div>,
      modalRoot
    );
  }, [isOpen, closeModal]);

  return {
    isOpen,
    openModal,
    closeModal,
    Modal
  };
};