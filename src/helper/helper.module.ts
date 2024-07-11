import { Global, Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule } from '@nestjs/config';
import configuration from 'src/configuration/configuration';
import { ProvidersModule } from 'src/providers/providers.module';
import { CodeSearchService } from './service/code-search.service';

const providers = [
  CodeSearchService,
];

@Global()
@Module({
  imports: [
    CacheModule.register({
        isGlobal: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    ProvidersModule,
  ],
  providers,
  exports: providers,
})
export class HelperModule {}
