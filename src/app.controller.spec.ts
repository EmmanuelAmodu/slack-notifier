import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificationDto, Type } from './dto/notification.dto';
import { HttpResponse } from './http.response';

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

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;
  let response: HttpResponse;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [AppController],
      providers: [AppService, HttpResponse],
    }).compile();

    appController = module.get<AppController>(AppController);
    appService = module.get<AppService>(AppService);
    response = module.get<HttpResponse>(HttpResponse);
  });

  describe('AppController', () => {
    it('should return "Ok"', () => {
      appService.handleNotification = jest.fn().mockResolvedValue('ok');
      response.okResponse = jest.fn();
      appController.sendNotification(data, {} as any);

      expect(appService.handleNotification).toHaveBeenCalledWith(data);
      // expect(response.okResponse).toHaveBeenCalledWith(
      //   null,
      //   'Notification sent successfully',
      //   'ok',
      // );
    });
  });
});
