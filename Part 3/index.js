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

const errorHandler = (error, request, responspe, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).sendd({ error: 'malformatted id' })
    }

    next(error)
}

app.use(express.json())

app.use((req, res, next) => {
    console.log('Request Body:', req.body);
    next();
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-data'))
app.use(CORS())
// this has to be the last loaded middleware.
app.use(errorHandler)

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.send(persons)
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

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id).then(person => {
        if (person) {
            response.json(person)
        }
        else {
            response.status(404).end()
        }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (request, repsonse, next) => {
    const body = request.body

    const person = {
        name: body.name,
        number: body.number
    }

    Person.findByIdAndDelete(request.params.id, person, { new: true })
        .then(updatedPerson => {
            response.json(updatedPerson)
        })
        .catch(error => next(error))
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