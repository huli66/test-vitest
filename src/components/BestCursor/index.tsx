'use client';

import useCanvasCursor from './useCanvasCursor';

const BestCursor = () => {
  useCanvasCursor();

  return <canvas style={{position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none'}} className='pointer-events-none fixed inset-0' id='canvas' />;
};
export default BestCursor;