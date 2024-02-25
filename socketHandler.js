const Message = require("./models/messageModel");
const Users = require("./models/userModel");
const catchAsync = require("./utils/catchAsync");

exports.addMessage = async (data) => {
  const doc = await Message.findOne({
    $or: [
      { sender: data.user1, receiver: data.user2 },
      { receiver: data.user1, sender: data.user2 },
    ],
  });

  doc.messages.push(data.message);
  await doc.save();
  return doc;
};

exports.addChat = async (data) => {
  const rec = await Users.findOne({ email: data.receiver }).select("+name");
  if (!rec) {
    return {
      status: "fail",
      msg: "User not exists",
      errCode: 404,
    };
  }
  const sen = await Users.findById(data.sender).select("+name");
  // console.log(data.sender);

  const doc = await Message.create({
    sender: data.sender,
    receiver: rec._id,
    names: [sen.name, rec.name],
    messages: [data.message],
  });

  return doc;
};

exports.deleteConversation = (convId) =>
  catchAsync(async () => {
    const doc = await Message.findByIdAndRemove({ _id: convId });
    if (!doc) {
      return {
        status: "error",
        msg: "No document found matching this id",
      };
    }
    return {
      status: "success",
      data: {
        doc,
      },
    };
  });


