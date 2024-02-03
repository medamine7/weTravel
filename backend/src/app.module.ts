/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TravelsModule } from './travels/travels.module';
import { ToursModule } from './tours/tours.module';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JWTAuthGuard } from './auth/guards/jwt-auth.guard';
import { RolesGuard } from './auth/guards/roles.guard';
import { TravelsController } from './travels/travels.controller';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('MONGODB_URI'),
        connectionFactory: (connection) => {
          connection.plugin((Schema) => {
            Schema.virtual('id').get(function () {
              return this._id.toHexString();
            });

            Schema.set('toJSON', {
              virtuals: true,
            });
          });
          return connection;
        },
      }),
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: () => {
        return {
          autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
          formatError: (error) => {
            const originalError = error.extensions?.originalError as Error;

            if (!originalError) {
              return {
                message: error.message,
                code: error.extensions?.code,
              };
            }

            return {
              message: originalError.message,
              code: error.extensions?.code,
            };
          },
        };
      },
    }),
    TravelsModule,
    ToursModule,
    UsersModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JWTAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  controllers: [AppController, TravelsController],
})
export class AppModule {}
