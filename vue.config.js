const path = require ('path')

//sets the path to the build directory for the vue app
module.exports = {
    //creates new folder in the server folder named public
    outputDir: path.resolve(__dirname, '../fine_backend/public'),
    //sets proxy for dev server
    devServer: {
        proxy: {
            '/posts': {
                target: 'http://localhost:3000'
            }
        }
    }
}