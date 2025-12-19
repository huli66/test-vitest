import {render} from '@testing-library/react';
import {describe, expect, it} from 'vitest';

import Results from '../components/Results';

describe('Results', () => {
  // 快照测试
  it('should renders correctly with no stus', () => {
    const {asFragment} = render(<Results stus={[]} />)

    expect(asFragment()).toMatchSnapshot();
  })

  it('should renders correctly with stus', () => {
    const {asFragment} = render(<Results stus={[{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Mike' }]} />)

    expect(asFragment()).toMatchSnapshot();
  })
})
