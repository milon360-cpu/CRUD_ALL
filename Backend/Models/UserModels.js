const mongoose = require("mongoose");

const userSchema = mongoose.Schema
(
    {
        name:
        {
            type : String,
            required : [true,"name is required"],
            trim : true
        },
        email:
        {
            type : String,
            required : [true,"email is required"],
            trim : true,
            unique : true,
            validate:
            {
                validator: (v)=>
                {
                    const validEmailExpression = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/; 
                    return validEmailExpression.test(v)
                },
                message: (props)=> `${props.message} is not a valid email`
            }
        },
        number:
        {
            type : String,
            required : [true,"phone number is required"],
            trim : true,
            required : true,
            validate:
            {
                validator: (v)=>
                {
                    const validPhoneNumber = /\d{3}-\d{3}-\d{4}/
                    return validPhoneNumber.test(v);
                },
                message : (props)=>`${props.message} is not a valid phone number`
            }
        },
        image:
        {
            type : String,
            required:[true,"image ie required"],
            required : true
        },
        createdOne:
        {
            type : Date,
            default : Date.now
        }
    }
)

module.exports = mongoose.model("userSchema",userSchema);