import { Inject, Injectable, forwardRef } from '@nestjs/common';
import {CreateRoleDto} from "./dto/create-role.dto";
import {InjectModel} from "@nestjs/sequelize";
import {Role} from "./role.model";
import { AddRoleToUserDto } from './dto/add-role-to-user.dto';
import { ManufacturersService } from '../manufacturers/manufacturers.service';

@Injectable()
export class RolesService {


    constructor(@InjectModel(Role) private roleRepository: typeof Role,
       @Inject(forwardRef(()=> ManufacturersService)) private manufacturersService : ManufacturersService) {
    }

    async createRole(dto : CreateRoleDto){
        return await this.roleRepository.create(dto)
    }

    async getRoleByRoleName(role_name: string) {
        return await this.roleRepository.findOne({where:{role_name}})
    }
    
    async addRoleToUser(dto: AddRoleToUserDto) {
        let manufacturer = await this.manufacturersService.searchManufacturerByLogin(dto.login_user)
        let role = await this.getRoleByRoleName(dto.role_name)
        manufacturer.role_id = role.role_id
        await manufacturer.save()
        manufacturer.role = role
        return manufacturer
    }
}
