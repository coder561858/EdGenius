import Stats from 'stats.js';

export const createStats = () => {
  const stats = new Stats();
  stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
  document.body.appendChild(stats.dom);
  return stats;
};

export default Stats; 