
const expressAsyncHandler=require('express-async-handler')

const uploadVideo=expressAsyncHandler(async(req,res)=>{

  try {

    const file = req.file;
    const fileSize = file.size;
    console.log(`Uploaded file size: ${fileSize} bytes`);
    
    res.status(200).json({
        message: 'File uploaded successfully',
        filename: req.file.filename,
      });
    
  } catch (error) {
    console.log("bvd");
    res.json(error);
  }
})
module.exports=uploadVideo;