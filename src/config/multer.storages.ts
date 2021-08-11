import { diskStorage } from 'multer';


export const imageStorage=diskStorage({
    destination:(req,file,cb)=>cb(null,'./uploads/images/'),
    filename:(req,file,cb)=>{
        const fileName= new Date().toISOString()+file.originalname

        cb(null,fileName)
    }
})

