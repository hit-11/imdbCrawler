var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
//var exphbs = require('express-handlebars');
var ejs= require('ejs');
var app = express();

app.use(express.static('views'));

app.set('views', './views');
app.set('view engine','ejs');

app.get('/',function (req,res) {
    res.render('index');
})
var data;
app.get('/scrape',function (req,res) {
    var num=Math.floor(Math.random() * 2399999) + 1;;
    var numstr=num.toString();
    var count=7-numstr.length;
    var str="0";
    while(count>0){
        numstr=str+numstr;
        count -- ;
    }
    //console.log(numstr);
    var l='http://www.imdb.com/title/tt'+numstr+'/'

    url = l;
    
    request(url,function (error,response,html) {

        if(!error){

            var $ = cheerio.load(html);

            var title,release,rating;
            var json = {title:"",release:"",rating:""};

            /*$('.title_wrapper>h1').filter(function () {
                var data = $(this);
                title = data.text();
                json.title = title;
            })*/

            var data1 =$('.title_wrapper>h1').text();
            //console.log(data1);
            json.title=data1;


            $('#titleYear>a').filter(function () {
                var data = $(this);
                release = data.text();
                json.release = release;
            })

            $('.ratingValue>strong>span').filter(function () {
                var data = $(this);
                rating = data.text();
                json.rating = rating;
            })

        }

        /*fs.writeFile('output.json',JSON.stringify(json,null,4),function (err) {
            console.log('File succesfully written on output.json file');
        })*/
        res.render('out',{title:json.title,year:json.release,rating:json.rating});

    });
})




app.listen('8081');

console.log('Magic HAppens on port 8081');

exports = module.exports = app;

//2399999-0000001