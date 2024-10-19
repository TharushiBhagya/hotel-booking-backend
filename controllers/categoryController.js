import Category from "../models/category.js";
import { isAdminValid } from "./userControllers.js";

// Create a new category (Admin only)
export function createCategory(req,res){
    if(!isAdminValid(req))
    {
        return res.status(403).json({
            message:"Unauthorized"
        });
    }

const newCategory=new Category(req.body)
    newCategory.save().then((result)=>
    {
        res.status(201).json({
            message:"Category created successfully",
            result:result
        });
    }).catch((err)=>{
        res.status(500).json({
            message:"Category creation failed",
            error:err
        });
    });
}

// Delete a category (Admin only)
export function deleteCategory(req,res){
    if(!isAdminValid(req)){
        res.status(403).json({
            message:"Unauthorized"
        });
    }

const name=req.params.name;
     Category.findOneAndDelete({name:name}).then((deletedCategory)=>{
        if (!deletedCategory) {
            return res.status(404).json({ message: "Category not found" });
          }
          res.json({
            message: "Category deleted successfully",
          });
        })
        .catch((err) => {
          res.status(500).json({
            message: "Category deletion failed",
            error: err.message
          });
        });
    }

// Get all categories (Common for admin and customers)
export function getCategory(req,res){
    Category.find().then((result)=>{
        res.json({
            categories:result
        })
    }).catch((err)=>{
        res.status(500).json({
            message:"Failed to get categories",
            error: err.message
        });
    });
}

// Get a category by name (Common for admin and customers)
export function getCategoryByName(req,res){
    const name=req.params.name;
    Category.findOne({name:name}).then((result)=>{
         if(!result){
            return res.status(404).json({
                message:"Category not found"
            });
         }
            res.json({
                Category:result
            });
    }).catch((err)=>{
        res.status(500).json({
            message:"Failed to get category",
            error: err.message
        });
    });
}

// Update a category (Admin only)
export function updateCategory(req,res){
    if(!isAdminValid(req)){
        return res.status(403).json({
            message:"Unauthorized"
        });
}
const name =req.params.name;
Category.updateOne({name:name},req.body).then((updateResult)=>{
    if (updateResult.nModified === 0) {
        return res.status(404).json({ message: "Category not found or no changes made" });
      }
    res.json({
        message:"Category updated successfully"
    });
}).catch((err)=>{
     res.status(500).json({
        message:"Failed to updated category",
        error: err.message
});
});
}
