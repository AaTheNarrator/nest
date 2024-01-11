import { Injectable } from '@nestjs/common';
import {CreateRoleDto} from "./dto/create-role.dto";
import {InjectModel} from "@nestjs/sequelize";
import {Role} from "./role.model";

@Injectable()
export class RolesService {

    constructor(@InjectModel(Role) private roleRepository: typeof Role) {
    }

    async createRole(dto : CreateRoleDto){
        return await this.roleRepository.create(dto)
    }

    async getRoleByRoleName(role_name: string) {
        return await this.roleRepository.findOne({where:{role_name}})
    }
}
