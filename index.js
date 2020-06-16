require('dotenv').config()
const express = require('express')
const { response } = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Book = require('./models/phonebook')

app.use(express.json())
app.use(cors())
app.use(express.static('build'))
app.use(morgan('combined'))

app.get('/', (req, res) => {
    res.send('<h1>Part 3 </h1>')
})

app.get('/api/persons', (req, res) => {
    Book.find({}).then(person => {
        res.json(person)
    })
})

app.get('/api/persons/:id', (req, res, next) => {
    Book.findById(req.params.id)
    .then(person => {
        if (person) {
            res.json(person)
        }
        else {
            res.status(404).end()
        }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res) => {
    Book.findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(204).end()
        })
        .catch(error => next(error))
})

app.post('/api/persons', (req, res) => {
    const body = req.body

    if (body === undefined) {
        console.log(body)
        return res.status(404).json({ error: 'content missing'})
    }

    const person = new Book({
        name: body.name,
        number: body.number,
    })

    console.log(person)

    person.save().then(savedPerson => {
        res.json(savedPerson.toJSON())
    })

})

app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body

    const person = {
        number: body.number
    }

    Book.findByIdAndUpdate(req.params.id, person, { new: true })
        .then(updatedPerson => {
            res.json(updatedPerson)
        })
        .catch(error => next(error))
})

app.get('/info', (req, res) => {
    res.send(
        `<p>Phonebook has info for ${persons.length} people</p>
        <p>${new Date()}</p>`

    )
})

const unknownEndpoint = (req , res) => {
    res.status(404).send({ error: 'unknown endpoint' })
  }
  
// handler of requests with unknown endpoint
app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id'})
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})