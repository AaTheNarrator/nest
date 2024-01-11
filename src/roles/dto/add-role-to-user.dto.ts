import {ApiProperty} from "@nestjs/swagger";

export class AddRoleToUserDto{
    @ApiProperty({example:'CUSTOMER', description:'Тип роли'})
    readonly role_name : string;
    @ApiProperty({example:'login2', description:'Логин пользователя'})
    readonly login_user : string;
}