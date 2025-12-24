import { useState } from 'react'
import './App.css'
import Results from './components/Results'
import Carousel from './components/Student'
import BubbleCursor from './components/Cursor'
import DotParticleCanvas from './components/CursorClick'
import BestCursor from './components/BestCursor'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      {/* <BubbleCursor />
      <DotParticleCanvas /> */}
      <h1>Hello World</h1>
      <BestCursor />
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <Results stus={[{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Mike' }]} />
      <Carousel images={['https://image.smoba.qq.com/Picture/HeroOriginalPainting/3015203.jpg', 'https://image.smoba.qq.com/Picture/HeroOriginalPainting/3015202.jpg']} />
    </div>
  )
}

export default App
