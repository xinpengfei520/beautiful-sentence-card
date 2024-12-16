import React, { createContext, useContext, useReducer } from 'react';

// 预设的配色方案
const presetColors = {
  elegant: {
    background: '#F5F5F5',
    text: '#2C3E50',
    border: '#E0E0E0'
  },
  warm: {
    background: '#FFF5E6',
    text: '#8B4513',
    border: '#FFE4B5'
  },
  cool: {
    background: '#F0F8FF',
    text: '#4A708B',
    border: '#B0E0E6'
  },
  dark: {
    background: '#2C3E50',
    text: '#ECF0F1',
    border: '#34495E'
  }
};

// 预设字体
const presetFonts = [
  { name: '思源宋体', value: '"Noto Serif SC", serif' },
  { name: '思源黑体', value: '"Noto Sans SC", sans-serif' },
  { name: '楷体', value: 'KaiTi, serif' },
  { name: '行楷', value: 'XingKai SC, cursive' }
];

// 创建Context
const StyleContext = createContext();

// 初始状态
const initialState = {
  background: {
    type: 'color',
    color: presetColors.elegant.background,
    gradient: {
      type: 'linear',
      direction: '45deg',
      colors: ['#ffffff', '#f0f0f0']
    },
    image: ''
  },
  font: {
    family: presetFonts[0].value,
    size: 24,
    weight: 400,
    letterSpacing: 1,
    lineHeight: 1.5,
    color: presetColors.elegant.text
  },
  layout: {
    width: 800,
    height: 400,
    padding: { top: 40, right: 60, bottom: 40, left: 60 },
    align: 'center'
  },
  effects: {
    shadow: {
      x: 0,
      y: 2,
      blur: 4,
      spread: 0,
      color: 'rgba(0,0,0,0.1)'
    },
    border: {
      width: 1,
      style: 'solid',
      color: presetColors.elegant.border
    },
    opacity: 100
  }
};

// Action Types
const ActionTypes = {
  UPDATE_BACKGROUND: 'UPDATE_BACKGROUND',
  UPDATE_FONT: 'UPDATE_FONT',
  UPDATE_LAYOUT: 'UPDATE_LAYOUT',
  UPDATE_EFFECTS: 'UPDATE_EFFECTS',
  APPLY_TEMPLATE: 'APPLY_TEMPLATE'
};

// Reducer
function styleReducer(state, action) {
  switch (action.type) {
    case ActionTypes.UPDATE_BACKGROUND:
      return {
        ...state,
        background: {
          ...state.background,
          ...action.payload
        }
      };
    case ActionTypes.UPDATE_FONT:
      return {
        ...state,
        font: {
          ...state.font,
          ...action.payload
        }
      };
    case ActionTypes.UPDATE_LAYOUT:
      return {
        ...state,
        layout: {
          ...state.layout,
          ...action.payload
        }
      };
    case ActionTypes.UPDATE_EFFECTS:
      return {
        ...state,
        effects: {
          ...state.effects,
          ...action.payload
        }
      };
    case ActionTypes.APPLY_TEMPLATE:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}

// Provider组件
export function StyleProvider({ children }) {
  const [state, dispatch] = useReducer(styleReducer, initialState);

  // 更新样式的方法
  const updateStyle = {
    updateBackground: (payload) => {
      dispatch({ type: ActionTypes.UPDATE_BACKGROUND, payload });
    },
    updateFont: (payload) => {
      dispatch({ type: ActionTypes.UPDATE_FONT, payload });
    },
    updateLayout: (payload) => {
      dispatch({ type: ActionTypes.UPDATE_LAYOUT, payload });
    },
    updateEffects: (payload) => {
      dispatch({ type: ActionTypes.UPDATE_EFFECTS, payload });
    },
    applyTemplate: (payload) => {
      dispatch({ type: ActionTypes.APPLY_TEMPLATE, payload });
    }
  };

  return (
    <StyleContext.Provider value={{ state, ...updateStyle }}>
      {children}
    </StyleContext.Provider>
  );
}

// Hook
export function useStyle() {
  const context = useContext(StyleContext);
  if (!context) {
    throw new Error('useStyle must be used within a StyleProvider');
  }
  return context;
} 