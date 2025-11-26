import React from 'react';
import { useSelector } from 'react-redux';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { pizzaSelector } from '../redux/pizza/selectors';
import { useAppDispatch } from '../redux/store';
import { setCategoryId, setCurrentPage } from '../redux/filter/slice';
import { filterSelector } from '../redux/filter/selectors';
import { fetchPizzas } from '../redux/pizza/asyncActions';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const isSearch = React.useRef(false);

  const { items, status } = useSelector(pizzaSelector);
  const { categoryId, sort, currentPage, searchValue } = useSelector(filterSelector);

  const sortType = sort.sortProperty;

  const onChangeCategory = React.useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, []);

  const onChangePageNumber = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const getPizzas = async () => {
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const order = sortType.includes('-') ? 'asc' : 'desc';
    const sortBy = sortType.replace('-', '');
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(
      fetchPizzas({
        category,
        order,
        sortBy,
        search,
        currentPage: String(currentPage),
      }),
    );
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);

    getPizzas();
    isSearch.current = false;
  }, [categoryId, sortType, searchValue, currentPage]);

  const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);

  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort value={sort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Произошла ошибка 😕</h2>
          <p>К сожалению, не удалось получить питцы. Попробуйте повторить попытку позже.</p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePageNumber} />
    </div>
  );
};

export default Home;
