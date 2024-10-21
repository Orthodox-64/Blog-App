const jwt=require("jsonwebtoken");
const JWT_SECRET="superman";

function createTokenForUser(user){
    const payload={
        _id:user._id,
        email:user.email,
        profileImageURL:user.profileImageURL,
        role:user.role,
    };
    const token=jwt.sign(payload,JWT_SECRET,{
        expiresIn:'7d'
    });
    return token;
}

function validateToken(token){
    const payload=jwt.verify(token,JWT_SECRET);
    return payload
}

module.exports={
    createTokenForUser,
    validateToken,
}