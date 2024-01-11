import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {RolesService} from "./roles.service";
import {CreateRoleDto} from "./dto/create-role.dto";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Manufacturer} from "../manufacturers/manufacturer.model";
import {Role} from "./role.model";
import { AddRoleToUserDto } from './dto/add-role-to-user.dto';

@ApiTags('Роли')
@Controller('roles')
export class RolesController {

    constructor(private rolesService : RolesService) {
    }

    @ApiOperation({summary:'Создание роли'})
    @ApiResponse({status:200, type:Role})
    @Post()
    createRole(@Body() dto : CreateRoleDto){
        return this.rolesService.createRole(dto)
    }

    @ApiOperation({summary:'Информация о роли по ее названию'})
    @ApiResponse({status:200, type:Role})
    @Get('/:role_name')
    getRoleByRoleName(@Param('role_name') role_name : string){
        return this.rolesService.getRoleByRoleName(role_name)
    }

    @ApiOperation({summary:'Добавить роль пользователю'})
    @ApiResponse({status:200, type:Manufacturer})
    @Post('/addRoleToUser')
    addRoleToUser(@Body() dto: AddRoleToUserDto){
        return this.rolesService.addRoleToUser(dto)
    }
}
