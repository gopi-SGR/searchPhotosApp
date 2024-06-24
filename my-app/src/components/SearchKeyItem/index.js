
import "./index.css"

const SearchKeyItem=(props)=>{
    const {searchDetails,onChangeSearchKey}=props 
    const {id,value,displayText}=searchDetails
    const onClickSearchKey=()=>{
        onChangeSearchKey(id,value)
    }
   
    
    return (
        <li className="search-key-item" key={id}>
            <button className={`search-key-button `} onClick={onClickSearchKey}>
                {displayText}
            </button>

        </li>
    )
}

export default SearchKeyItem