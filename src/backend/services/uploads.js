//Deps
const multer = require("multer");
const multerS3 = require("multer-s3");
const { S3Client, ListObjectsCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const path = require('path')

// Config
const ALLOWED_EXTS = [".csv"];
const ALLOWED_MIME_TYPE = "text/csv";
const MAX_FILE_SIZE_MB = 100

// Init
const s3 = new S3Client({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    },
    region: process.env.AWS_REGION
})

const s3Storage = multerS3({
  s3: s3,
  bucket: process.env.AWS_BUCKET,
  acl: "public-read",
  metadata: (req, file, cb) => {
      cb(null, {fieldname: file.fieldname})
  },
  key: (req, file, cb) => {
      const fileName = file.originalname;
      cb(null, fileName);
  }
});

//Helper
function sanitizeFile(file, cb) {
  // Allowed Extensions
  const isAllowedExt = ALLOWED_EXTS.includes(
      path.extname(file.originalname.toLowerCase())
  );
  // Mime Type
  const isAllowedMimeType = file.mimetype === ALLOWED_MIME_TYPE

  if (isAllowedExt && isAllowedMimeType) {
    return cb(null, true);
  } else {
    cb(new Error("Error: File Type Not Allowed"), false);
  }
}

//Methods
const uploadFile = multer({
  storage: s3Storage,
  fileFilter: (req, file, callback) => {
      sanitizeFile(file, callback)
  },
  limits: {
      fileSize: 1024 * 1024 * MAX_FILE_SIZE_MB
  }
})

const listObjects = async () => {
  const bucketName = process.env.AWS_BUCKET;

  const command = new ListObjectsCommand({ Bucket: bucketName })
  const { Contents } = await s3.send(command)

  return Contents.map(file => {
    return {
      fileName: file.Key,
      fileUrl: `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${encodeURIComponent(file.Key)}`
    };
  });
}

const getFileStream = async (fileKey) => {
  const bucketName = process.env.AWS_BUCKET;

  const command = new GetObjectCommand({ Bucket: bucketName, Key: fileKey })
  const { Body } = await s3.send(command)

  return Body;
}

module.exports = {
  uploadFile,
  listObjects,
  getFileStream
}