require('dotenv').config();
const express= require('express');
const cors = require('cors');
const axois = require('axios');
const app=express();
app.use(cors());
const port=process.env.PORT;
const apikey=process.env.APIKEY;

let urlPerson=`https://api.themoviedb.org/3/person/popular?api_key=${process.env.APIKEY}`;
let movieData = require('./MovieData/data.json');
// const json = require('express/lib/response');
// const url=require(`https://api.themoviedb.org/3/movie/76341?api_key=${apikey}`);
///// endpoints 
//axois.get(url);

app.listen(port,()=>
{
    console.log('listening to port 3000');
});
 
app.get('/',movieHandler);
app.get('/person',peoplePage);
app.get('/trending',trendingPage);
app.get('/search', searchPage)
app.get('/search', letestPage)
app.use('*',notFoundHndler);
//constructor
Person.allpersons=[];

function Movie(title, poster_path, overview)
{
this.title=title;
this.poster_path=poster_path;
this.overview=overview;
}
function Movie(id,title,release_date,poster_path,overview){
    this.id=id;
    this.title = title;
    this.release_date=release_date;
    this.poster_path=poster_path;
    this.overview=overview;
    
}
function Person(id,name,profile_path)
{
    this.id=id;
    this.name=name;
    this.profile_path=profile_path;
}
function movieHandler(req,res){

    let movie = { title:movieData.title, poster_path:movieData.poster_path,overview:movieData.overview};
console.log("movie");
return res.status(200).json(movie);
}
function searchPage(req,res)
{
    axois.get(`https://api.themoviedb.org/3/search/movie?api_key=${apikey}&query=Hulk`).then(data=>{
    
        let movies =data.data.results.map(elem=>{return  { id:elem.id,title:elem.title,release_date:elem.release_date,poster_path:elem.poster_path,overview:elem.overview};});
    return res.status(200).json(movies);
}).catch(err=>{
    return res.status(401).send(err);
    })
}
function trendingPage(req, res)
{
    axois.get(urlPerson).then(data=>{
        let movies =data.data.results.map(elem=>{return  {id:elem.id,title:elem.title,release_date:elem.release_date,poster_path:elem.poster_path,overview:elem.overview};});
        return res.status(200).json(movies);
}).catch(err=>{
console.log(err);
return res.status(500).send(err);
    });
}

function peoplePage(req,res)
{

    axois.get(urlPerson)
    .then((data)=>{
        // console.log(data.data);
        let res=data.data.results;
// console.log(res);
      let persons=  res.map((elm)=>{
        return {id:elm.id,name:elm.name,profile_path:elm.profile_path}; 
        
        //  console.log(elm.id);
      });

   
console.log(persons);
      return  res.status(200).json(persons);

    }).catch(err=>{


    });
};



function letestPage(req,res){

axois.get(`https://api.themoviedb.org/3/movie/latest?api_key=${apikey}`).then(data=>{

  //  console.log(data);
  let movies =data.data.results.map(elem=>{return new Movie(elem.id,elem.title,elem.release_date,elem.poster_path,elem.overview);});
    return res.status(200).json(movies);}).catch(err=>{
return res.status(401).send(err);
});

}

function notFoundHndler(req,res){
    
    return res.status(404).send("huuuh?");

};
