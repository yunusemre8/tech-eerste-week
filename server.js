const express = require("express");
const app = express();

app.use('/static', express.static('public'));
app.use(express.static('static'))

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', home);
app.get('/about', about);
app.get('/login', login);
app.get('/profile/:username', profile);
app.get("/detail", toonDetail)

app.set("view engine", "ejs")
app.set('views', 'view')

app.get('/data', (req, res) => {
    res.json(data);
});

app.get('/add', showAddForm)
app.post('/add-movie', addMovie)

// const data = [];

// app.post('/login', (req, res) => {
//     console.log(req.body);

//     data.push({
//         username: req.body.username,
//         password: req.body.password
//     })
//     res.send("Data ontvangen");
// })

function home(req, res) {
    res.send('Hello World');
}

function about(req, res) {
    res.send('About page');
}

function login(req, res) {
    res.send('Login');
}

function profile(req, res) {
    const username = req.params.username;
    res.send('Profielpagina van ' + username);
}

function movie(req, res) {
    let movie = {
        title: "Interstaller",
        description: "Dit is een film bro!",
    };

    res.render("detail", { data: movie });
}

function showAddForm(req, res) {
    res.render('add.ejs')
}

function addMovie(req, res) {
    res.send(`
        Thanks for adding the movie with:
        title: ${req.body.title},
        plot: ${req.body.plot},
        and description: ${req.body.description}
    `)
}

// 404 fallback (altijd als laatste!)
app.use((req, res) => {
    res.status(404).send('404 - Not Found Error');
});

app.listen(3000, () => {
    console.log("server is running on http://localhost:3000");
});

