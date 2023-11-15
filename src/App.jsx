import { useState } from 'react'

  function App() {
    const [size, setSize] = useState(32);
    const [apple, setApple] = useState({
      x:5,
      y:5,
    });
    const [snake, setSnake] = useState([]);
    function renderGame() {
      let fields = [];
      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
          let field = <div key={`${i}-${j}`} className='w-3 h-3 bg-black'></div>;
          fields.push(field);
        }
      }
      return fields;
    }
  
    return (
        <div className='w-full h-full'>
          <div className='grid grid-cols-32 gap-1'>
            {renderGame().map((field)=>{
              return field;
            })}
          </div>
        </div>
    );
  }

export default App
