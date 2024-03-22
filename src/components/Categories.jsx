import React from 'react';

const categories = [
  {
    id: 0,
    value: 'Все',
  },
  {
    id: 1,
    value: 'Мясные',
  },
  {
    id: 2,
    value: 'Вегетарианская',
  },
  {
    id: 3,
    value: 'Гриль',
  },
  {
    id: 4,
    value: 'Острые',
  },
  {
    id: 5,
    value: 'Закрытые',
  },
];

const Categories = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  return (
    <div className="categories">
      <ul>
        {categories.map((it, index) => (
          <li
            onClick={() => setActiveIndex(index)}
            className={activeIndex === index ? 'active' : ''}
          >
            {it.value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
