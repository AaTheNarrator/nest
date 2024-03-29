import {forwardRef, Module} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {ManufacturersModule} from "../manufacturers/manufacturers.module";
import {JwtModule} from "@nestjs/jwt";
import * as process from "process";
import { CustomersModule } from 'src/customers/customers.module';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports:[
      forwardRef(() => ManufacturersModule),
      forwardRef(() => CustomersModule),
      JwtModule.register({
        secret: process.env.PRIVATE_KEY || "Secret_key",
        signOptions:{
          expiresIn: "24h"
        }
      })
  ],
    exports:[
        AuthService,
        JwtModule
    ]
})
export class AuthModule {}
