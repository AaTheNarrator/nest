import { Injectable, NotFoundException } from '@nestjs/common';
import {CreateRecipeDto} from "./dto/create-recipe.dto";
import {InjectModel} from "@nestjs/sequelize";
import {Recipe} from "./recipes.model";
import {ManufacturersService} from "../manufacturers/manufacturers.service";
import { Manufacturer } from 'src/manufacturers/manufacturer.model';


@Injectable()
export class RecipesService {

    constructor(@InjectModel(Recipe) private recipeRepository: typeof Recipe,
                private manufacturersService : ManufacturersService) {
    }

    async createRecipe(dto: CreateRecipeDto, login : string) {
        let manufacturer = await this.manufacturersService.searchManufacturerByLogin(login)
        return await this.recipeRepository.create({...dto, 'manufacturer_id': manufacturer.manufacturer_id})
    }

    async getRecipeByRecipeName(recipe_name: string){
        return await this.recipeRepository.findOne({where:{recipe_name}})
    }

    async changeDataInRecipe( newData: any) {
        const recipe = await this.recipeRepository.findByPk(newData.recipe_id)
        
        await recipe.update(newData);
        return recipe;
    }

    async getRecipeByManufacturer(login : string){
        let manufacturer = await this.manufacturersService.searchManufacturerByLogin(login)
        return await this.recipeRepository.findAll(
            {
                where : {
                    manufacturer_id: manufacturer.manufacturer_id
                },
                include: {
                    all:true
                }
            }
        )
    }

    async getAllRecipe(){
        const recipes = await this.recipeRepository.findAll(
            {
                include: [Manufacturer]
            }
        )
        for (let i = 0; i < recipes.length; i++){
            //let id = recipes[i]["recipe_id"]
            recipes[i].dataValues["price"] = i
        }
        return recipes
    }

    async getPrice(): Promise<any[]> {
        const query = `
        with price as (
            select rp.recipe_id, round((sum(amount_product * unit_price) * 1.3) / 100) * 100 as sum_price
            from recipes_products as rp
            left join products as p on rp.product_id = p.product_id
            group by rp.recipe_id
        )
        select r.recipe_id, p.sum_price 
        from recipes as r 
        left join price as p on p.recipe_id = r.recipe_id
        where p.sum_price is not null;
        `;

        const result = await this.recipeRepository.sequelize?.query(query, {
            type: 'SELECT',
        });

        return result;
    }
}
