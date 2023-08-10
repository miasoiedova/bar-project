const FilterButton = ({ filterName, onClick, active }) => {
    return (
      <div>
        <ul>
          <button onClick={() => onClick(filterName)} className={`filterButton ${active ? 'active' : ''}`}>
            {filterName}
          </button>
        </ul>
      </div>
    );
  };

export default FilterButton;