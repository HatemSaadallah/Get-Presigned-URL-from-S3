const AWS = require('aws-sdk')

const s3 = new AWS.S3()

async function getSignedUrl(bucketName, key) {
    const signedUrlExpireSeconds = 60 * 5

    const params = {
        Bucket: bucketName,
        Key: key,
        Expires: signedUrlExpireSeconds
    }
    return new Promise((resolve, reject) => {
        s3.getSignedUrl('getObject', params, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

async function getAnswer() {
    return getSignedUrl("image-resized-with-lambda", "aws.png").then(url => {
        return url;
    })
}
getAnswer().then(data => {
    console.log(data);
});