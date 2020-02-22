var express= require('express');  
var mongoose   = require('mongoose');
var DSchema=require('./app/models/cardOfferDetails')
mongoose.connect('mongodb+srv://ak1003:<password>@cluster0-ozxyz.mongodb.net/test?retryWrites=true&w=majority');
var app=express();            
var bodyParser = require('body-parser');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var port = process.env.PORT || 8080;        // set our port
var router = express.Router();  
var finalNameCards=[]
var finalOfferCards=[] 
var jsonArray=[]
var finalJson={AllInfo:""}
router.get('/cardInfo',function(req, res) {
    finalNameCards=[]
    finalOfferCards=[] 
    console.log("Happening Here");
    url = 'https://www.creditkarma.com/creditcards/explore/i/best-credit-cards-from-our-partners/?adcopy=861021761_95455709277_419442574230&adgroup=Generic_Offers_BMM&adcampaign=Credit_Cards_-_General_-_tnsev_-_Broad';
    request(url, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);
            // console.log($)
            // Finally, we'll define the variables we're going to capture
            var carTitle;
            var cardOffers;
            var list=[]
            var name=[]
            $('.ck-offer__card--title').toArray().map((function(x){
                name.push($(x).text());
                // var path='./example.txt'
                // console.log(data.text())
                // var value=data.children().text();
                // console.log("---------");
            }));
            for(let i=0;i<name.length;i++){
                name[i]=name[i].split('\t').join('');
                name[i]=name[i].split('\n').join('');
                if(!finalNameCards.includes(name[i])){
                    finalNameCards.push(name[i]);
                }
            }
    
            console.log(finalNameCards);
            $(".ck-offer__card--content").toArray().map(function(x) {
                $(x).find('ul > li').toArray().map(function(x) {
                    list.push($(x).text());
                });
                finalOfferCards.push(list);
                list=[]
            });
            // console.log(finalOfferCards)
            
        }
    })
    // next();
});           
// router.get('/', function(req, res) {
//     res.json({ message: 'hooray! welcome to our api!' });   
// });
router.route('/saveCardInfo')

    .post(function(req, res) {
        jsonArray=[]
        for(let i=0;i<finalNameCards.length;i++){
            var json = { cardTitle : "",Offers:""};
            json.cardTitle=finalNameCards[i];
            json.Offers=finalOfferCards[i]
            jsonArray.push(json)
        }
        // console.log("----------")
        console.log(jsonArray)
        var dSchema = new DSchema();
        dSchema.AllInfo=jsonArray      
        dSchema.save(function(err) {
                if (err)
                    res.send(err);
                res.json({ message: 'Information Savedd!' });
            });

    });

router.route('/offerInfo')
    .get(function(req, res) {
        DSchema.find(function(err, dschema) {
            if (err)
                res.send(err);

            res.json(dschema);
        });
    });

app.use('/', router);
app.listen(port);
console.log('Magic happens on port ' + port);