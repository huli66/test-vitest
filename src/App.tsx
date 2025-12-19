import { useState } from 'react'
import './App.css'
import Results from './components/Results'
import Carousel from './components/Student'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h1>Hello World</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <Results stus={[{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Mike' }]} />
      <Carousel images={['https://image.smoba.qq.com/Picture/HeroOriginalPainting/3015203.jpg', 'https://image.smoba.qq.com/Picture/HeroOriginalPainting/3015202.jpg']} />
    </div>
  )
}

export default App
