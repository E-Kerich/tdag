exports.uploadFile = async (req, res) => {
    try {
      res.json({
        url: req.file.path,
        public_id: req.file.filename
      });
    } catch (error) {
      res.status(400).json({ message: 'Upload failed' });
    }
  };
  