import {ApiProperty} from "@nestjs/swagger";

export class CreateCompanyDto {
    @ApiProperty({example:'ООО "Люди любят квас"', description:'Название компании'})
    readonly company_name : string
    @ApiProperty({example:'934589743', description:'ИНН компании'})
    readonly inn : string
    @ApiProperty({example:'PeopleLoveAKvas', description:'Логин производителя'})
    readonly login : string
    @ApiProperty({example:'password123', description:'Пароль производителя'})
    readonly password : string
}