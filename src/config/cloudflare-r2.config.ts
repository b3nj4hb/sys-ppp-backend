import { S3Client } from '@aws-sdk/client-s3';

export const R2Client = new S3Client({
	endpoint: process.env.ENDPOINT,
	region: 'auto',
	credentials: {
		accessKeyId: process.env.ACCESS_KEY_ID,
		secretAccessKey: process.env.SECRET_ACCESS_KEY,
	},
});
