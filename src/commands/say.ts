import * as Discord from 'discord.js';
import * as DB from 'mongodb';
import { type Command } from '../types';
import { Response } from '../exports';

/*SUB_COMMAND	1	
SUB_COMMAND_GROUP	2	
STRING	3	
INTEGER	4	Any integer between -2^53 and 2^53
BOOLEAN	5	
USER	6	
CHANNEL	7	Includes all channel types + categories
ROLE	8	
MENTIONABLE	9	Includes users and roles
NUMBER	10	Any double between -2^53 and 2^53
ATTACHMENT	11*/

const command: Command = {
  slash: {
    name: 'say',
    description: 'just a start command',
    options: [
      {
        name: 'say',
        description: 'words to say',
        type: 3,
        required: true,
      },
    ],
  },
  async execute(bot, f, mongo, args, interaction) {
    const db: DB.Db = mongo.db(interaction.guild!.id);
    try {
      class Say extends Response {
        constructor() {
          super(interaction);
          this.start();
        }

        async start() {
          let description = <string>(
            args.filter((arg) => arg.name === 'say')[0].value
          );
          await this.reply_true(description, { timestamp: new Date() });
        }
      }

      new Say();
    } catch (err) {
      let e = <{ message: string; name: string }>err;
      bot.users.cache
        .get(f.config.owner)
        ?.send(`**ERROR** \`${e.name}\`\n\`${e.message}\``);
      console.error(e);
    }
  },
};

export { command };
