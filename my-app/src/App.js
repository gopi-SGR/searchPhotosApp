

import {Component} from "react"
import { FaSearch } from "react-icons/fa";
import {ThreeDots} from "react-loader-spinner"
import Popup from 'reactjs-popup';
import SearchKeyItem from "./components/SearchKeyItem"
import './App.css'


const tabSearchList=[
  {
    id:1,
    value:"mountain",
    displayText:"Mountain"
  },
  {
    id:2,
    value:"flowers",
    displayText:"Flowers"
  },
  {
    id:3,
    value:"beaches",
    displayText:"Beaches"
  },
  {
    id:4,
    value:"cities",
    displayText:"Cities"
  },
]

const apiStatusContants={
  initial:"INITIIAL",
  success:"SUCCESS",
  failure:"FAILURE",
  inProgress:"IN_PROGRESS"
}



class App extends Component{
  state={searchInput:"",favoriteList:[],activeKeyId:tabSearchList[0].id,activeSearchValue:tabSearchList[0].value,apiStatus:apiStatusContants.initial}

  componentDidMount(){
    this.getSearchPhotos()
  }

  getSearchPhotos=async()=>{
    this.setState({apiStatus:apiStatusContants.inProgress})
    const {activeSearchValue}=this.state

    const api=`https://api.unsplash.com/search/photos?query=${activeSearchValue}&client_id=UerhzwHDhMLOc56Twm9xMtN9kgDIXIgquoJbqbbOnvM`
    const options={
      method:"GET"
    }

    const response=await fetch(api,options)
    console.log(response)
    const data=await response.json()
    console.log(data)
    if (response.ok){
    const updatedData= data.results.map(eachItem=>({
      id:eachItem.id,
      likes:eachItem.likes,
      description:eachItem.alt_description,
      url:eachItem.urls.full
    }))
    if (updatedData.length>=1){
      this.setState({favoriteList:updatedData,apiStatus:apiStatusContants.success})
    }else if (updatedData.length===0) {
      this.setState({apiStatus:apiStatusContants.failure})
    }
   
  }
  }
 
      renderfavoritePhotos=(eachListItem)=>{
        const {id,description,likes,url}=eachListItem 
        return (
          <li className="favorite-item" key={id}>
            <Popup
           trigger={ 
           <button className="button">

              <img src={url} alt="favitore" className="image-url" />
           </button>
            }
            position={"center center"}
            on={['hover', 'focus']}
            
            >
              <div className="popup-container">
                  <p className="description">{description}</p>
                  <p className="likes-count">Likes: {likes}</p>
              </div>
             </Popup>
          </li>
        )

        
      }

      onChangeSearchKey=(id,value)=>{
        this.setState({activeSearchValue:value,activeKeyId:id},this.getSearchPhotos)
      }
       
      onChangeSearchInputKey=(event)=>{
        this.setState({searchInput:event.target.value,activeSearchValue:event.target.value})
      }

      onEnterSearchKey=(event)=>{
        if (event.key==="Enter"){
          this.getSearchPhotos()
        }
      }
      renderfavoritSearchPhotos=()=>{
        const {favoriteList}=this.state
        

        return (
         
         
        <ul className="favorite-list-items">
        {
            favoriteList.map(eachListItem=> this.renderfavoritePhotos(eachListItem))
          }
        </ul>
    
        )
      }

      loadingView=()=>(
        <div className="loading-container">
          <ThreeDots color="white" height="100" width="100" />
        </div>
      )

      failureView=()=>(
        <div className="not-found-container">
          <h1 className="not-found-heading">NOT FOUND</h1>
        </div>
      )


      renderSearchPhotos=()=>{
        const {apiStatus}=this.state 
        switch(apiStatus){
          case apiStatusContants.success:
            return this.renderfavoritSearchPhotos()
          case apiStatusContants.failure:
            return this.failureView() 
          case apiStatusContants.inProgress:
            return this.loadingView()  
          default:
            return null  
        }
      }

      onClickSearchKey=()=>{
        this.getSearchPhotos()
      }


  render(){
    const {activeKeyId,searchInput}=this.state
    return (
      <div className="app-container">
        <div className="header-container">
        <nav className="nav-container">
          <h1 className="heading">Search Photos</h1>
        </nav>
        <div className="search-photos-container">
        <div className="search-container">
          <input className="search-input-element" type="search" value={searchInput} placeholder="Search"  onChange={this.onChangeSearchInputKey} onKeyDown={this.onEnterSearchKey}  />
          <div className="search-icon-container">
            <button className="search-button" type="button" onClick={this.onClickSearchKey} > 

              <FaSearch size={15} color="#ffffff" />
            </button>
            
          </div>
        </div>
        <ul className="search-key-items">
          {
            tabSearchList.map(eachSearchKey=>(<SearchKeyItem searchDetails={eachSearchKey} key={eachSearchKey.id} onChangeSearchKey={this.onChangeSearchKey} isCheck={activeKeyId===eachSearchKey.id} />))
          }
        </ul>
          {
            this.renderSearchPhotos()
  }
        </div>
        </div>
      </div>
    )
  }

}

export default App;
