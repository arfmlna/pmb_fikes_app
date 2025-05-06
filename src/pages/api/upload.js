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
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
  
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
};

export default authenticateToken(handler);