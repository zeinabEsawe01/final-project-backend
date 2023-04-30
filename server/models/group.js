const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const groupSchema = new Schema({
  name: String,
  kind: String,
  members: [],
  places: [{ type: Schema.Types.ObjectId, ref: "place" }],
  voting: [
    {
      placeId: String,
      likes: Number,
      usersVotingNames: [],
    },
  ],
  admin: String
});


const Group = mongoose.model("group", groupSchema);

module.exports = Group;
