import React, { createContext, useContext, useReducer } from 'react';

// 创建Context
const StyleContext = createContext();

// 初始状态
const initialState = {
  background: {
    type: 'color',
    color: '#ffffff',
    gradient: {
      type: 'linear',
      direction: '180deg',
      colors: ['#ffffff', '#000000']
    },
    image: null
  },
  font: {
    family: 'system-ui',
    size: 16,
    weight: 'normal',
    letterSpacing: 0,
    lineHeight: 1.5
  },
  layout: {
    padding: {
      top: 20,
      right: 20,
      bottom: 20,
      left: 20
    },
    align: 'left',
    width: 400,
    height: 300
  },
  effects: {
    shadow: {
      blur: 0,
      spread: 0,
      x: 0,
      y: 0,
      color: 'rgba(0,0,0,0.1)'
    },
    border: {
      width: 0,
      style: 'solid',
      color: '#000000'
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