const Object = require('../model/object/object');
const Picture = require('../model/object/picture');

const createObject = async (req, res) => {

    const { name, description, category, location_of_loss } = req.body;
    const createBy = req.user.id;

    const objectPictures = req.files.map(file => ({img: file.filename}));

    const objectData = {
        name,
        description,
        category,
        location_of_loss,
        //date_of_loss
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

            attributes: [ 'id', 'name', 'description', 'location_of_loss', 'date_of_loss', 'category'],

            include: [
                {
                  model: Picture,
                  attributes: [ 'id', 'img']
                },
            ]
        });

        if(!object_res) throw new Error();

        return res.status(201).json({
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