import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpResponse } from './http.response';

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [AppService, HttpResponse],
})
export class AppModule {}
