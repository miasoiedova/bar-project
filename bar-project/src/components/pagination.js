const Pagination = ({ totalCocktails, cocktailPerPage, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalCocktails / cocktailPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <nav>
            <ul>
                {pageNumbers.map((number) =>
                (
                    <li key={number} className="page-item">
                        <a onClick={() => paginate(number)} href="!#">
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Pagination;