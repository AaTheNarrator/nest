import {Body, Controller, Post, Headers, UseGuards, Req} from '@nestjs/common';
import {CreateRecipeDto} from "./dto/create-recipe.dto";
import {RecipesService} from "./recipes.service";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {Manufacturer} from "../manufacturers/manufacturer.model";
import {Recipe} from "./recipe.model";

@ApiTags('Рецепты')
@Controller('recipes')
export class RecipesController {

    constructor(private recipesService : RecipesService) {
    }

    @ApiOperation({summary:'Создание нового рецепта для производителя'})
    @ApiResponse({status:200, type:Recipe})
    @Roles('MANUFACTURER')
    @UseGuards(JwtAuthGuard)
    @Post()
    createRecipe(@Body() dto : CreateRecipeDto, @Req() req : any){
        return this.recipesService.createRecipe(dto, req.company.login)
    }
}
