import mongoose from "mongoose";
const {Schema} = mongoose
import bcrypt from "bcrypt";


const userSchema = new Schema(
    {
      name: {
        type: String,
        trim: true,
        required: "Name is required",
      },
      email: {
        type: String,
        trim: true,
        required: "Email is required",
        unique: true,
      },
      password: {
        type: String,
        required: true,
        min: 6,
        max: 64,
      },
      stripe_account_id: "",
      stripe_seller: {},
      stripeSession: {},
    },
    { timestamps: true }
  );

  userSchema.pre("save", function (next) {
    let user = this;
    // hash password only if user is changing the password or registering for the first time
    // make sure to use this otherwise each time user.save() is executed, password
    // will get auto updated and you can't login with original password
    if (user.isModified("password")) {
      return bcrypt.hash(user.password, 12, function (err, hash) {
        if (err) {
          console.log("BCRYPT HASH ERR ", err);
          return next(err);
        }
        user.password = hash;
        return next();
      });
    } else {
      return next();
    }
  });

  userSchema.methods.comparePassword = async function(candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword,this.password)
    return isMatch
  }
  

  export default mongoose.model("User", userSchema);