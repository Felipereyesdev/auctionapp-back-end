const service = require("./properties.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// this function list all the properties inside the database
async function list(req,res,){
    const data = await service.list();
    res.json({data})
}

// this function creates a property all the property
async function create(req, res) {
    const data = await service.create(req.body.data);
    res.status(201).json({ data });
  }

//middleware for the creation of a property

// this property makes sure that property has the neccesay data
function bodyDataHas(propertyName) {
    return function (req, res, next) {
      const { data = {} } = req.body;
      if (data[propertyName]) {
        return next();
      }
      next({ status: 400, message: `${propertyName} property has an issue` });
    };
  }

module.exports ={
    list: [asyncErrorBoundary(list)],
    create: [
    bodyDataHas("auction_id"),
    bodyDataHas("address"),
    bodyDataHas("owner"),
    bodyDataHas("debt"),
    bodyDataHas("rating"), 
    bodyDataHas("image_url"),
    asyncErrorBoundary(create)
]
}