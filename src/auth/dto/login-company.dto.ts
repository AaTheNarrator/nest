import {ApiProperty} from "@nestjs/swagger";

export class LoginCompanyDto{
    @ApiProperty({example:'login1', description:'Логин компании'})
    readonly login : string
    @ApiProperty({example:'password1', description:'Пароль компании'})
    readonly password : string
}