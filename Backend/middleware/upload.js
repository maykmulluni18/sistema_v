import multer from 'multer';
import path from 'path';
const __dirname = path.resolve();
console.log(__dirname)
const excelFilter = (req, file, cb) => {
  if (
    file.mimetype.includes("excel") ||
    file.mimetype.includes("spreadsheetml")
  ) {
    cb(null, true);
  } else {
    cb("Please upload only excel file.", false);
  }
};
//cb(null, `${Date.now()}-bezkoder-${file.originalname}`);
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + '/uploads/');
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    cb(null, `$${file.originalname}`);
  },
});

export const uploadExel = multer({ storage, fileFilter: excelFilter });

