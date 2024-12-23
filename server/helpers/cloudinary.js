import { v2 as cloudinary } from 'cloudinary';

import multer from 'multer';

    // Configuration
    cloudinary.config({ 
        cloud_name: 'dsenpijts', 
        api_key: '389331339586573', 
        api_secret: 'U1KLipj3F_1NwW5cKHPvAVzcsbY' // Click 'View API Keys' above to copy your API secret
    });
    
    const storage = new multer.memoryStorage();

    async function imageUploadUtil(file) {
      const result = await cloudinary.uploader.upload(file, {
        resource_type: "auto",
      });
    
      return result;
    }
    
    const upload = multer({ storage });
    

    export { upload, imageUploadUtil };