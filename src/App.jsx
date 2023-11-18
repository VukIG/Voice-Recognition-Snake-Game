/* eslint-disable react-hooks/exhaustive-deps */
import Field from './Field';
import { useEffect, useState } from 'react';
import * as speech from '@tensorflow-models/speech-commands';
import '@tensorflow/tfjs';
import * as tf from '@tensorflow/tfjs';

function App() {
  tf.setBackend('webgl');

  function argMax(arr){
    return arr.map((x, i) => [x, i]).reduce((r, a) => (a[0] > r[0] ? a : r))[1];
  } 

  const [model, setModel] = useState(null);
  const [action, setAction] = useState(null);
  const [labels, setLabels] = useState(null);

  const loadModel = async () => {
    const recognizer = await speech.create('BROWSER_FFT');
    await recognizer.ensureModelLoaded();
    console.log(recognizer.wordLabels());
    setModel(recognizer);
    setLabels(recognizer.wordLabels());
  };

  useEffect(() => {
    loadModel();
  }, []);

  const recordSpeech = async () => {
    model.listen(
      result => {
        console.log(result.scores);
        setAction(labels[argMax(Object.values(result.scores))]);
        updateDirection(labels[argMax(Object.values(result.scores))]);
      },
      { includeSpectogram: true, probabilityThreshold: 0.9 },
    );
  };

  const [snake, setSnake] = useState([
    {
      x: 7,
      y: 7,
    },
  ]);
  const [score, setScore] = useState(0);
  let size = 10;
  const [apple, setApple] = useState({
    x: 5,
    y: 5,
  });
  const [direction, setDirection] = useState({
    x: 1,
    y: 0,
  });

  useEffect(() => {
    const intervalId = setInterval(moveSnake, 500);
    return () => {
      clearInterval(intervalId);
    };
  }, [direction, moveSnake]);

  useEffect(() => {
    renderGame();
  }, [snake, renderGame]);

  function updateDirection(event) {
    if (event== 'up' && direction.x != 1)
      setDirection({ x: -1, y: 0 });
    else if (event == 'down' && direction.x != -1)
      setDirection({ x: 1, y: 0 });
    else if (event == 'left' && direction.y != 1)
      setDirection({ x: 0, y: -1 });
    else if (event == 'right' && direction.y != -1)
      setDirection({ x: 0, y: 1 });
    else if (event == 'stop'){
      setDirection({x :0, y:0});
      gameOver();
      model.stopListening();
    }
  }

  function isGameOver() {
    let crash = snake
      .slice(1)
      .some((ele) => ele.x == snake[0].x && ele.y == snake[0].y);
    return (
      snake[0].x >= size ||
      snake[0].x < 0 ||
      snake[0].y >= size ||
      snake[0].y < 0 ||
      crash
    );
  }

  function gameOver() {
    setSnake([
      {
        x: 7,
        y: 7,
      },
    ]);
    setApple({
      x: 5,
      y: 5,
    });
    setScore(0);
  }

  function respawnApple() {
    let x = Math.floor(Math.random() * 10);
    let y = Math.floor(Math.random() * 10);

    let onSnake = snake.some((ele) => ele.x === x && ele.y === y);

    while (onSnake) {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
      onSnake = snake.some((ele) => ele.x === x && ele.y === y);
    }

    setApple({
      x: x,
      y: y,
    });
  }

  function moveSnake() {
    if (isGameOver()) {
      gameOver();
      return;
    }
    let newSnake = [...snake];
    newSnake.unshift({
      x: newSnake[0].x + direction.x,
      y: newSnake[0].y + direction.y,
    });

    if (!(newSnake[0].x === apple.x && newSnake[0].y === apple.y)) {
      newSnake.pop();
    } else {
      setScore((prevScore) => prevScore + 1);
      respawnApple();
    }

    setSnake(newSnake);
  }

  function renderGame() {
    let fields = [];
    for (let i = 0; i < size; ++i) {
      for (let j = 0; j < size; ++j) {
        let field = [];
        let added = false;
        let beheadedSnake = snake.slice(1);
        if (snake[0].x === i && snake[0].y === j) {
          added = true;
          field.push(false, false, true);
        }
        for (let block of beheadedSnake) {
          if (block.x === i && block.y === j) {
            added = true;
            field.push(false, true, false);
          }
        }
        if (!added) {
          if (apple.x === i && apple.y === j) {
            field.push(true, false, false);
          } else {
            field.push(false, false, false);
          }
        }
        fields.push(field);
      }
    }
    return fields;
  }

  return (
    <div className="h-screen w-screen flex flex-col gap-10 items-center justify-center bg-gray-200">
      <div className="bg-white grid grid-cols-10 grid-rows-10 gap-0 aspect-square h-1/2">
        {renderGame().map((field, index) => (
          <Field
            key={index}
            className="col-span-1 row-span-1 bg-black"
            apple={field[0]}
            snakePart={field[1]}
            snakeHead={field[2]}
          />
        ))}
      </div>
      <div className="text-4xl my-[-20px]">{score}</div>
      <div className=' flex flex-col gap-3'>
        <button className=' text-xl p-3 rounded bg-green-700 hover:bg-green-900 transition text-white' onClick={recordSpeech}>Press to speak</button>
        <p className="text-small">Note * You can stop the recording by using the voice command: 'stop'</p>
        <h1 className=' text-xl p-3'> Direction :{action}</h1>
      </div>
    </div>
  );
}

export default App;
