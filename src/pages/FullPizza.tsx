import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface PizzaState {
  imageUrl: string;
  title: string;
  price: number;
}

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = React.useState<PizzaState>();
  const { id } = useParams();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          `https://659657ee6bb4ec36ca026645.mockapi.io/pizzas/${id}`,
        );
        setPizza(data);
      } catch (error) {
        alert('Ошибка при получении пиццы!');
      }
    }
    fetchPizza();
  }, []);

  if (!pizza) {
    return <>Загрузка...</>;
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} alt={pizza.title} />
      <h2>{pizza.title}</h2>

      <h4>{pizza.price} p.</h4>
    </div>
  );
};

export default FullPizza;
