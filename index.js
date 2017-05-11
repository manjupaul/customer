var express = require('Express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();

/*middleware
var logger = function(reg, res, next)
{
    console.log('logging message');
    next();
}
//calling middleware
app.use(logger);
*/


//body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//path
app.use(express.static(path.join(__dirname, 'public')));
var people =[ {
    name:'Joseph',
    age:30
},
    {
        name :'sara',
        age: 20

    },
    {
        name :'Gail',
        age :45
    }
]
app.get('/', function(req, res){
        res.json(people);
});
app.listen(3000, function() {
    console.log('server is listening');

})