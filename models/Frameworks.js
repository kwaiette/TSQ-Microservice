const mongoose = require('mongoose')
const config = require('../config/database')

const FrameworksSchema = mongoose.Schema({

})

const FrameworksData = module.exports = mongoose.model('Frameworks_Data', FrameworksSchema)

// db functions
module.exports.getFrameworkDataById = function (id, callback) {}
module.exports.getFrameworkDataByShortName = function (shortName, callback) {}
module.exports.getFrameworkDataByDifficulty = function (difficulty, callback) {}
module.exports.getFrameworkDataByFramework = function (frameworkName, callback) {}
