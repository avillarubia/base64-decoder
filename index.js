const fs = require('fs')
const path = require('path')
const shortid = require('shortid')
const alphanumeric = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@'
shortid.characters(alphanumeric)

function convertBase64ToFile(dir, base64String) { //dir = 'public\\uploads\\'
    const splits = base64String.split(';base64,')//data:image/png;base64,
    const format = splits[0].split('/')[1]
    const base64 = splits[1]

    let filenameFormat
    try {
        const _path = path.join(__dirname, dir)

        createDir(_path)

        const id = shortid.generate()
        const _filenameFormat = `${id}.${format}`

        write(_path, _filenameFormat, base64)

        filenameFormat = _filenameFormat
    } catch (error) {
        console.log(error)
    }

    return filenameFormat
}

function write(_path, _filenameFormat, base64) {
    fs.writeFileSync(_path + _filenameFormat, base64, { encoding: 'base64' })
}

function createDir(_path) {
    if (!fs.existsSync(_path))
        fs.mkdirSync(_path, { recursive: true })
}

module.exports = {
    convertBase64ToFile
}