import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { NotificationDto } from './dto/notification.dto';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  async handleNotification(data: NotificationDto) {
    let response = null;
    if (data.Type === 'SpamNotification') {
      response = await this.sendSlackNotification(data);
    }

    return response;
  }

  private async sendSlackNotification(data: NotificationDto) {
    const slackRequestObservable = this.httpService.post(
      'https://hooks.slack.com/services/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',
      {
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: `:octagonal_sign: ${data.Name}`,
            },
          },
          {
            type: 'divider',
          },
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: `:email: Details`,
            },
          },
          {
            type: 'section',
            fields: [
              {
                type: 'mrkdwn',
                text: `*Email From:*\n${data.From || 'N/A'}`,
              },
              {
                type: 'mrkdwn',
                text: `*Email to:*\n${data.Email || 'N/A'}`,
              },
            ],
          },
          {
            type: 'section',
            fields: [
              {
                type: 'mrkdwn',
                text: `*Time:*\n${data.BouncedAt || 'N/A'}`,
              },
              {
                type: 'mrkdwn',
                text: `*Tags:*\n${data.Tag || 'N/A'}`,
              },
            ],
          },
          {
            type: 'divider',
          },
          {
            type: 'section',
            text: {
              type: 'plain_text',
              text: data.Description || 'N/A',
            },
          },
        ],
      },
    );

    try {
      const slackRes = await lastValueFrom(slackRequestObservable);
      return slackRes.data;
    } catch (error) {
      console.log(error);
    }
  }
}
