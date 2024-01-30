import {Body, Controller, Post} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {LoginCompanyDto} from "./dto/login-company.dto";
import {CreateCompanyDto} from "../manufacturers/dto/create-company.dto";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Recipe} from "../recipes/recipe.model";

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {

    constructor( private authService : AuthService) {
    }

    @ApiOperation({summary:'Вход для производителя'})
    @ApiResponse({status:200, type: String, description: 'JWT Token'})
    @Post('login/manufacturer')
    loginManufacturer(@Body() dto : LoginCompanyDto){
        return this.authService.loginManufacturer(dto)
    }

    @ApiOperation({summary:'Регистрация для производителя'})
    @ApiResponse({status:200, type: String, description: 'JWT Token'})
    @Post('registration/manufacturer')
    registrationManufacturer(@Body() dto : CreateCompanyDto){
        return this.authService.registrationManufacturer(dto)
    }


    @ApiOperation({summary:'Вход для заказчика'})
    @ApiResponse({status:200, type: String, description: 'JWT Token'})
    @Post('login/customer')
    loginCustomer(@Body() dto : LoginCompanyDto){
        return this.authService.loginCustomer(dto)
    }

    @ApiOperation({summary:'Регистрация для заказчика'})
    @ApiResponse({status:200, type: String, description: 'JWT Token'})
    @Post('registration/customer')
    registrationCustomer(@Body() dto : CreateCompanyDto){
        return this.authService.registrationCustomer(dto)
    }
}
