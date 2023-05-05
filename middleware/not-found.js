const notFound = (res,req,next)=>{
    res.status(404).send('router dose not exist');;
}
module.exports = notFound;