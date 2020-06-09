const { bucket } = require('../services/google-cloud');
const { v4: uuid } = require('uuid');

const uploadImage = (originalname, buffer) =>
	new Promise((resolve, reject) => {
		let filename;

		const toReplace = originalname.substring(originalname.lastIndexOf('.'));

		if (!(originalname.endsWith('mov') || originalname.endsWith('mp4'))) {
			filename =
				originalname.replace(toReplace, '').replace(/ /g, '_') +
				uuid() +
				'.jpeg';
		}

		const blob = bucket.file(filename);
		const blobStream = blob.createWriteStream({
			resumable : false
		});
		blobStream
			.on('finish', () => {
				const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
				resolve(publicUrl);
			})
			.on('error', () => {
				reject(`Unable to upload image, something went wrong`);
			})
			.end(buffer);
	});

module.exports = uploadImage;
