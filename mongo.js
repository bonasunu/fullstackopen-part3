const mongoose = require('mongoose')

if (process.argv.length < 3 || process.argv.length === 4 || process.argv.length > 5) {
    console.log('Please provide the password as an argument: node mongo.js <password> or <name> <number>')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://bonabon:${password}@cluster0-9rekc.mongodb.net/phonebook?retryWrites=true`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const phonebookSchema = new mongoose.Schema({
    name: String,
    number: String
    
})

const Book = mongoose.model('Phonebook', phonebookSchema)

const fetchDb = () => {
    Book.find({}).then(result => {
        console.log('phonebook:')
        result.forEach(note => {
          console.log(`${note.name} ${note.number}`)
        })
        mongoose.connection.close()
      })
}

const addToDb = (name, number) => {
    const note = new Book({
        name: name,
        number: number
    })
    
    note.save().then(result => {
        console.log(`added ${note.name} number ${note.number} to phonebook`)
        mongoose.connection.close()
    })
}

if (process.argv.length === 3) {
    fetchDb()
}
else if (process.argv.length === 5) {
    addToDb(process.argv[3], process.argv[4])
}
