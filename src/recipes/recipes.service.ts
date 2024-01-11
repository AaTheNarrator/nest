import { Injectable } from '@nestjs/common';
import {CreateRecipeDto} from "./dto/create-recipe.dto";
import {InjectModel} from "@nestjs/sequelize";
import {Recipe} from "./recipe.model";
import {ManufacturersService} from "../manufacturers/manufacturers.service";

@Injectable()
export class RecipesService {

    constructor(@InjectModel(Recipe) private recipeRepository: typeof Recipe,
                private manufacturersService : ManufacturersService) {
    }

    async createRecipe(dto: CreateRecipeDto, login : string) {
        let manufacturer = await this.manufacturersService.searchManufacturerByLogin(login)
        return this.recipeRepository.create({...dto, 'manufacturer_id': manufacturer.manufacturer_id})
    }

    async getRecipeByRecipeName(recipe_name: string){
        return this.recipeRepository.findOne({where:{recipe_name}})
    }
}