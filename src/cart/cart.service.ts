import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CustomersService } from '../customers/customers.service';
import { RecipesService } from '../recipes/recipes.service';
import { AddItemToCartDto } from './dto/create-new-item-in-cart.dto';
import { Cart } from './cart.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class CartService {
    constructor(
        @InjectModel(Cart) private cartRepository : typeof Cart,
        @Inject(forwardRef(()=> CustomersService)) private customersService : CustomersService,
        @Inject(forwardRef(()=> RecipesService)) private recipesService : RecipesService){}


    async addProductToCart(dto : AddItemToCartDto, login : string){
        let customer = await this.customersService.searchCustomerByLogin(login)
        let recipe = await this.recipesService.getRecipeByRecipeName(dto.product_name)
        let newObj = {
            customer_id : customer.customer_id,
            recipe_id : recipe.recipe_id,
            amount : dto.amount
        }
        return await this.cartRepository.create(newObj)
    }

    async getCartByLogin(login : string){
        let customer = await this.customersService.searchCustomerByLogin(login)
        return await this.cartRepository.findAll({where:{customer_id : customer.customer_id},include:{all:true}})
    }

    async deleteFromCart(delete_id : number){
        return await this.cartRepository.destroy({where:{cart_id : delete_id}})
    }
}
