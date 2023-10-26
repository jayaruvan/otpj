//otp.js
//*****************************************************************************
//
//	Description	    : OTP number Generator
//	Author		    : Jayaruvan Dissanayake
//	Date		    : 2022-02-24
//
//*****************************************************************************

//const otpGenerator = require('otp-generator');
//const code = otpGenerator.generate(6, { alphabets: false, upperCase: false, specialChars: false });
//console.log(code);

process.env.TZ = "Asia/Colombo";
const config = require("config");
const date = new Date();

async function getNumber() {
	if (0) {
		return await getNumberRandom();
	} else {
		return await generateOTP();
	}
}
// Function to convert
// single digit input
// to two digits
const formatData = (input) => {
	if (input > 9) {
		return input;
	} else return `0${input}`;
};

// Function to convert
// 24 Hour to 12 Hour clock
const formatHour = (input) => {
	if (input > 12) {
		return input - 12;
	}
	return input;
};

// Data about date
const format = {
	dd: formatData(date.getDate()),
	mm: formatData(date.getMonth() + 1),
	yyyy: date.getFullYear(),
	HH: formatData(date.getHours()),
	hh: formatData(formatHour(date.getHours())),
	MM: formatData(date.getMinutes()),
	SS: formatData(date.getSeconds()),
};

async function generateOTP() {
	let result = await new Promise(async (resolve) => {
		const date = new Date();
		let hour = await formatData(date.getHours());
		let min = await formatData(date.getMinutes());

		let otp = "" + min + "" + hour;
		resolve(otp);
	}).then(async (status) => {
		return status;
	});
	return result;
}

// Function to generate OTP
async function getNumberRandom() {
	// Declare a digits variable
	// which stores all digits
	let result = await new Promise(async (resolve) => {
		var digits = config.otp.digits;
		let OTP = "";
		for (let i = 0; i < config.otp.length; i++) {
			OTP += digits[Math.floor(Math.random() * 10)];
		}

		resolve(OTP);
	}).then(async (status) => {
		return status;
	});
	return result;
}

module.exports = getNumber;
