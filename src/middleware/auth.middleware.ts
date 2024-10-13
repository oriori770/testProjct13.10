import jsonwebtoken from "jsonwebtoken";
import { IUser } from "../model/User.model";
import { Request, Response, NextFunction } from "express";
interface AuthRequest extends Request {
    userId?: string;}
function authenticateToken(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        const authCookies  = req.cookies.token;        
        if (!authCookies) return res.status(401).json({ error: "Access denied" });
        const token = authCookies && authCookies.split(" ")[1];        
        const decoded = jsonwebtoken.verify(
            token,
            process.env.JWT_SECRET as string
        );        
        req.userId = decoded as string;        
        next(); 
        } catch (err) { res.status(401).json({err});}
}
export default authenticateToken ;
