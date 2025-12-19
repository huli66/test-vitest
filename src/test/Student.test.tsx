import {act, fireEvent, render} from '@testing-library/react';
import {expect, it} from 'vitest';
import Carousel from '../components/Student';

it('lets users click on thumbnails to make them the hero', async () => {
  const images = [
    'https://image.smoba.qq.com/Picture/HeroOriginalPainting/3015203.jpg',
    'https://image.smoba.qq.com/Picture/HeroOriginalPainting/3015202.jpg'
  ];

  const carousel = render(<Carousel images={images} />);
  const hero = (await carousel.findByTestId('hero')) as HTMLImageElement;
  expect(hero.src).toContain(images[0]);

  for (let i = 0; i < images.length; i++) {
    const image = images[i];
    const thumb = (await carousel.findByTestId(`thumbnail${i}`)) as HTMLImageElement;

    act(() => {
      fireEvent.click(thumb);
    })
    expect(hero.src).toContain(image);

    expect(Array.from(thumb.classList)).toContain('active');
  }
})