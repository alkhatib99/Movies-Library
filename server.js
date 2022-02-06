'use strict';

require('dotenv').config();
const express= require('express');
const cors = require('cors');
const axois = require('axios');
const app=express();
app.use(cors());
const port=process.env.PORT;
const apikey=process.env.APIKEY;
const pg = require('pg');
// in terminal CREATE DATABASE MoviesLibrary
// DATABASE_URL=postgres://alkhatib99:102030@localhost:5432/MoviesLibrary
const client = new pg.Client(process.env.DATABASE_URL);


let movieData = require('./MovieData/data.json');
// const json = require('express/lib/response');
// const url=require(`https://api.themoviedb.org/3/movie/76341?api_key=${apikey}`);
///// endpoints 
//axois.get(url);
client.connect().then(()=>{
    app.listen(port,()=>
    {
        console.log(`listening to port${port}`);
    });

});

 
app.use(express.json())
app.get('/',movieHandler);
app.get('/person',peoplePage); 
app.get('/trending',trendingPage);
app.get('/search', searchPage);
app.get('/latest', letestPage);
app.post('/add', addMovie);
app.get('/favMovie', favHandler);

app.use('*',notFoundHndler);
app.use*(errorHandler);
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
function errorHandler (error,req,res){
    const err = {
         status : 500,
         messgae : error
     }
     res.status(500).send(err);
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

    let Movie = req.query.Movie ;
   //  name=prompt('enter movie Name');
    axois.get(`https://api.themoviedb.org/3/search/movie?api_key=${apikey}&query=${Movie}`).then(data=>{
    
        let movies =data.data.results.map(elem=>{return  { id:elem.id,title:elem.title,release_date:elem.release_date,poster_path:elem.poster_path,overview:elem.overview};});
    return res.status(200).json(movies);
}).catch(err=>{
    return res.status(401).send(err);
    })
}

function addMovie(req,res){
const movie=req.body;
let sql = `INSERT INTO favMovies(title,release_date, poster_path,overview ) VALUES($1,$2,$3,$4) RETURNING *;`
    // console.log(req.body);
let values = [movie.title,movie.release_date,movie.poster_path,movie.overview];
client.query(sql,values).then(data=>{
    res.status(200).json(data.rows);
}).catch(err=>{
    errorHandler(err,req,res);
})
};


function favHandler(req,res){
    let sql = `SELECT * FROM favMovies;`;
    client.query(sql).then(data=>{
       res.status(200).json(data.rows);
    }).catch(error=>{
        errorHandler(error,req,res)
    });
};
function trendingPage(req, res)
{
    axois.get(`https://api.themoviedb.org/3/trending/all/week?api_key=${apikey}`).then(data=>{
 
        console.log(data);
        let movies =data.data.results.map(elem=>{
            console.log(elem);
            return  {id:elem.id,title:elem.title,release_date:elem.release_date,poster_path:elem.poster_path,overview:elem.overview};});
       
        return res.status(200).json(movies);
}).catch(err=>{
console.log(err);
return res.status(500).send(err);
    });
}

function peoplePage(req,res)
{

    axois.get(`https://api.themoviedb.org/3/person/popular?api_key=${process.env.APIKEY}`)
    .then((data)=>{
        // console.log(data.data);
        let resault=data.data.results;
// console.log(res);
      let persons=  resault.map((elm)=>{
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

   console.log(res);
   let  elem=data.data;
  let movies ={id:elem.id,title:elem.title,relase_date:elem.release_date,poster_path:elem.poster_path,overview:elem.overview};

    return res.status(200).json(movies);}).catch(err=>{
return res.status(401).send(err);
});

}

function notFoundHndler(req,res){
    
    return res.status(404).send("huuuh?");

};
