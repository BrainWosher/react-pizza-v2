import React from 'react';
import './scss/app.scss';
import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock';
import pizzas from './assets/pizzas.json';

function App() {
  // const [pizzas, setPizzas] = React.useState(null);
  //
  // React.useEffect(() => {
  //   fetch(`https://659657ee6bb4ec36ca026645.mockapi.io/pizzas/`)
  //     .then(res => res.json())
  //     .then(json => {
  //       setPizzas(json);
  //     })
  //     .catch(err => {
  //       console.warn(err);
  //       alert('Ошибка при получении данных');
  //     })
  //     .finally(console.log('Данные загрузились'));
  // }, []);
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {pizzas.map((obj) => (
              <PizzaBlock key={obj.id} {...obj} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
