const mongoose = require("mongoose");
var slug = require("mongoose-slug-generator");
var mongooseDelete = require("mongoose-delete");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const Schema = mongoose.Schema;
const CourseSchema= new Schema(
  {
    _id:{type : Number,},
    name: { type: String, require: true },
    description: { type: String },
    image: { type: String },
    videoID: { type: String, require: true },
    level: { type: String },
    slug: { type: String, slug: "name", unique: true },
  },
  {
    _id: false,
    timestamps: true,
  }
);

//custom query helper
CourseSchema.query.sortable= function(req){
  if(req.query.hasOwnProperty('_sort')){
  const isValidtype =['asc', 'desc'].includes(req.query.type);
   return this.sort({
     [req.query.column]: isValidtype ? req.query.type: 'desc',
   })
 }
 return this;
}
//add plugin
mongoose.plugin(slug);

CourseSchema.plugin(AutoIncrement);
CourseSchema.plugin(mongooseDelete, { deletedAt: true, overrideMethods: "all" });
module.exports = mongoose.model("Course", CourseSchema);
