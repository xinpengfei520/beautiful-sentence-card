export const defaultTemplates = [
  {
    id: 1,
    name: '简约白',
    category: 'simple',
    style: {
      backgroundColor: '#ffffff',
      color: '#000000',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }
  },
  {
    id: 2,
    name: '暗夜模式',
    category: 'dark',
    style: {
      backgroundColor: '#1a1a1a',
      color: '#ffffff',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(255,255,255,0.1)'
    }
  },
  {
    id: 3,
    name: '渐变粉',
    category: 'gradient',
    style: {
      background: 'linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)',
      color: '#ffffff',
      padding: '20px',
      borderRadius: '8px',
      textShadow: '0 1px 2px rgba(0,0,0,0.2)'
    }
  },
  {
    id: 4,
    name: '复古风',
    category: 'vintage',
    style: {
      backgroundColor: '#f4e4bc',
      color: '#5c4b3c',
      padding: '20px',
      border: '2px solid #8b7355',
      fontFamily: 'serif'
    }
  }
];

export const templateCategories = [
  { id: 'simple', name: '简约' },
  { id: 'dark', name: '深色' },
  { id: 'gradient', name: '渐变' },
  { id: 'vintage', name: '复古' }
]; 