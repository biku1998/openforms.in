import { Controller, Get } from '@nestjs/common';

@Controller({
  version: '1',
  path: 'forms',
})
export class FormsController {
  @Get()
  async getForms() {
    return {
      message: 'called /forms',
    };
  }
}
