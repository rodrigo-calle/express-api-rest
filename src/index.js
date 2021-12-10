const express = require('express');
const morgan = require('morgan');


const port = 3001;

//hardcode data
const persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-434345"
    },
    {
        id: 4,
        name: "Mary Poppendick",
        number: "39-23-6423122"
    },
];



const app = express();
app.use(express.json());


morgan.token('body', function (req, res) { 
    return [
        JSON.stringify(req.body)
    ] 
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


//api person page

app.get('/api/persons', (req, res) => {
    res.send(persons)
});

//find peson by id

app.get('/api/persons/:id', (req, res)=>{
    const id  = Number(req.params.id)
    const person = persons.find(person => person.id === id)
    
    if(!person){
        res.status(404).json({
            error: `Person ${id} not found`,
            number: 404
        })        
    }else{
        res.send(person)
        
    }

})

//delete person by id

app.delete('/api/persons/:id', (req,res)=> {
    const id  = Number(req.params.id)
    const personsFiltered = persons.filter(person => person.id !== id)
    res.send(personsFiltered)
    
})

//adding persons

app.post('/api/persons', (req, res)=>{
    const person = req.body;
    const bodyName = req.body.name;
    const personsName = persons.find(person => person.name === bodyName);
    
    if(personsName){
       res.send({
           "error": 'Name must be unique'
       }) 
    }
    if(!req.body.name  || !req.body.number  ){
        res.send({
            "error": 'Name or number is missing'
        })
    }
    
    person.id = Math.round(Math.random()*10000)
    persons.push(person)+res.json(persons)    
    
})


//info page
app.get('/info', (req, res) => {
    const date = new Date();    
    res.send(`Phone has info for ${persons.length} people /// ${date}`);
});


//starting server
app.listen(port, ()=> {
    console.log(`Starting port on ${port}`)
})
