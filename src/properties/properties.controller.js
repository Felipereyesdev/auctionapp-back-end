const service = require("./properties.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// this function list all the properties inside the database
async function list(req,res,){
    const data = await service.list();
    res.json({data})
}

// this function finds the specific property
async function read(req, res) {
    console.log(res.locals.property)
    res.json({ data: res.locals.property });
  }

// this function makes sure that a property actually exists
async function propertyExists(req, res, next) {
    const property = await service.read(req.params.properties_id);
    console.log('**inreservationexists**',property)
    if (property) {
      res.locals.property = property;
      return next();
    }
    return next({
      status: 404,
      message: `property cannot be found : ${req.params.property}`,
    });
  }

// this function creates a property all the property
async function create(req, res) {
    const data = await service.create(req.body.data);
    res.status(201).json({ data });
  }
// this function updates the property
async function update(req, res) {
    const propertyId = req.params.properties_id;
    const resData = req.body.data;
    const updatedpro = {
      ...resData,
      properties_id: propertyId,
    };

    if(resData.status === 'notbuy'){
    const data = await service.updateNotBuy(updatedpro)
    res.status(200).json({ data }); 
    return  
    }
    if(resData.status === 'buy'){
        const data = await service.updateBuy(updatedpro)
        res.status(200).json({ data });  
        return 
        }
        if(resData.status === 'maybe'){
            const data = await service.updatemaybe(updatedpro)
            res.status(200).json({ data }); 
            return  
            }    
    // console.log("id", propertyId)
    // console.log("data",resData.status)
    // console.log("uppro",updatedpro)
    
    // console.log('inUpdate',data)
    
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

  function validStatus(req, res, next) {
    console.log('inValidStatus')
    let validStatuses = ['no status',`buy`, `notbuy`, `maybe`];
    const { data = {} } = req.body;
    const status = data.status;
    if (!validStatuses.includes(status)) {
      return next({
        status: 400,
        message: "unknown status",
      });
    }
    return next();
  }

  function proStatus(req, res, next) {
    const { data = {} } = req.body;
    const status = data.status;
    if (!status) {
      return next();
    }
    if (status !== "no status")
      return next({
        status: 400,
        message: status,
      });
    return next();
  }

module.exports ={
    list: [asyncErrorBoundary(list)],
    read:[asyncErrorBoundary(propertyExists), read],
    create: [
    bodyDataHas("auction_id"),
    bodyDataHas("address"),
    bodyDataHas("owner"),
    bodyDataHas("debt"),
    bodyDataHas("rating"), 
    bodyDataHas("image_url"),
    proStatus,
    asyncErrorBoundary(create),
    
],
updateStatus: [asyncErrorBoundary(propertyExists), asyncErrorBoundary(update)]

}