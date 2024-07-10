import { Global, Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule } from '@nestjs/config';
import configuration from 'src/configuration/configuration';
import { MesService } from './service/mes.service';
import { OpenApiService } from './service/open-api.service';
import { ErpService } from './service/erp.service';
import { CorepassService } from './service/corepass.service';
import { CodeSearchService } from './service/code-search.service';

const providers = [
  CodeSearchService,
  MesService,
  OpenApiService,
  ErpService,
  CorepassService,
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
