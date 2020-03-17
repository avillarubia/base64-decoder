var fs = require('fs')
const { convertBase64ToFile } = require('../index')

const file = './base64String.txt'

fs.readFile(file, 'utf8', function (err, data) {
    if (err) throw err;
    convertBase64ToFile('public\\uploads\\', data)
})