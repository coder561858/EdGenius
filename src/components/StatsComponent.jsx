import React, { useEffect } from 'react';
import { createStats } from '../utils/StatsUtil';

const StatsComponent = () => {
  useEffect(() => {
    // Initialize stats
    const stats = createStats();
    
    // Position the stats panel in the top-right corner
    stats.dom.style.position = 'absolute';
    stats.dom.style.top = '0px';
    stats.dom.style.right = '0px';
    stats.dom.style.left = 'auto';
    
    // Animation loop
    let animationFrameId;
    const animate = () => {
      stats.begin();
      // Your rendering/animation logic would go here
      stats.end();
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      if (stats.dom && stats.dom.parentNode) {
        stats.dom.parentNode.removeChild(stats.dom);
      }
    };
  }, []);
  
  // This component doesn't render anything itself
  return null;
};

export default StatsComponent; 