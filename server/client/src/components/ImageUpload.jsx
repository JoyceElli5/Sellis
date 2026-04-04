import { useRef, useState } from 'react';
import { uploadImage } from '../api/cloudinary';

export default function ImageUpload({ value, onChange }) {
  const fileRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleClick = () => {
    if (!uploading) fileRef.current?.click();
  };

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be under 5MB');
      return;
    }

    setError('');
    setUploading(true);
    try {
      const url = await uploadImage(file);
      onChange(url);
    } catch {
      setError('Upload failed. Check your Cloudinary config.');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    onChange(null);
  };

  return (
    <div>
      <div
        className={`image-upload-area ${value ? 'has-image' : ''}`}
        onClick={handleClick}
      >
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={handleFile}
        />

        {uploading ? (
          <div className="image-upload-loading">
            <div className="spinner" />
            <span>Uploading...</span>
          </div>
        ) : value ? (
          <>
            <img src={value} alt="Service" className="image-preview" />
            <div className="image-upload-actions">
              <button type="button" className="btn-icon danger" onClick={handleRemove}>X</button>
            </div>
          </>
        ) : (
          <div className="upload-placeholder">
            <span className="upload-icon">+</span>
            <p>Click to upload image</p>
            <span className="upload-hint">JPG, PNG up to 5MB</span>
          </div>
        )}
      </div>
      {error && <div className="form-error" style={{ marginTop: 8 }}>{error}</div>}
    </div>
  );
}
