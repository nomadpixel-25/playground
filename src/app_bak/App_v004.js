import { useState } from 'react';

const products = [
  { title: 'Cabbage', id: 1, isFruit: false },
  { title: 'Garlic', id: 2, isFruit: false },
  { title: 'Apple', id: 3, isFruit: true },
  { title: 'Banana', id: 4, isFruit: true },
  { title: 'Cherry', id: 5, isFruit: true },
];

const listItems = products.map(product =>
  <li key={product.id}
  style={{ color: product.isFruit ? 'red': 'black'}}
  >
    {product.title}
  </li>
);

function ShoppingList() {
  const title = 'Shopping List';
    return (
      <div> 
      <h1>{title}</h1>
      <ul>{listItems}</ul>
      </div>
    );    

};

function MyButton() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <button onClick={handleClick}>
      Clicked {count} times
    </button>
  );
}

function App() {
  return (
    <div>
      <ShoppingList />
      <MyButton />
    </div>
  );
}


export {ShoppingList, MyButton}; 
export default App;

