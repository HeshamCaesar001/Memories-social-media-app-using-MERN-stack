import Jwt from 'jsonwebtoken';

const auth = async (req,res,next)=>{
    let decodedData ;
    try {
        const token = req.headers.authorization.split(" ")[1];
       decodedData =  Jwt.decode(token);
       req.userId = decodedData?.id;
        next();
    } catch (error) {
        res.status(401).send('You are not authorized');
    }
};
export default auth;