import GalleryItem from "../models/galleryItem.js";
import { isAdminValid } from "./userControllers.js";

export function createGalleryItem(req, res) {
   
    if (!isAdminValid(req)) {
        return res.status(403).json({
            message: "You are not authorized to create a gallery item"
        });
    }

    const galleryItem = req.body.item;
    const newGalleryItem = new GalleryItem(galleryItem);

    newGalleryItem.save()
        .then(() => {
            res.json({
                message: "Gallery item created successfully"
            });
        })
        .catch(() => {
            res.status(500).json({
                message: "Gallery item creation failed"
            });
        });
}

export function getGalleryItems(req, res) {
    GalleryItem.find()
        .then((list) => {
            res.json({
                list: list
            });
        })
        .catch(() => {
            res.status(500).json({
                message: "Failed to retrieve gallery items"
            });
        });
}
