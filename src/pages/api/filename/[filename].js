import path from 'path';
import fs from 'fs';
import mime from 'mime-types'

export default function handler(req, res) {
  const { filename } = req.query;
  const filePath = path.join(process.cwd(), 'uploads', filename);

  if (fs.existsSync(filePath)) {
    const fileBuffer = fs.readFileSync(filePath);
    const mimeType = mime.lookup(filename) || 'application/octet-stream';
    res.setHeader('Content-Type', mimeType);
    res.setHeader('Content-Disposition', `inline; filename="${filename}"`);
    res.setHeader('Content-Length', fileBuffer.length);
    res.setHeader('Cache-Control', 'no-store'); 
    res.end(fileBuffer);
  } else {
    res.status(404).json({ error: 'File not found' });
  }
}
