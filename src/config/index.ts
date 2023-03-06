import * as path from 'node:path';
import * as dotenv from 'dotenv';

dotenv.config({
  path: path.resolve(process.cwd(), './.env'),
});

export default {
  port: +process.env.PORT,
  slackWebhookUrl: +process.env.SLACK_WEBHOOK_URL,
};
