import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {ManufacturersService} from "../manufacturers/manufacturers.service";
import {LoginCompanyDto} from "./dto/login-company.dto";
import {CreateCompanyDto} from "../manufacturers/dto/create-company.dto";
import { JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs'
import {Manufacturer} from "../manufacturers/manufacturer.model";

@Injectable()
export class AuthService {

    constructor(private manufacturersService : ManufacturersService,
                private jwtService : JwtService) {
    }

    async loginManufacturer(dto : LoginCompanyDto){
        const manufacturer = await this.validateManufacturer(dto)
        return this.generateToken(manufacturer)
    }

    async registrationManufacturer(dto : CreateCompanyDto){
        const candidate = await this.manufacturersService.searchManufacturerByLogin(dto.login)
        if (candidate){
            throw new HttpException('Пользователь уже существует', HttpStatus.BAD_REQUEST)
        }

        const hasPassword = await bcrypt.hash(dto.password, 5)
        const manufacturer = await this.manufacturersService.createManufacturer({...dto, password: hasPassword})
        return this.generateToken(manufacturer)
    }

    private async generateToken(company : Manufacturer) {
        const payLoad = {
            login : company.login,
            role : company.role
        }
        return {
            token: this.jwtService.sign(payLoad)
        }
    }

    private async validateManufacturer(dto: LoginCompanyDto) {
        const manufacturer = await this.manufacturersService.searchManufacturerByLogin(dto.login)
        const passwordEquals = await bcrypt.compare(dto.password, manufacturer.password)
        if(manufacturer && passwordEquals){
            return manufacturer
        }
        throw new UnauthorizedException({message:'Некоректный логин или пароль'})
    }
}
