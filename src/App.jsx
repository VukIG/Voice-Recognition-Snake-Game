/* eslint-disable react-hooks/exhaustive-deps */
import Field from './Field';
import { useEffect, useState } from 'react';

function App() {
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
    document.addEventListener('keydown', updateDirection);

    const intervalId = setInterval(moveSnake, 150);

    return () => {
      document.removeEventListener('keydown', updateDirection);
      clearInterval(intervalId);
    };
  }, [direction, moveSnake]);

  useEffect(() => {
    renderGame();
  }, [snake, renderGame]);

  function updateDirection(event) {
    if (event.key == 'ArrowUp' && direction.x != 1)
      setDirection({ x: -1, y: 0 });
    else if (event.key == 'ArrowDown' && direction.x != -1)
      setDirection({ x: 1, y: 0 });
    else if (event.key == 'ArrowLeft' && direction.y != 1)
      setDirection({ x: 0, y: -1 });
    else if (event.key == 'ArrowRight' && direction.y != -1)
      setDirection({ x: 0, y: 1 });
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
      <div className="text-4xl">{score}</div>
    </div>
  );
}

export default App;
