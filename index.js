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
//View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
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
//path
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function(req, res){
        res.render('index1',{
                title : 'Customers',
                users : users
            });
});
app.post('/users/add',function(req,res){
    var newUser = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email
    }
    console.log(newUser);
});

app.listen(3000, function() {
    console.log('server is listening');

})