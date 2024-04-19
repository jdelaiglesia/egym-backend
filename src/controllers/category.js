const Category = require('../models/Category')

const getCategories = (req, res) => {
    Category.find({deleted:false})
    .then(result => res.status(200).json(result))
    .catch(error => res.status(500).json({ message: error.message}))
}

const getCategory = (req, res) => {
    const {name} = req.params

    Category.findOne({
        name: name,
        deleted: { $ne: true }
    })
    .then(data => {
        if(data){ res.status(200).json(data)}
        else{ res.status(404).json({message: "Category not found"})}})
    .catch(error => res.status(500).json({message: error.message}))
}

const postCategory = async (req, res) => {
    const {name} = req.body

    if(!name){return res.status(404).json({message: "Incomplete information"})}

    try {
        let category = await Category.findOne({
            name,
            deleted: { $ne: true }
        })
        if(category && !category.deleted){return res.status(404).json({message: "Category already exists"})}
        else{
            const category = new Category({name: name})
            await category.save()
            return res.status(200).json(category)
        }
    } catch (error) {
        return res.status(500).json({ message: error.message})
    }
}

const putCategory = async (req, res) => {
    try {
        const {name} = req.body
        const categoryId = req.params.id

        if(!name){return res.status(404).json({ message: "Name is required"})}
        if(!categoryId){return res.status(404).json({ message: "Category ID is required"})}

        const category = await Category.findById(categoryId)
        if(!category || category.deleted){ return res.status(404).json({message: "Category not found"})}

        category.name = name;
        await category.save()

        res.status(200).json(category)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteCategory = async (req, res) => {
    try {
        const categoryId = req.params.id

        const category = await Category.findById(categoryId)
        if(!category || category.deleted){ return res.status(404).json({ message: "Category not found"})}

        category.deleted = true
        await category.save()

        res.status(200).json(category)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getCategories,
    getCategory,
    postCategory,
    putCategory,
    deleteCategory
}