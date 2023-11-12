const express = require('express')
const morgan = require('morgan')
const CORS = require('cors')
require('dotenv').config()
const Person = require('./modules/person')
const app = express()

morgan.token('post-data', (req, res) => {
    if (req.method === 'POST' && req.body) {
        console.log(req.body)
      return JSON.stringify(req.body);
    }
    return '';
  })

app.use(express.json())

app.use((req, res, next) => {
    console.log('Request Body:', req.body);
    next();
  });

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-data'))
app.use(CORS())

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get('/info', (request, response) => {
    const entries = persons.length
    const now = new Date()
    const timestamp = now.toString()
    const responseContent = 
        `<div>Phonebook has info for ${entries} people</div>
        <br />
        <div>${timestamp}</div>`
    response.send(responseContent)
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
        response.json(person)
    })
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (body.name === undefined) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save().then(savedPerson => {
        response.send(savedPerson)
    })
})

app.get('/', (req, res) => {
    res.send('Welcome to my Express app!');
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})