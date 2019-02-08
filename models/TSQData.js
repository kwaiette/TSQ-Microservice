const mongoose = require('mongoose')
const config = require('../config/database')
const rand = require('random-key')

const TSQDataSchema = mongoose.Schema({
	skillList: {
		type: Array,
		default: () => [],
		required: true
	},
	uKey: {
		type: String,
		default: () => rand.generate(),
		required: true
	}
})

const TSQData = module.exports = mongoose.model('TSQ_Data', TSQDataSchema)

// db functions
module.exports.createTSQ = function(data, callback) {
	data.ukey = rand.generate()
 	data.save(callback)
}

module.exports.getTSQDataById = function(id, callback) {
	TSQData.findById(id, callback)
}

module.exports.getTSQDataByKey = function(ukey, callback) {
	const query = { uKey: ukey }
	TSQData.findOne(query, callback)
}