import {act, fireEvent, render} from '@testing-library/react';
import {describe, expect, it} from 'vitest';
import Carousel from '../components/Student';

describe('Carousel', () => {
  it('lets users click on thumbnails to make them the hero', async () => {
    const images = [
      'https://image.smoba.qq.com/Picture/HeroOriginalPainting/3015203.jpg',
      'https://image.smoba.qq.com/Picture/HeroOriginalPainting/3015202.jpg'
    ];

    const carousel = render(<Carousel images={images} />);
    const hero = (await carousel.findByTestId('hero')) as HTMLImageElement;
    expect(hero.src).toContain(images[0]);
    expect(carousel.asFragment()).toMatchSnapshot();

    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      const thumb = (await carousel.findByTestId(`thumbnail${i}`)) as HTMLImageElement;

      act(() => {
        fireEvent.click(thumb);
      })
      expect(hero.src).toContain(image);

      expect(Array.from(thumb.classList)).toContain('active');
    }
  });

  // 测试默认 images 参数，提高分支覆盖率
  it('should use default images when images prop is not provided', async () => {
    const carousel = render(<Carousel />);
    const hero = (await carousel.findByTestId('hero')) as HTMLImageElement;
    
    expect(hero.src).toContain('http://pets-images.dev-apis.com/pets/0.jpg');
    
    // 验证默认图片也被渲染为缩略图
    const thumbnail = (await carousel.findByTestId('thumbnail0')) as HTMLImageElement;
    expect(thumbnail.src).toContain('http://pets-images.dev-apis.com/pets/0.jpg');
  });
})