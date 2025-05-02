const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	email: {
		type: String,
		required: [true, 'Email required!'],
		trim: true,
		unique: [true, 'Email must be unique'],
		minlength: [5, 'Min length should be 5 characters'],
		lowercase: true,
	},
	password: {
		type: String,
		required: [true, 'Password is required'],
		trim: true,
		select: false,
	},
	verified: {
		type: Boolean,
		default: false,
	},
	verificationCode: {
		type: String,
		select: false,
	},
	verificationCodeValidation: {
		type: Number,
		select: false,
	},
	forgotPasswordCode: {
		type: String,
		select: false,
	},
	forgotPasswordCodeValidation: {
		type: Number,
		select: false,
	},
}, {
	timestamps: true,
});

// ✅ Fixed typo here:
module.exports = mongoose.model("User", userSchema);
