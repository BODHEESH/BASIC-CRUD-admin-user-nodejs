const auth = (req,res,next)=> {
    if(req.session.admin){
        next()
    }else{
        res.redirect('/admin/login')
    }
}
const authuser = (req,res,next)=> {
    if(req.session.user){
        next()
    }else{
        res.redirect('/user/login')
    }
}

module.exports = {auth,authuser} 
