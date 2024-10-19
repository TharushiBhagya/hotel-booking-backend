import Room from "../models/room.js";
import { isAdminValid } from "./userControllers.js";

// Create a new room (Admin only)
export function createRoom(req,res){
    if(!isAdminValid(req))
    {
        return res.status(403).json({
            message:"Unauthorized"
        });
    }

const newRoom=new Room(req.body)
    newRoom.save().then((result)=>
    {
        res.status(201).json({
            message:"Room created successfully",
            result:result
        });
    }).catch((err)=>{
        res.status(500).json({
            message:"Room creation failed",
            error:err.message
        });
    });
}
// Get rooms by category (Common for admin and customers)
export function getRoomsByCategory(req, res) {
    const category = req.params.category;

    Room.find({ category: category })
        .then((result) => {
            if (result.length === 0) {
                return res.status(404).json({
                    message: "No rooms found in this category"
                });
            }
            res.status(200).json({
                rooms: result
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: "Failed to get rooms",
                error: err.message
            });
        });
}

// Update a room (Admin only)
export function updateRoom(req, res) {
    if (!isAdminValid(req)) {
        return res.status(403).json({
            message: "Unauthorized"
        });
    }

    const roomNumber = req.params.number; 

    Room.updateOne({ number: roomNumber }, req.body)
        .then((updateResult) => {
            if (updateResult.modifiedCount === 0) {
                return res.status(404).json({ message: "Room not found or no changes made" });
            }
            res.json({
                message: "Room updated successfully"
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: "Failed to update room",
                error: err.message
            });
        });
}
// Delete a room (Admin only)
export function deleteRoom(req, res) {
    if (!isAdminValid(req)) {
        return res.status(403).json({
            message: "Unauthorized"
        });
    }

    const roomNumber = req.params.number; // Assuming you are deleting by room number

    Room.findOneAndDelete({ number: roomNumber })
        .then((deletedRoom) => {
            if (!deletedRoom) {
                return res.status(404).json({ message: "Room not found" });
            }
            res.status(200).json({ message: "Room deleted successfully" });
        })
        .catch((err) => {
            res.status(500).json({
                message: "Room deletion failed",
                error: err.message
            });
        });
}