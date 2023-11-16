/* eslint-disable react/prop-types */
function Field({ apple, snakeHead }) {
  return (
    <div
      className={`col-span-1 row-span-1 w-full h-full flex justify-center items-center ${
        apple ? 'bg-red-800' : snakeHead ? 'bg-green-800' : 'bg-black'
      }`}
    ></div>
  )
}

export default Field
