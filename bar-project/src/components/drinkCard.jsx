import { Link } from "react-router-dom";

const DrinkCard = ({drink}) => {
    return (
        <div className="drinkCard">
          <img src={drink.strDrinkThumb} alt={drink.strDrink}></img>
          <div className="drinkCard-content">
            <div className="drinkCard-content__text">
              <p key={drink.idDrink} className="name">{drink.strDrink}</p>
              <p className="alco">{drink.strAlcoholic}</p>
            </div>
            <a href="#" className="link">More</a>
          </div>
        </div>
      )
}

export default DrinkCard;