const express= require('express');
const cors = require('cors');

const app=express();
app.use(cors);



let movieData = require('./MovieData/data.json');

///// endpoints ///server for food recipes 

app.get('/',movieHandler);
app.get('/favorite',favoritePage);
app.get('*',notFoundHndler);
//constructor


function Movie(title,posterPath,overView){
    
    this.recipetitle = title;
    this.posterPath=posterPath;
    this.overView=overView;
    
}


function favoritePage(req,res)
{
return res.status(200).send();
};



function movieHandler(req,res){

        let movie = new Movie(    movieData.data.title, movieData.data.posterPath, movieData.data.overView);
    console.log(movie);
    return res.status(200).send(movie);
}

function notFoundHndler(req,res){
    
    return res.status(404).responseText("huuuh?");

};

app.listen(8080,()=>
{
    console.log('listening to port 8080');
 
})
