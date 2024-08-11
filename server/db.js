const mongoose = require("mongoose");

module.exports = async () => {
	try {
		// Remove deprecated options
		await mongoose.connect(process.env.DB, {
			// No need to include `useNewUrlParser` and `useUnifiedTopology`
		});
		console.log("Connected to database successfully");
	} catch (error) {
		console.error("Could not connect to database!", error);
	}
};
