var express = require('Express');
var bodyParser = require('body-parser');
var path = require('path');
var expressValidator = require('express-validator');

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
//View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
//path
app.use(express.static(path.join(__dirname, 'public')));
// Global variable
app.use(function (req, res, next) {
    res.locals.errors = null;
    next();
    
});
//ExpressJS validator middleware
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
            , root    = namespace.shift()
            , formParam = root;

        while(namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param : formParam,
            msg   : msg,
            value : value
        };
    }
}));

var users =
    [
        {
            id :1,
            first_name : 'Jhon',
            last_name : 'Don',
            email : 'jhondoe@gmail.com'

        },
        {
            id :2,
            first_name : 'Smith',
            last_name : 'Bob',
            email : 'bobsmith@gmail.com'

        },
        {
            id :3,
            first_name : 'Beck',
            last_name : 'Don',
            email : 'beckydon@gmail.com'

        }
    ]

app.get('/', function(req, res){
        res.render('index1',{
                title : 'Customers',
                users : users
            });
});
app.post('/users/add',function(req,res){

    req.checkBody('first_name','First name is required').notEmpty();
    req.checkBody('last_name','Last name is required').notEmpty();
    req.checkBody('email','Email is required').notEmpty();

    var errors = req.validationErrors();
    if(errors)
    {
        res.render('index1',{
            title : 'Customers',
            users : users,
            errors :errors,
        });

    }else
    {
        var newUser = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email
        }
        console.log('Success');
    }



});

app.listen(3000, function() {
    console.log('server is listening');

})