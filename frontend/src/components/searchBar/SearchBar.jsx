import { useState } from 'react';
import './searchBar.scss'

const types = ["buy", "rent"];

function SearchBar() {
    const [query, setQuery] = useState({
        type: "buy",
        location: "",
        minPrice: 0,
        maxPrice: 0,
    })

    const swithType = (val) => {
        setQuery((prev) => ({ ...prev, type: val }));
    }
    return (
      <div className="searchBar">
            <div className="type">
                {types.map((type) => (
                    <button key={type} onClick={() => swithType(type)}
                    className={query.type === type ? "active" : ""}>{type}</button>
                ))}
        </div>
        <form>
          <input type="text" name="location" placeholder="City location" />
                <input
                    type="number"
                    min={0}
                    max={1000000}
                    name="minPrice"
                    placeholder="Min Price"
                />
                <input
                    type="number"
                    name="maxPrice"
                    min={0}
                    max={1000000}
                    placeholder="Max Price"
                />
                <button>
                    <img src="/search.png" alt="" />
                </button>
        </form>
      </div>
    );
}

export default SearchBar