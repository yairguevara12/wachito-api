const test = (req,res)=>{
    console.log('testing');
    res.status(200).json({msg : "everything is fine"});
}

module.exports = { test };