export const theme = {
  colors: {
    primary: {
      main: '#00ffff', // サイバーブルー
      light: '#66ffff',
      dark: '#00cccc',
    },
    secondary: {
      main: '#00ff00', // ネオングリーン
      light: '#66ff66',
      dark: '#00cc00',
    },
    background: {
      primary: '#0a0a0a', // ダークトーン
      secondary: '#1a1a1a',
      tertiary: '#2a2a2a',
    },
    text: {
      primary: '#ffffff',
      secondary: '#cccccc',
      accent: '#00ffff',
    },
    glow: {
      blue: '0 0 20px #00ffff',
      green: '0 0 20px #00ff00',
      white: '0 0 20px #ffffff',
    }
  },
  fonts: {
    primary: "'Noto Sans Japanese', sans-serif",
    secondary: "'Roboto', sans-serif",
  },
  breakpoints: {
    mobile: '768px',
    pc: '769px',
  },
  zIndex: {
    background: -1,
    content: 1,
    navigation: 100,
    modal: 1000,
  },
  animations: {
    duration: {
      fast: '0.2s',
      normal: '0.3s',
      slow: '0.6s',
    },
    easing: {
      inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
    }
  }
};