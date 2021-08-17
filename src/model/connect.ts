import mongoose from "mongoose";
export let connect: typeof mongoose;
async function myCoonect() {
    mongoose.connect(
        'mongodb://mongo:27017/sender',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    ).then((con) => {
        connect = con;
        console.log("connected");
    })
    .catch((e) => console.log("error:", e));
}

export default myCoonect;
