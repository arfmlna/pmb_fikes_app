export default async function handler(req, res) {
    // Ambil nama file dari query parameter
    const { filename } = req.query;
  
    // Tentukan URL tujuan (server yang ada di port 9614)
    const remoteUrl = `http://127.0.0.1:9614/api/getfile/${filename}`;
  
    try {
      // Ambil file dari URL remote
      const response = await fetch(remoteUrl);
  
      // Pastikan file ditemukan
      if (!response.ok) {
        return res.status(404).json({ error: 'File not found on remote server' });
      }
  
      // Ambil response body sebagai ArrayBuffer
      const buffer = await response.arrayBuffer();
  
      // Set header Content-Type ke PDF
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `inline; filename="${filename}"`);
      
      // Kirimkan PDF yang didapat dari remote server
      res.status(200).send(Buffer.from(buffer));
    } catch (error) {
      console.error('Error fetching file:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  