import { toSnakeCase } from '@/lib/utils';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const name = decodeURIComponent(searchParams.get('name') || '');

  const menu = {
    grilled_chicken_breast: {
      category: 'Main Course',
      description: 'Tender grilled chicken breast served with a side of vegetables',
      image: '/images/GrilledChickenBreast.jpg',
      ingredients: ['Chicken breast', 'Olive oil', 'Garlic', 'Lemon', 'Rosemary'],
      allergens: ['None'],
      chefs_description:
        'Juicy and perfectly grilled chicken breast, seasoned with aromatic rosemary and garlic, served alongside a fresh vegetable medley.',
      dietaryInfo: ['Halal', 'Gluten-free'],
    },
    seasonal_fresh_fruits: {
      category: 'Before Landing',
      description: 'A variety of fresh seasonal fruits',
      image: '/images/Fruits.jpg',
      ingredients: ['Apple', 'Banana', 'Orange', 'Pineapple', 'Grapes'],
      allergens: [],
      chefs_description:
        'A selection of the freshest seasonal fruits, perfect for a light and refreshing snack before landing.',
      dietaryInfo: ['Halal', 'Vegan', 'Gluten-free'],
    },
    vegetable_salad_with_marinated_shrimp: {
      category: 'Starters',
      description: 'A fresh vegetable salad paired with marinated shrimp',
      image: '/images/VegetableSaladWithMarinatedShrimp.jpg',
      ingredients: [
        'Shrimp',
        'Lettuce',
        'Tomato',
        'Cucumber',
        'Red onion',
        'Olive oil',
        'Lemon juice',
      ],
      allergens: ['Shellfish'],
      chefs_description:
        'A refreshing salad with tender marinated shrimp, complemented by fresh vegetables, topped with a light lemon dressing.',
      dietaryInfo: ['Halal', 'Gluten-free'],
    },
    moutabel: {
      category: 'Starters',
      description: 'A creamy, smoky dip made from roasted eggplant',
      image: '/images/Moutabel.jpg',
      ingredients: ['Eggplant', 'Tahini', 'Garlic', 'Lemon juice', 'Olive oil', 'Cumin'],
      allergens: ['Sesame'],
      chefs_description:
        'A rich and smoky eggplant dip, blended with tahini, garlic, and lemon juice for a perfect balance of flavors.',
      dietaryInfo: ['Halal', 'Vegetarian', 'Vegan'],
    },
    penne_with_tomato_sauce: {
      category: 'Main Course',
      description:
        'Penne pasta in a rich tomato sauce with fried eggplants, cherry tomatoes, and olives',
      image: '/images/PenneWithTomatoSauce.jpg',
      ingredients: ['Penne', 'Tomato sauce', 'Eggplants', 'Cherry tomatoes', 'Olives'],
      allergens: ['Gluten'],
      chefs_description:
        'Delicious penne pasta smothered in a tangy tomato sauce, with fried eggplants, juicy cherry tomatoes, and briny olives.',
      dietaryInfo: ['Halal', 'Vegetarian'],
    },
    basa_fish_with_vegetables: {
      category: 'Main Course',
      description: 'Basa fish fillet served with a side of mixed vegetables',
      image: '/images/BasaFishWithVegetables.jpg',
      ingredients: ['Basa fish', 'Carrots', 'Broccoli', 'Bell peppers', 'Lemon', 'Olive oil'],
      allergens: ['Fish'],
      chefs_description:
        'Tender basa fish fillet served with a vibrant selection of seasonal vegetables, lightly seasoned and grilled.',
      dietaryInfo: ['Halal', 'Gluten-free'],
    },
    mango_mousse: {
      category: 'Dessert',
      description: 'A light and creamy mango mousse topped with fresh fruit',
      image: '/images/MangoMousse.jpg',
      ingredients: ['Mango', 'Whipped cream', 'Sugar', 'Gelatin'],
      allergens: ['Dairy'],
      chefs_description:
        'A refreshing and smooth mousse made with ripe mangoes, whipped cream, and a touch of sweetness.',
      dietaryInfo: ['Halal', 'Vegetarian'],
    },
    seasonal_fresh_fruit: {
      category: 'Fruit',
      description: 'A variety of fresh seasonal fruits',
      image: '/images/Placeholder.jpg',
      ingredients: ['Apple', 'Banana', 'Orange', 'Pineapple', 'Grapes'],
      allergens: [],
      chefs_description:
        'A selection of the freshest seasonal fruits, perfect for a light and refreshing snack before landing.',
      dietaryInfo: ['Halal', 'Vegan', 'Gluten-free'],
    },
    assorted_cheese: {
      category: 'Cheese Selection',
      description: 'A platter of assorted cheeses',
      image: '/images/Placeholder.jpg',
      ingredients: ['Cheddar', 'Brie', 'Gouda', 'Blue cheese'],
      allergens: ['Dairy'],
      chefs_description:
        'An assortment of rich and flavorful cheeses, perfect for those who enjoy a savory bite before landing.',
      dietaryInfo: ['Halal', 'Vegetarian'],
    },
    scrambled_eggs: {
      category: 'Breakfast',
      description: 'Fluffy scrambled eggs served with a garnish of herbs',
      image: '/images/Placeholder.jpg',
      ingredients: ['Eggs', 'Butter', 'Salt', 'Pepper'],
      allergens: ['Eggs', 'Dairy'],
      chefs_description:
        'Soft and fluffy scrambled eggs, seasoned with just the right amount of salt and pepper, served with a garnish of fresh herbs.',
      dietaryInfo: ['Halal'],
    },
    pickled_cucumber: {
      category: 'Snacks',
      description: 'Crisp and tangy pickled cucumber slices',
      image: '/images/Placeholder.jpg',
      ingredients: ['Cucumber', 'Vinegar', 'Sugar', 'Salt', 'Garlic'],
      allergens: [],
      chefs_description:
        'Tangy, crunchy pickled cucumbers that offer a refreshing bite and a burst of flavor.',
      dietaryInfo: ['Halal', 'Vegan', 'Gluten-free'],
    },
    congee_with_chicken: {
      category: 'Snacks',
      description: 'A warm and comforting rice porridge with tender chicken',
      image: '/images/Placeholder.jpg',
      ingredients: ['Rice', 'Chicken', 'Ginger', 'Garlic', 'Spring onion', 'Soy sauce'],
      allergens: ['Soy'],
      chefs_description:
        'A nourishing bowl of congee, featuring tender chicken, fragrant ginger, and a savory soy-based broth.',
      dietaryInfo: ['Halal', 'Gluten-free'],
    },
    marinated_prawns_and_grilled_vegetables: {
      category: 'Starters',
      description: 'Prawns marinated and grilled with a selection of fresh vegetables',
      image: '/images/MarinatedShrimpAndVegetableSalad.jpg',
      ingredients: ['Prawns', 'Assorted vegetables'],
      allergens: ['Shellfish'],
      chefs_description:
        'Juicy prawns marinated in aromatic herbs and spices, grilled to perfection alongside a vibrant mix of vegetables.',
      dietaryInfo: ['Halal', 'Gluten-free'],
    },
    best_of_mezze: {
      category: 'Starters',
      description: 'A selection of traditional mezze dishes',
      image: '/images/BestOfMezze.jpg',
      ingredients: ['Hummus', 'Tabbouleh', 'Baba Ganoush'],
      allergens: [],
      chefs_description:
        'A delightful assortment of Middle Eastern appetizers, featuring classics like hummus, tabbouleh, and baba ganoush.',
      dietaryInfo: ['Halal', 'Vegetarian', 'Gluten-free available'],
    },
    creamy_zucchini_soup: {
      category: 'Soups',
      description: 'Smooth and velvety zucchini soup',
      image: '/images/CreamyZucchiniSoup.jpg',
      ingredients: ['Zucchini', 'Cream', 'Vegetable stock', 'Onions', 'Garlic', 'Herbs'],
      allergens: ['Dairy'],
      chefs_description:
        'A silky smooth soup showcasing the delicate flavor of summer zucchini, enhanced with fresh herbs and finished with a touch of cream.',
      dietaryInfo: ['Vegetarian', 'Gluten-free', 'Low-carb', 'Kosher', 'Halal'],
    },
    grilled_cod_fish: {
      category: 'Main Course',
      description: 'Grilled cod served with Château potatoes and Tuscany style vegetables',
      image: '/images/GrilledCodFish.jpg',
      ingredients: ['Cod fish', 'Potatoes', 'Vegetables'],
      allergens: ['Fish'],
      chefs_description:
        'Perfectly grilled cod paired with Château-style potatoes and a medley of Tuscan vegetables, bringing a taste of Italy to your plate.',
      dietaryInfo: ['Halal', 'Gluten-free'],
    },
    stir_fried_beef_with_bbq: {
      category: 'Main Course',
      description: 'Beef stir-fried with BBQ sauce, served with sautéed spinach and steamed rice',
      image: '/images/StirFriedBeefWithBBQ.jpg',
      ingredients: ['Beef', 'BBQ sauce', 'Spinach', 'Rice'],
      allergens: ['Gluten'],
      chefs_description:
        'Tender beef strips stir-fried in a rich BBQ sauce, accompanied by lightly sautéed spinach and fluffy steamed rice.',
      dietaryInfo: ['Halal'],
    },
    rigatoni_with_parmesan_tomato_sauce: {
      category: 'Main Course',
      description: 'Rigatoni pasta in a parmesan tomato sauce with fried eggplant and zucchini',
      image: '/images/RigatoniWithParmesanTomatoSauce.jpg',
      ingredients: ['Rigatoni', 'Parmesan', 'Tomato sauce', 'Eggplant', 'Zucchini'],
      allergens: ['Gluten', 'Dairy'],
      chefs_description:
        'Al dente rigatoni tossed in a savory tomato sauce enriched with parmesan, topped with golden fried eggplant and zucchini.',
      dietaryInfo: ['Halal', 'Vegetarian'],
    },
    potpourri_of_traditional_turkish_desserts: {
      category: 'Desserts',
      description: 'Selection of traditional Turkish desserts',
      image: '/images/PotpourriOfTraditionalTurkishDesserts.jpg',
      ingredients: [
        'Various traditional Turkish desserts',
        'Honey',
        'Nuts',
        'Phyllo dough',
        'Dairy products',
      ],
      allergens: ['Nuts', 'Dairy', 'Gluten'],
      chefs_description:
        'A carefully curated selection of authentic Turkish desserts, showcasing the rich culinary heritage of Turkish cuisine.',
      dietaryInfo: ['Vegetarian', 'Halal'],
    },
    chocolate_cake: {
      category: 'Desserts',
      description: 'Rich and moist chocolate cake',
      image: '/images/ChocolateCake.jpg',
      ingredients: ['Chocolate', 'Flour', 'Sugar', 'Eggs', 'Butter'],
      allergens: ['Gluten', 'Dairy', 'Eggs'],
      chefs_description:
        'Decadent chocolate cake, baked to perfection, offering a rich and indulgent chocolate experience.',
      dietaryInfo: ['Halal', 'Vegetarian'],
    },
    apricot_caramel_cake: {
      category: 'Desserts',
      description: 'Moist cake with apricot pieces and caramel, served with vanilla sauce',
      image: '/images/Placeholder.jpg',
      ingredients: ['Apricot', 'Caramel', 'Flour', 'Sugar', 'Eggs', 'Butter', 'Vanilla'],
      allergens: ['Gluten', 'Dairy', 'Eggs'],
      chefs_description:
        'A delightful blend of sweet apricots and rich caramel, this cake is topped with a smooth vanilla sauce for an extra layer of flavor.',
      dietaryInfo: ['Halal', 'Vegetarian'],
    },
    selection_of_cheese: {
      category: 'Cheese Course',
      description: 'Curated selection of fine cheeses',
      image: '/images/Placeholder.jpg',
      ingredients: ['Various cheeses', 'Accompaniments', 'Crackers', 'Dried fruits'],
      allergens: ['Dairy', 'May contain nuts'],
      chefs_description:
        'A carefully selected assortment of artisanal cheeses, served with appropriate accompaniments.',
      dietaryInfo: ['Vegetarian', 'Gluten-free available', 'Halal'],
    },
    fresh_fruit_salad: {
      category: 'Desserts',
      description: 'Selection of fresh seasonal fruits',
      image: '/images/Placeholder.jpg',
      ingredients: ['Seasonal fresh fruits', 'Light syrup'],
      allergens: [],
      chefs_description:
        'A refreshing combination of hand-selected seasonal fruits, perfectly ripened and delicately prepared.',
      dietaryInfo: [
        'Vegetarian',
        'Vegan',
        'Gluten-free',
        'Dairy-free',
        'Halal',
        'Kosher',
        'Low-calorie',
      ],
    },
    nicoise_salad: {
      category: 'Starters',
      description: 'Classic French salad with a variety of fresh ingredients',
      image: '/images/Placeholder.jpg',
      ingredients: [
        'Tuna',
        'Green beans',
        'Eggs',
        'Olives',
        'Anchovies',
        'Tomatoes',
        'Vinaigrette',
      ],
      allergens: ['Fish', 'Eggs'],
      chefs_description:
        'A traditional Nicoise salad, combining crisp vegetables with protein-rich tuna and eggs, dressed in a light vinaigrette.',
      dietaryInfo: ['Halal', 'Gluten-free'],
    },
    mozzarella_and_grilled_vegetables: {
      category: 'Starters',
      description: 'Fresh mozzarella paired with a selection of grilled vegetables',
      image: '/images/Placeholder.jpg',
      ingredients: ['Mozzarella', 'Zucchini', 'Bell peppers', 'Eggplant'],
      allergens: ['Dairy'],
      chefs_description:
        'Soft, creamy mozzarella served with a colorful assortment of freshly grilled vegetables, drizzled with olive oil.',
      dietaryInfo: ['Halal', 'Vegetarian', 'Gluten-free'],
    },
    grilled_fillet_of_morina: {
      category: 'Main Course',
      description:
        'Grilled morina fillet served with sautéed spinach and roasted potatoes, lemon butter sauce',
      image: '/images/Placeholder.jpg',
      ingredients: ['Morina fillet', 'Spinach', 'Potatoes', 'Lemon', 'Butter'],
      allergens: ['Fish', 'Dairy'],
      chefs_description:
        'Delicately grilled morina fillet, accompanied by a bed of sautéed spinach and perfectly roasted potatoes, all brought together with a zesty lemon butter sauce.',
      dietaryInfo: ['Halal', 'Gluten-free'],
    },
    grilled_scallop_wrapped_beef_bacon: {
      category: 'Main Course',
      description: 'Scallops wrapped in beef bacon, served with risotto and sautéed mushrooms',
      image: '/images/Placeholder.jpg',
      ingredients: ['Scallops', 'Beef bacon', 'Risotto', 'Mushrooms'],
      allergens: ['Shellfish', 'Dairy'],
      chefs_description:
        'Luxurious scallops wrapped in crispy beef bacon, served alongside creamy risotto and earthy sautéed mushrooms.',
      dietaryInfo: ['Halal'],
    },
  };

  const snakeCaseName = toSnakeCase(name);
  const item = menu[snakeCaseName as keyof typeof menu];

  if (!item) {
    return NextResponse.json({
      category: 'NOT FOUND',
      description: 'NOT FOUND',
      image: '/images/Placeholder.jpg',
      ingredients: ['NOT FOUND'],
      allergens: ['NOT FOUND'],
      chefs_description: 'NOT FOUND',
      dietaryInfo: ['NOT FOUND'],
    });
  }

  return NextResponse.json(item);
}
