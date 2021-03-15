//#region 導入discord.js
const Discord = require('discord.js')
const client = new Discord.Client()
//#endregion
//#region 指令外加檔導入
const config = require('./config.json')
const command = require('./command')
const firstMessage = require('./first-message') //  :16 頻道訊息
const privateMessage = require('./private-message') // :17
const roleClaim = require('./role-claim') //:18 自動身分組
//#endregion

client.on('ready', () => {
    console.log("成功登入" + client.user.tag)
    //#region 需連接 :5-區塊
    //firstMessage(client, '819820219052458014', '已啟動', ['🔥']) //頻道訊息說[已啟動] 連接 :8
    privateMessage(client, 'pi', 'Pong!') //連接 :9
    //roleClaim(client)  //自動身分組 連接 :10
    //#endregion
    client.user.setActivity("as@幫助 | 製作者:WaDe#6765"); //正在遊玩...
    // client.users.fetch('400275443854344192').then((user) => {user.send('已啟動!!!')}) //發私訊說[已啟動]
    //#region 指令區
    //#region ping,test皆回復[Pong!]
    command(client, ['ping', 'test'], (message) => {
        message.channel.send('Pong!')
    })
    //#endregion
    //#region 成員數量
    command(client, '成員數量', (message) => {
        client.guilds.cache.forEach((guild) => {
            //console.log(guild),
            message.channel.send(
                `${guild.name} 共有 ${guild.memberCount} 位成員`
            )
        })
    })
    //#endregion
    //#region 刪除該頻道所有訊息 (未啟用)
    /*command(client, ['cc', 'clearchannel'], (message) => {  
        if (message.member.hasPermission('ADMINISTRATOR')) {
            message.channel.messages.fetch().then((results) => {
                //console.log(results),
                message.channel.bulkDelete(results)
            })
        }
    })*/
    //#endregion
    //#region 更新bot狀態
    command(client, 'status', (message) => {
        const content = message.content.replace('as@status ', '')
        // "!status hello world" -> "hello world"

        client.user.setPresence({
            activity: {
                name: content,
                type: 0,
            },
        })
    })
    //#endregion
    //#region 創建頻道
    command(client, '創建文字頻道', (message) => {  //創建文字頻道
        const name = message.content.replace('as@創建文字頻道 ', '')

        message.guild.channels
            .create(name, {
                type: 'text',
            })
            .then((channel) => {
                //console.log(channel)
                const categoryId = '813290604985319464'
                channel.setParent(categoryId)
            })
    })
    command(client, '創建語音頻道', (message) => {  //創建語音頻道
        const name = message.content.replace('as@創建語音頻道 ', '')

        message.guild.channels
            .create(name, {
                type: 'voice',
            })
            .then((channel) => {
                const categoryId = '813290604985319464'
                channel.setParent(categoryId)
                channel.setUserLimit(10)
            })
    })
    //#endregion
    //#region 普通embed
    command(client, 'embed', (message) => {
        const logo =
            'https://images-ext-1.discordapp.net/external/Rn2yYpEmFgSjGxvNOwrHO4DUr_PvOH0lVqp6QTP_qMg/https/i.imgur.com/zbXslRQ.png'
        const embed = new Discord.MessageEmbed()
            .setTitle('Example text embed')
            .setURL('https://www.youtube.com/channel/UCbV4xu5u33k_fN8HPLfPnsQ')
            .setAuthor(message.author.username)
            .setImage(logo)
            .setThumbnail(logo)
            .setFooter('This is a footer')
            .setColor('#66f5fd')
            .setTimestamp()
            .addFields(
                {
                    name: 'Field 1',
                    value: 'Hello world',
                    inline: true,
                },
                {
                    name: 'Field 2',
                    value: 'Hello world',
                    inline: true,
                },
                {
                    name: 'Field 3',
                    value: 'Hello world',
                    inline: true,
                },
                {
                    name: 'Field 4',
                    value: 'Hello world',
                }
            )
        message.channel.send(embed)
    })
    //#endregion
    //#region 伺服器信息
    command(client, '伺服器信息', (message) => {
        const { guild } = message

        const { name, region, memberCount, owner, id, createdAt, verificationLevel, } = guild
        const icon = guild.iconURL()

        const embed = new Discord.MessageEmbed()
            .setTitle(`${name}－ 伺服器信息`)
            .setThumbnail(icon)
            .setColor('#66f5fd')
            .setTimestamp()
            .addFields(
                {
                    name: '地區',
                    value: region,
                    inline: true,
                }, {
                name: '總人數',
                value: memberCount,
                inline: true,
            }, {
                name: '群主',
                value: owner.user.tag,
                inline: true,
            }, {
                name: '伺服器id',
                value: id,
                inline: true,
            }, {
                name: '創建時間',
                value: createdAt,
                inline: true,
            }, {
                name: '驗證等級',
                value: verificationLevel,
                inline: true,
            }
            )

        message.channel.send(embed)
    })
    //#endregion
    //#region 幫助
    command(client, '幫助', (message) => {
        const embed = new Discord.MessageEmbed()
            .setColor('#66f5fd')
            .setTitle('插件指令')
            .setTimestamp()
            .setThumbnail('https://ppt.cc/fLWcMx')
            .addFields(
                {
                    name: '前綴',
                    value: 'as@',
                },
                {
                    name: 'ping,test',
                    value: 'pong',
                    inline: true,
                },
                {
                    name: 'as@成員數量',
                    value: '該群成員數量',
                    inline: true,
                }, {
                name: 'as@伺服器信息',
                value: '該群伺服器信息',
                inline: true,
            }
            )
            .setDescription('**會持續增加**')
        message.channel.send(embed)
    })
    //#endregion
    //#region 封鎖
    command(client, 'ban', (message) => {
        const { member, mentions } = message

        const tag = `<@${member.id}>`

        if (
            member.hasPermission('ADMINISTRATOR') ||
            member.hasPermission('BAN_MEMBERS')
        ) {
            const target = mentions.users.first()
            console.log(target)
            if (target) {
                const targetMember = message.guild.members.cache.get(target.id)
                targetMember.ban()
                message.channel.send(`${tag},已把${target}列入封鎖名單`)
            } else {
                message.channel.send(`${tag} 請指定要封鎖的人`)
            }
        }
        else {
            message.channel.send(`${tag} 沒有權限使用該功能.`)
        }
    })
    //#endregion
    //#region 踢人
    command(client, 'kick', (message) => {
        const { member, mentions } = message

        const tag = `<@${member.id}>`

        if (
            member.hasPermission('ADMINISTRATOR') ||
            member.hasPermission('KICK_MEMBERS')
        ) {
            const target = mentions.users.first()
            if (target) {
                const targetMember = message.guild.members.cache.get(target.id)
                targetMember.kick()
                message.channel.send(`${tag},已把${target}剔除該伺服器`)
            } else {
                message.channel.send(`${tag} 請指定要踢除的人`)
            }
        }
        else {
            message.channel.send(`${tag} 沒有權限使用該功能.`)
        }
    })
    //#endregion
    //#endregion
})

//#region key
client.login(config.token)
//#endregion