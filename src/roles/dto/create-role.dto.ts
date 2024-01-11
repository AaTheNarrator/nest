import {ApiProperty} from "@nestjs/swagger";

export class CreateRoleDto{
    @ApiProperty({example:'CUSTOMER', description:'Тип роли'})
    readonly role_name : string;
    @ApiProperty({example:'Может только: то, то и это', description:'Описание роли'})
    readonly role_description : string;
}