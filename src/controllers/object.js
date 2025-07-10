const Object = require('../model/object/object');
const Picture = require('../model/object/picture');
const Category = require('../model/category');

const createObject = async (req, res) => {

    const { name, description, category } = req.body;
    const createBy = req.user.id;

    const objectPictures = req.files.map(file => ({img: file.filename}));

    const objectData = {
        name,
        description,
        category,
        createBy
    }

    try {

        const object = await Object.create(objectData);

        if(!object) throw new Error();

        const pictures = await Promise.all(
            objectPictures.map(picture => (
                Picture.create({ 
                    img: picture.img, 
                    objectId: object.id 
                })
            ))
        );

        const object_res = await Object.findByPk(object.id, {

            attributes: [ 'id', 'name', 'slug', 'price', 'quantity', 'description', 'offer', 'category'],

            include: [
                {
                  model: Picture,
                  attributes: [ 'id', 'img']
                },
                {
                  model: Review
                },
                {
                  model: Category,
                  attributes: [ 'id', 'name']
                }
              ]
        });

        if(!object_res) throw new Error();

        return res.status(201).json({
            //object: object.toJSON(), 
            object: object_res,
            objectPictures: pictures
        });
        
    } catch (error) {
        return res.status(400).json({
            error: "@objects/create",
            message: error.message || "object creation failed"
        });
    }
}

const getObjects = async (req, res) => {

    try {
        const objects = await Object.findAll();

        return res.status(200).json({ objects });
    
      } catch (error) {
        return res.status(400).json({
          error: '@objects/get',
          message: error.message || 'Failed to get objects',
        });
    }
}

module.exports = {
    createObject,
    getObjects,
}