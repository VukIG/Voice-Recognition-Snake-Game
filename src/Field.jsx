/* eslint-disable react/prop-types */
function Field({ apple, snakePart, snakeHead }) {
  return (
    <div
      className={`col-span-1 row-span-1 w-full h-full flex justify-center items-center ${
        apple
          ? 'bg-red-800'
          : snakePart
            ? 'bg-green-800'
            : snakeHead
              ? 'bg-white'
              : 'bg-black'
      }`}
    ></div>
  );
}

export default Field;
