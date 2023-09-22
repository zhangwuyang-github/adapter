import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './controller/app.controller';
import { AppService } from './service/app.service';
import { CpsService } from './commonService/cps';
import { ErpService } from './commonService/erp';
import { OpenApiService } from './commonService/openApi';
import { LingYuService } from './commonService/lingYu';
import { EasyEasyService } from './commonService/easyEasy';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'src/config/.env',
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    CpsService,
    ErpService,
    OpenApiService,
    LingYuService,
    EasyEasyService,],
})
export class AppModule {}
