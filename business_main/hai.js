let productmodal = require('./models/product')
productmodal
    .find({
    name: 'men'
    })
    .then(doc => {
            console.log(doc)
        })
    .catch(err => {
            console.error(err)
    })
