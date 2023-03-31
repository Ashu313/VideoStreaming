const expressAsyncHandler=require('express-async-handler');
const fs=require('fs');

const StreamVideo=expressAsyncHandler(async(req,res)=>{
    const filename = req?.params?.filename; //request fro postman
    console.log(filename);
    const videoPath = `./uploads/${filename}`;
   // http://localhost:3000/stream/1680249355862.mp4
   
    if (!fs.existsSync(videoPath)) {
      return res.status(404).json({ data: 'OMFG file not found' });
    }
    console.log(videoPath);
      //file information is provide like timestamp,exist or not
    const stat = fs.statSync(videoPath); 
    const fileSize=stat.size
    console.log(fileSize);
    console.log("hdhdh");
  //incoming or outgoing requests
    const videoRange=req.headers.range; //range set in postman to check for the stream


    console.log(videoRange)
    const videoUrl = `http://localhost:3000/stream/${filename}`;
   
    try{
    if(videoRange)
    {
        //spillitng into two array one for the starting index and other for the lower index
      
      
    
        const parts = videoRange.replace(/bytes=/, "").split("-");

        const start = parseInt(parts[0], 10);
        
        const end = parts[1]
        
        ? parseInt(parts[1], 10)
        
        : fileSize-1;
    
    if(start >= fileSize) {
        res.json('notpossible'+start+' >= '+fileSize)
     
      return
    }

    console.log({start,end});
    console.log(`bytes ${start}-${end}/${fileSize}`)

    const chunksize = end-start+1;//1mb minimum
    const x=0;
    const y=1*1e6;
  
    const headers = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4',//ant type
    }

    res.writeHead(206, headers)
    const file = fs.createReadStream(videoPath, {start, end})
    file.pipe(res)
    console.log('video played');

  }
  else {
    // If the request doesn't include the Range header, we'll serve the whole video at once
    const headers = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    };

    res.writeHead(200, headers);
    fs.createReadStream(videoPath).pipe(res);
  }
 




  
}catch(error)
{
  console.log(error);
}
 

})
module.exports=StreamVideo;