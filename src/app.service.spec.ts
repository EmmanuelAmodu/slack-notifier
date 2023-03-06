import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { NotificationDto, Type } from './dto/notification.dto';

const data: NotificationDto = {
  RecordType: 'Bounce',
  Type: Type.SpamNotification,
  TypeCode: 1,
  Name: 'Spam notification',
  Tag: 'Spam',
  MessageStream: 'outbound',
  Description:
    'The message was delivered, but was either blocked by the user, or classified as spam, bulk mail, or had rejected content.',
  Email: 'zaphod@example.com',
  From: 'notifications@honeybadger.io',
  BouncedAt: '2019-11-05T16:33:54.9070259Z',
};

describe('AppService', () => {
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [AppService],
    }).compile();

    appService = app.get<AppService>(AppService);
  });

  describe('should call slack method', () => {
    it(`should call the sendSlackNotification method for ${Type.SpamNotification} message`, () => {
      appService['sendSlackNotification'] = jest.fn().mockResolvedValue('ok');
      appService.handleNotification(data);
      expect(appService['sendSlackNotification']).toHaveBeenCalledWith(data);
    });

    it('should call the not call sendSlackNotification method for non ${Type.SpamNotification} message', () => {
      appService['sendSlackNotification'] = jest.fn().mockResolvedValue('ok');

      data.Type = Type.HardBounce;
      appService.handleNotification(data);
      expect(appService['sendSlackNotification']).toHaveBeenCalledTimes(0);
    });
  });
});
