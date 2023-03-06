import { ApiProperty, ApiResponseProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Min, IsString } from 'class-validator';
import { IsDate, IsEmail } from 'class-validator';
import { OkResponseDto } from '../responses.dto';

export enum Type {
  SpamNotification = 'SpamNotification',
  HardBounce = 'HardBounce',
}

export class NotificationDto {
  @ApiProperty({ type: String, description: 'Record Type', example: 'Bounce' })
  @IsNotEmpty()
  @IsString()
  RecordType: string;

  @ApiProperty({
    type: String,
    enum: Type,
    description: 'Notification type',
  })
  Type: Type;

  @ApiProperty({ type: Number, description: 'Type Code', example: 1 })
  @IsNumber()
  @Min(0)
  TypeCode: number;

  @ApiProperty({
    type: String,
    description: 'Record Name',
    example: 'Spam notification',
  })
  @IsNotEmpty()
  @IsString()
  Name: string;

  @ApiProperty({ type: String, description: 'Record Tag', example: 'Spam' })
  @IsNotEmpty()
  @IsString()
  Tag: string;

  @ApiProperty({
    type: String,
    description: 'Record Message Stream',
    example: 'outbound',
  })
  @IsNotEmpty()
  @IsString()
  MessageStream: string;

  @ApiProperty({
    type: String,
    description: 'Record Message Description',
    example:
      'The message was delivered, but was either blocked by the user, or classified as spam, bulk mail, or had rejected content.',
  })
  @IsNotEmpty()
  @IsString()
  Description: string;

  @ApiProperty({
    type: String,
    description: 'Record Message to Email',
    example: 'zaphod@example.com',
  })
  @IsNotEmpty()
  @IsEmail()
  Email: string;

  @ApiProperty({
    type: String,
    description: 'Record Message from Email',
    example: 'notifications@honeybadger.io',
  })
  @IsNotEmpty()
  @IsEmail()
  From: string;

  @ApiProperty({
    type: String,
    description: 'Record Message to time',
    example: '2019-11-05T16:33:54.9070259Z',
  })
  @IsNotEmpty()
  @IsDate()
  BouncedAt: string;
}

export class NotificationResponseDto extends PartialType(OkResponseDto) {
  @ApiResponseProperty({ example: 'Notification handles successfully' })
  message: string;

  @ApiResponseProperty({
    example: {
      payoutId: 'pyt_e3f5c6c1-6505-4de7-bd6a-f8172c31de67',
    },
  })
  data: { payoutId: string };
}
