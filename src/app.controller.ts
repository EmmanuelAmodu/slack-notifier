import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { AppService } from './app.service';
import {
  NotificationDto,
  NotificationResponseDto,
} from './dto/notification.dto';
import { HttpResponse } from './http.response';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly response: HttpResponse,
  ) {}

  @Post('alert')
  @ApiOperation({ summary: 'Create Transaction' })
  @ApiCreatedResponse({ type: NotificationResponseDto })
  async sendNotification(@Body() data: NotificationDto, @Res() res: Response) {
    const result = await this.appService.handleNotification(data);

    return this.response.okResponse(
      res,
      'Notification sent successfully',
      result,
    );
  }
}
