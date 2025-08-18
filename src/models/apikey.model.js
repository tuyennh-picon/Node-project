const {Schema, model, mongoose} = require('mongoose'); // Erase if already required

const DOCUMENT_NAME = 'ApiKeys'
const COLLECTION_NAME = 'ApiKeys'

// Declare the Schema of the Mongo model
var apikeyTokenSchema = new mongoose.Schema({
    key:{
        type:String,
        required:true,
        unique: true
    },
    status:{
        type:Boolean,
        required:true,
    },
    permissions:{
        type: [String],
        required:true,
        enum: ['0000', '1111', '2222']
    },
},{
    timestamps: true,
    collection: COLLECTION_NAME,
});

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, apikeyTokenSchema);