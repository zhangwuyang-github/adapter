import { Global, Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule } from '@nestjs/config';
import configuration from 'src/configuration/configuration';
import { MesService } from './service/mes.service';
import { OpenApiService } from './service/open-api.service';
import { CorepassService } from './service/corepass.service';
import { K3cloudService } from './service/k3cloud.service';
import { K3wiseService } from './service/k3wise.service';

const providers = [
  MesService,
  OpenApiService,
  CorepassService,
  K3cloudService,
  K3wiseService,
];

@Global()
@Module({
  imports: [
    CacheModule.register(),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
  ],
  providers,
  exports: providers,
})
export class ProvidersModule {}
