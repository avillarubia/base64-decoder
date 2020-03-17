const fs = require('fs')
const shortid = require('shortid')
const alphanumeric = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@'
shortid.characters(alphanumeric)

function convertBase64ToFile(dir, base64String) {
    const splits = base64String.split(';base64,')//data:image/png;base64,
    const format = splits[0].split('/')[1]
    const base64 = splits[1]

    let filenameFormat
    try {
        const id = shortid.generate()
        filenameFormat = `${id}.${format}`

        createDir(dir)
        write(dir, filenameFormat, base64)
    } catch (error) {
        console.log(error)
    }

    return filenameFormat
}

function write(dir, filenameFormat, base64) {
    fs.writeFileSync(dir + filenameFormat, base64, { encoding: 'base64' })
}

function createDir(dir) {
    if (!fs.existsSync(dir))
        fs.mkdirSync(dir, { recursive: true })
}

module.exports = {
    convertBase64ToFile
}