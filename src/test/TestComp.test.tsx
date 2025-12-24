import {render} from '@testing-library/react';
// import {StaticRouter} from 'react-router-dom/server'
import {describe, expect, it} from 'vitest';
import Pet from '../components/TestComp';

describe('Pet', () => {
  it('should renders correctly with no name', async () => {
    const pet = render(<Pet />);
    const thumbnail = await pet.findByTestId('thumbnail') as HTMLImageElement;
  
  
    expect(thumbnail.src).toContain('0.jpg');
    pet.unmount();
  });
})