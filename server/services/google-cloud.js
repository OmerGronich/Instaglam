const { Storage } = require('@google-cloud/storage');
const path = require('path');
const bucketName = 'instaglam-bucket';

const gc = new Storage({
	keyFilename : path.join(__dirname, '../../dev1-263221-7258d8ee70b0.json'),
	projectId   : 'dev1-263221'
});
const bucket = gc.bucket('instaglam-bucket');

const deleteFromBucket = async url => {
	const fileName = url.split(`${bucketName}/`)[1];
	return bucket.file(fileName).delete();
};

module.exports = {
	bucket,
	deleteFromBucket
};
