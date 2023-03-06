import { HttpStatus } from '@nestjs/common';
import { ApiResponseProperty } from '@nestjs/swagger';

export class CreatedResponseDto {
  @ApiResponseProperty({
    example: true,
  })
  success: boolean;
  @ApiResponseProperty({
    example: 201,
  })
  statusCode: number;

  @ApiResponseProperty()
  message: string;
}

export class OkResponseDto {
  @ApiResponseProperty({
    example: true,
  })
  success: boolean;
  @ApiResponseProperty({
    example: 200,
  })
  statusCode: number;
  @ApiResponseProperty()
  message: string;
}

export class BadRequestResponseDto {
  @ApiResponseProperty({
    example: false,
  })
  success: boolean;
  @ApiResponseProperty({
    example: 400,
  })
  statusCode: number;
  @ApiResponseProperty()
  message: string;
  @ApiResponseProperty({ example: new Date() })
  timestamp: Date;
}

export class NotFoundResponseDto {
  @ApiResponseProperty({
    example: false,
  })
  success: boolean;
  @ApiResponseProperty({
    example: HttpStatus.NOT_FOUND,
  })
  statusCode: number;
  @ApiResponseProperty()
  message: string;
  @ApiResponseProperty({ example: new Date() })
  timestamp: Date;
}

export class ServerErrorResponseDto {
  @ApiResponseProperty({
    example: false,
  })
  success: boolean;
  @ApiResponseProperty({
    example: 500,
  })
  statusCode: number;
  @ApiResponseProperty()
  message: string;
  @ApiResponseProperty({ example: new Date() })
  timestamp: Date;
}

export class UnAuthorizedResponseDto {
  @ApiResponseProperty({
    example: false,
  })
  success: boolean;
  @ApiResponseProperty({
    example: 401,
  })
  statusCode: number;
  @ApiResponseProperty()
  message: string;
  @ApiResponseProperty({ example: new Date() })
  timestamp: Date;
}
