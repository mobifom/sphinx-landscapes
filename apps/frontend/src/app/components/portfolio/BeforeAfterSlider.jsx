// apps/frontend/src/app/components/portfolio/BeforeAfterSlider.jsx
import React, { useState, useRef, useEffect } from 'react';

export const BeforeAfterSlider = ({
  beforeImage,
  afterImage,
  beforeAlt = 'Before',
  afterAlt = 'After',
  sliderPosition = 50,
  height = 'auto',
}) => {
  const [sliderPos, setSliderPos] = useState(sliderPosition);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef(null);

  // Handle mouse down on slider
  const handleSliderMouseDown = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  // Handle mouse move
  const handleMouseMove = (e) => {
    if (!dragging || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const containerWidth = containerRect.width;
    const mouseX = e.clientX - containerRect.left;

    // Calculate position as percentage
    let newPos = (mouseX / containerWidth) * 100;

    // Constrain to valid range
    newPos = Math.max(0, Math.min(100, newPos));

    setSliderPos(newPos);
  };

  // Handle mouse up - stop dragging
  const handleMouseUp = () => {
    setDragging(false);
  };

  // Handle touch start on slider
  const handleSliderTouchStart = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  // Handle touch move
  const handleTouchMove = (e) => {
    if (!dragging || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const containerWidth = containerRect.width;
    const touchX = e.touches[0].clientX - containerRect.left;

    // Calculate position as percentage
    let newPos = (touchX / containerWidth) * 100;

    // Constrain to valid range
    newPos = Math.max(0, Math.min(100, newPos));

    setSliderPos(newPos);
  };

  // Add and remove event listeners
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setDragging(false);
    };

    document.addEventListener('mouseup', handleGlobalMouseUp);
    document.addEventListener('touchend', handleGlobalMouseUp);

    return () => {
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.removeEventListener('touchend', handleGlobalMouseUp);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden rounded-lg"
      style={{ height }}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseUp={handleMouseUp}
    >
      {/* After Image (Full Width) */}
      <div className="w-full h-full">
        <img
          src={afterImage}
          alt={afterAlt}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/1200x800?text=After';
          }}
        />
      </div>

      {/* Before Image (Clipped Width) */}
      <div
        className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden"
        style={{ width: `${sliderPos}%` }}
      >
        <img
          src={beforeImage}
          alt={beforeAlt}
          className="absolute top-0 left-0 h-full object-cover"
          style={{ width: `${100 / (sliderPos / 100)}%`, minWidth: '100%' }}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/1200x800?text=Before';
          }}
        />
      </div>

      {/* Slider Control */}
      <div
        className="absolute top-0 bottom-0"
        style={{ left: `${sliderPos}%` }}
      >
        {/* Vertical Line */}
        <div className="absolute top-0 bottom-0 w-1 bg-white bg-opacity-70 transform -translate-x-1/2"></div>

        {/* Slider Handle */}
        <div
          className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-white rounded-full shadow-md border-2 border-primary flex items-center justify-center cursor-pointer"
          onMouseDown={handleSliderMouseDown}
          onTouchStart={handleSliderTouchStart}
        >
          {/* Arrow Icons */}
          <div className="flex items-center">
            <svg className="h-4 w-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <svg className="h-4 w-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm font-medium">
        Before
      </div>
      <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm font-medium">
        After
      </div>
    </div>
  );
};

export default BeforeAfterSlider;