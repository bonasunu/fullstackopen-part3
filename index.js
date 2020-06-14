const express = require('express')
const { response } = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

app.use(express.json())
app.use(cors())
app.use(express.static('build'))
app.use(morgan('combined'))


let persons = [
    { 
      "name": "Arto Hellas", 
      "number": "040-123456",
      "id": 1
    },
    { 
      "name": "Ada Lovelace", 
      "number": "39-44-5323523",
      "id": 2
    },
    { 
      "name": "Dan Abramov", 
      "number": "12-43-234345",
      "id": 3
    },
    { 
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122",
      "id": 4
    }
  ]

app.get('/', (req, res) => {
    res.send('<h1>Part 3 </h1>')
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(peep => peep.id === id)

    if (person) {
        res.json(person)
    }
    else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)

    res.status(404).end()
})

const generateId = () => {
    const maxId = Math.floor(Math.random() * 1000)

    return maxId
}

app.post('/api/persons', (req, res) => {
    const body = req.body

    if (!body.name || !body.number) {
        return res.status(404).json({
            error: 'content missing'
        })
    }
    else if (persons.find(peep => peep.name === body.name)) {
        return res.status(404).json({
            error: 'content missing'
        })
    }

    const person = {
        'name': body.name,
        'number': body.number,
        'id': generateId()
    }

    persons = persons.concat(person)

    console.log(person)

    res.json(person)
})

app.get('/info', (req, res) => {
    res.send(
        `<p>Phonebook has info for ${persons.length} people</p>
        <p>${new Date()}</p>`

    )
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})