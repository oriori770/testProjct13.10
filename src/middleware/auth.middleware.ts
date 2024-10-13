import jsonwebtoken from "jsonwebtoken";
import { IStudent } from "../model/Student.model";
import { Request, Response, NextFunction } from "express";
interface AuthRequest extends Request {
    userId?: {_id: string};}
function authenticateToken(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        const authCookies  = req.cookies.token;        
        if (!authCookies) return res.status(401).json({ error: "Access denied" });
        const token = authCookies && authCookies.split(" ")[1];        
        const decoded: any = jsonwebtoken.verify(
            token,
            process.env.JWT_SECRET as string
        );        
        req.userId = decoded ;        
        next(); 
        } catch (err) { res.status(401).json({err});}
}
export const managerAuthMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    if (req.userId?._id !=='manager') {
        res.status(403).json({message: "Access denied, Managers only!"})
    } else {
        next()
    }
}
export default authenticateToken ;
