const mongoose = require('mongoose');
const { Schema } = mongoose;

// array https://mongoosejs.com/docs/api.html#mongoosearray_MongooseArray-$pop
const userSchema = new Schema({
	firstname   : {
		type     : String,
		required : true
	},
	lastname    : {
		type     : String,
		required : true
	},
	institution : {
		type     : String,
		required : true
	},
	jobtitle    : {
		type     : String,
		required : true
	},
	email       : {
		type     : String,
		required : true,
		unique   : true
	},
	password    : {
		type     : String,
		required : true
	},
	date        : {
		type    : Date,
		default : Date.now
	},
	preferences : {
		pulse     : {
			danger  : {
				minLevel : { type: Number, required: true, default: 60 },
				maxLevel : { type: Number, required: true, default: 180 }
			},
			warning : {
				minLevel : { type: Number, required: true, default: 80 },
				maxLevel : { type: Number, required: true, default: 160 }
			}
		},
		oxygensat : {
			danger  : {
				minLevel : { type: Number, required: true, default: 0.5 },
				maxLevel : { type: Number, required: true, default: 2 }
			},
			warning : {
				minLevel : { type: Number, required: true, default: 0.7 },
				maxLevel : { type: Number, required: true, default: 1.7 }
			}
		}
	},
	devices     : [
		{
			patient  : {
				firstname   : { type: String },
				lastname    : { type: String },
				observation : { type: String },
				status      : { type: String, default: 'admitted' },
				admission   : {
					type    : Date,
					default : Date.now
				}
			},
			measures : [
				{
					pulse     : { type: Number },
					oxygensat : { type: Number },
					relayid   : { type: String },
					date      : {
						type    : Date,
						default : Date.now
					}
				}
			]
		}
	]
});

// mongoose.model('users', userSchema, 'users);
module.exports = User = mongoose.model('users', userSchema);
