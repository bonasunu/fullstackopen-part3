const mongoose = require('mongoose') // Mongo

mongoose.set('useFindAndModify', false)
// Mongo

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        console.log('connected to MongoDB', result)
    })
    .catch(error => {
        console.log('error connecting to MongoDB', error.message)
    })

const phonebookSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        required: true
    },
    number: {
        type: String,
        minlength: 8,
        required: true
    }
    
})

phonebookSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

//const Book = mongoose.model('Phonebook', phonebookSchema)

module.exports = mongoose.model('Phonebook', phonebookSchema)