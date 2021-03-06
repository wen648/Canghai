const mongo = require("../mongo/mongo");
const messageCountSchema = require("./message-count-schema");

module.exports = (client) => {
  client.on("message", async (message) => {
    const { author } = message;
    //console.log('AUTHOR:',author)
    const { id } = author;

    await mongo().then(async (mongoose) => {
      try {
        await messageCountSchema
          .findOneAndUpdate(
            {
              _id: id,
            },
            {
              $inc: {
                messageCount: 1,
              },
            },
            {
              upsert: true,
            }
          )
          .exec();
      } finally {
        mongoose.connection.close();
      }
    });
  });
};
