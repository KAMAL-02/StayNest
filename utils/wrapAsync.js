//created a wrapAync function to handle asynchronous error
module.exports = (fn) => {
    return function(req , res, next){
        fn(req,res,next).catch(next);
    }
}