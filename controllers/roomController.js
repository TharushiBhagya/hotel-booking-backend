import Room from "../models/room.js";
import { isAdminValid } from "./userControllers.js";
export function createRoom(req,res){
    if(!isAdminValid(req)){
        res.status(403).json({
            message:"Forbidden"
        })
    }return
}