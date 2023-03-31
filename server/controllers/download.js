const expressAsyncHandler=require('express-async-handler');
const fs=require('fs');

const DownloadVideo=expressAsyncHandler(async(req,res)=>{
 
 try {
        
  const filename=req?.params?.filename
  console.log(filename);
        const path=`./uploads/${filename}`;

    
       
          await res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
          await res.setHeader('Content-Type', 'video/mp4');

  const filestream = fs.createReadStream(path);
  filestream.pipe(res);
   
            
        
    } catch (error) {
        console.log(error);
    }
  });


  module.exports=DownloadVideo;