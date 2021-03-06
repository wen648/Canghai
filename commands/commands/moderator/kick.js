module.exports = {
  commands: ["kick", "踢除", "k"],
  expectedArgs: "<name>",
  permissionError: "您需要管理員權限才能運行此命令",
  minArgs: 1,
  maxArgs: 1,
  description: "踢除該使用者(Kick this user)(使用as@踢除也可以)",
  callback: (message) => {
    const { member, mentions } = message;

    const tag = `<@${member.id}>`;

    const target = mentions.users.first();
    if (target) {
      const targetMember = message.guild.members.cache.get(target.id);
      if (!targetMember.kickable)
        return message.channel.send("This user is unkickable").then((msg) => {
          msg.delete({ timeout: 5000 });
        });
      if (!target) {
        message.channel.send(`${tag} 請指定要踢除的人`);
      } else {
        targetMember.kick();
        message.channel.send(`${tag},已把${target}剔除該伺服器`);
      }
    }
  },
  permissions: ["ADMINISTRATOR", "KICK_MEMBERS"],
};
