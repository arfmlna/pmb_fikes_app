import fs from 'fs';
import path from 'path';
import authenticateToken from './auth';
import {formidable} from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res) => {
  if (req.method === 'POST') {
    return handlePost(req, res)
  } else if (req.method === 'PUT'){
    return handlePut(req, res)
  }
};
const handlePost = async(req, res) => {
  const form = formidable({});

  const parseForm = () =>
    new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) return reject(err);
        resolve({ fields, files });
      });
    });

  try {
    const { files } = await parseForm();

    const uploads = {};
    const uploadDir = path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    for (const [key, file] of Object.entries(files)) {
      const uploaded = Array.isArray(file) ? file[0] : file;
      const fileName = Date.now() + '-' + uploaded.originalFilename;
      const newPath = path.join(uploadDir, fileName);
      fs.copyFileSync(uploaded.filepath, newPath);
      uploads[`${key}Url`] = `${fileName}`;
    }

    return res.status(200).json({ message: 'Upload sukses', fileUrl: uploads });

  } catch (err) {
    console.error('Upload failed:', err);
    return res.status(500).json({ message: 'Upload gagal', error: err.message });
  }
}

const handlePut = async (req, res) => {
  const form = formidable({});
  const parseForm = () =>
    new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) return reject(err);
        resolve({ fields, files });
      });
    });

  try {
    const { fields, files } = await parseForm();
    const uploadDir = path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    const uploads = {};

    for (const [fieldName, file] of Object.entries(files)) {
      const uploaded = Array.isArray(file) ? file[0] : file;
      const fileName = `${Date.now()}-${uploaded.originalFilename}`;
      const newPath = path.join(uploadDir, fileName);

      fs.copyFileSync(uploaded.filepath, newPath);
      uploads[`${fieldName}Url`] = fileName;

      // Hapus file lama jika ada
      const oldKey = `old_${fieldName}`;
      const oldFile = fields[oldKey]?.[0];
      if (oldFile) {
        const oldPath = path.join(uploadDir, oldFile);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
    }    

    return res.status(200).json({ message: 'Update sukses', fileUrl: uploads });
  } catch (err) {
    console.error('Update failed:', err);
    return res.status(500).json({ message: 'Update gagal', error: err.message });
  }
};


export default authenticateToken(handler);