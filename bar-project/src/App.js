import { useEffect } from 'react';
import React, { useState } from 'react';
import './styles/App.css';
import DrinkCard from './components/drinkCard';
import FilterButton from './components/filterButton';
import { ingridients, categories, alcoholVar } from './components/filterArrays';
import ClearFilter from './components/clearFilter';
import Header from './components/header';
import Pagination from './components/pagination';
import Footer from './components/footer';


function App() {

  const [endPoint, setEndPoint] = useState('');
  const [container, setContainer] = useState([]);
  const [selectedIngridient, setSelectedIngridient] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedIfAlcoholic, setSelectedIfAlcoholic] = useState(null);
  const [activeButtons, setActiveButtons] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [cocktailPerPage, setCocktailPerPage] = useState(9);

  const [selectedFilter, setSelectedFilter] = useState({
    selectedIngridient: null,
    selectedCategory: null,
    selectedIfAlcoholic: null
  });

  useEffect(() => {
    fetchFunction()
  }, [endPoint, selectedFilter])

  const filteredDrinks = (data) => {
    return (data.drinks.filter((drink) => {
      return (
        (!selectedFilter.selectedIngridient || checkIngExist(drink, selectedFilter.selectedIngridient)) &&
        (!selectedFilter.selectedCategory || checkCategoryExist(drink, selectedFilter.selectedCategory)) &&
        (!selectedFilter.selectedIfAlcoholic || checkAlcExist(drink, selectedFilter.selectedIfAlcoholic))
      )
    })
    )
  }

  const fetchFunction = () => {

    fetch(`https://the-cocktail-db.p.rapidapi.com/search.php?s=${endPoint}`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '879a4ee2fdmshbc8a973489ccb99p1dcfd9jsn044331766b8a',
        'X-RapidAPI-Host': 'the-cocktail-db.p.rapidapi.com'
      }
    })
      .then(response => {
        return response.json();
      })
      .then((data) => {
        setContainer(filteredDrinks(data))
      })
      .catch(err => {
        console.error(err);
      })
  }

  const checkIngExist = (drink, ingridient) => {
    return (
      drink.strIngredient1 === ingridient ||
      drink.strIngredient2 === ingridient ||
      drink.strIngredient3 === ingridient
    );
  };

  const checkCategoryExist = (drink, category) => {
    return (
      drink.strCategory === category
    )
  }

  const checkAlcExist = (drink, alcoholic) => {
    return (
      drink.strAlcoholic === alcoholic
    )
  }

  const submitHandle = e => {
    e.preventDefault();
    fetchFunction();
  }

  const onChangeHandle = (e) => {
    setEndPoint(e.target.value)
  }

  const lastCocktailIndex = currentPage * cocktailPerPage;
  const firstCocktailIndex = lastCocktailIndex - cocktailPerPage;
  const currentCocktails = container.slice(firstCocktailIndex, lastCocktailIndex);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const onFilterClick = (filterType, filterValue) => {
    const isFilterSelected = selectedFilter[filterType] === filterValue;

    setSelectedFilter((prevFilter) => ({
      ...prevFilter,
      [filterType]: isFilterSelected ? null : filterValue
    }));
    setActiveButtons((prevButtons) => ({
      ...prevButtons,
      [filterValue]: !isFilterSelected
    }));
  };

  const clearFilter = () => {
    setSelectedFilter({
      selectedIngridient: null,
      selectedCategory: null,
      selectedIfAlcoholic: null,
    })
    setActiveButtons(
      { activeButtons: null }
    )
  }

  let drinkCards;
  if (container.length === 0) {
    drinkCards = <p className='error'>There are no cocktails as per your request</p>
  } else {
    const rows = Math.ceil(currentCocktails.length / 3);
    const drinkRows = Array.from({length: rows}, (_, rowIndex) => {
      const start = rowIndex * 3;
      const end = start + 3;
      return currentCocktails.slice(start, end)
    });

    drinkCards = drinkRows.map((row, index) => (
      <div className='row' id={index}>
        {row.map((drink) =>
        <DrinkCard
          drink = {drink}
          id = {drink.idDrink}
        />
        )}
      </div>
    ))
  }

  return (
    <div className="App">
      <Header />
      <main>
        <div className='filter-container'>
          <h3>All filters</h3>
          <div className='filter-container__types'>
            <p>Ingridients</p>
            {ingridients.map((ing) => {
              return (
                <FilterButton
                  key={ing}
                  filterName={ing}
                  onClick={() => onFilterClick("selectedIngridient", ing)}
                  active={activeButtons[ing]}
                />
              )
            })}
          </div>
          <div className='filter-container__types'>
          <p>Categories</p>
            {categories.map((cat) => {
              return (
                <FilterButton
                  key={cat}
                  filterName={cat}
                  onClick={() => onFilterClick("selectedCategory", cat)}
                  active={activeButtons[cat]}
                />
              )
            })}
          </div>
          <div className='filter-container__types'>
          <p>Strength</p>
            {alcoholVar.map((ifAlcohol) => {
              return (
                <FilterButton
                  key={ifAlcohol}
                  filterName={ifAlcohol}
                  onClick={() => onFilterClick("selectedIfAlcoholic", ifAlcohol)}
                  active={activeButtons[ifAlcohol]}
                />
              )
            })}
          </div>
          <ClearFilter onClick={clearFilter} />
        </div>
        <div className='main-container'>
          <div className='main-container__header'>
            <div className='nav'>
              <a href='#'>Home Page</a>
            </div>
            <h1>menu</h1>
          <div className='search'>
            <form onSubmit={submitHandle}>
              <input type='string' value={endPoint} onChange={onChangeHandle} />
              <button type='submit'>Search</button>
            </form>
          </div>
          </div>
          <div className='main-container__body'>
            {drinkCards}
          </div>
          <Pagination
            totalCocktails = {container.length}
            cocktailPerPage={cocktailPerPage}
            paginate={paginate}
          />
        </div>
      </main>
      <Footer/>
    </div>
  );
}

export default App;
