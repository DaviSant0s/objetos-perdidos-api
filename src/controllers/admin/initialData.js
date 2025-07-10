const Category = require('../../model/category');
const Picture = require('../../model/object/picture');
const Object = require('../../model/object/object');
const { createCategories } = require('../../utils/createCategories');

const initialData = async (req, res) => {

    try {
        const objects = await Object.findAll({
          attributes: [ 'id', 'name', 'description', 'category'],
          include: [
            {
              model: Picture,
              attributes: [ 'id', 'img']
            },
            {
              model: Category,
              attributes: [ 'id', 'name']
            }
          ]
        });
        
        const categories = await Category.findAll({raw: true});

        return res.status(200).json({ 
          categories: createCategories(categories),
          objects
        });
    
      } catch (error) {
        return res.status(400).json({
          error: '@initialData/get',
          message: error.message || 'Failed to get initial data',
        });
    }
}

module.exports = {
    initialData
}