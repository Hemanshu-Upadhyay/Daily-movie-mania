import React, { Component } from 'react'
import  '../../Main/Main.css'
import {Link} from 'react-router-dom'
import StarRatings from 'react-star-ratings';
import loader from '../../Images/loader.gif'


const TrendingUrl = "https://api.themoviedb.org/3/trending/all/day?api_key=76a3351cce68be3d7eaa350f43ad5644"
const ImgUrl = "https://image.tmdb.org/t/p/w300"


export default class Trending extends Component {

    constructor(){
        super()
        this.state = {
            trending:""
        }
      }

      renderTrending=(data) => {
        if(data){
          
          return data.results.map((item) => {
            
            const  viewMovie = (e) =>{
              const New_val  ={ 'id' : item.id , 'img' : item.poster_path , 'name' :  item.original_name || item.title}

              if (localStorage.getItem("movieList") == null) {
                  localStorage.setItem("movieList" , '[]')
              }
    
              var Old_val = JSON.parse(localStorage.getItem("movieList"))

              Old_val.push(New_val)
    
              localStorage.setItem("movieList" , JSON.stringify(Old_val))

              sessionStorage.setItem("id",item.id)  
             
            }

           const  viewTv = (e) => {

            const New_val  ={ 'tvid' : item.id , 'img' : item.poster_path , 'name' :  item.original_name || item.title}

            if (localStorage.getItem("TVList") == null) {
                localStorage.setItem("TVList" , '[]')
            }
  
            var Old_val = JSON.parse(localStorage.getItem("TVList"))
            Old_val.push(New_val)
  
              localStorage.setItem("TVList" , JSON.stringify(Old_val))

              sessionStorage.setItem("tvid",item.id)
              sessionStorage.setItem("seriesName",item.title || item.original_name)
            }

            return(
              < div className="responsive" style={{backgroundColor:' rgba(12, 4, 12, 0.900)',backdropFilter:'blur(5px)',margin:"10px",width:"300px",height:"100%"}} >
                 <h2 style={{color:"teal",textAlign:"center" , fontSize:"20px"}} key={item.id}> {item.original_name}{item.title} </h2>
                 { item.media_type == "movie" &&  <Link onClick={viewMovie} to={`/details/${item.id}`}><img style={{width:"100%"}} src={`${ImgUrl}/${item.poster_path}`}></img></Link> }
                  {  item.media_type == "tv" &&  <Link onClick={viewTv} to={`/info/${item.id}`}><img style={{width:"100%"}} src={`${ImgUrl}/${item.poster_path}`}></img></Link>}
                <div style={{margin:"55px"}}>
                    <h4><span style={{color:"teal",fontSize:"15px"}}>Popularity : </span>  {item.popularity}</h4> 
                    <h4><span style={{color:"teal",fontSize:"15px"}}>Release Date : </span> {item.release_date} {item.first_air_date}</h4>
                    <h4><span style={{color:"teal",fontSize:"15px"}}>Vote Average: </span> </h4> 
                    <StarRatings
                        rating={item.vote_average}
                        starRatedColor="blue"
                        numberOfStars={10}
                        name='rating'
                        starDimension="17px"
                        starSpacing="1px"
                  />
                    <h4><span style={{color:"teal",fontSize:"15px"}}>Vote Count : </span>{item.vote_count} </h4>
                </div>
              
              </ div>
             
            )
          })
    
        }else{
          return(
            <div>
              <img src={loader} />
            </div>
          )
        }
      }
      
    render() {
        return (
          <div>
                <div className="trending" >
                        
                        <h2 style={{textAlign:"center",color:"white" , backgroundColor: "rgba(12, 4, 12, 0.900)",backdropFilter:'blur(5px)'}}>Trending today</h2>
                        <div  style={{display:"flex",flexWrap:"wrap",justifyContent:"center",alignItems:"center"}}>
                        {this.renderTrending(this.state.trending)}
                </div>
                </div>
            </div>
        )
    }

    componentDidMount(){
        fetch(TrendingUrl)
        .then((res)=>res.json())
        .then((data) => {
          this.setState({trending:data})
      })

    }
}