import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `<div>
      <h1>API Documentation: <a target="_blank" href='/api-doc'>/api-doc</a>
    </div>`;
  }
}
