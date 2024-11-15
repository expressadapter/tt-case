import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const name = decodeURIComponent(searchParams.get('name') || '');

  const menu = {
    'Marinated Prawns And Grilled Vegetables': {
      category: 'Starters',
      description: 'Prawns marinated and grilled with a selection of fresh vegetables',
      image: '/api/placeholder/300/200',
      ingredients: ['Prawns', 'Assorted vegetables'],
      allergens: ['Shellfish'],
      chefs_description:
        'Juicy prawns marinated in aromatic herbs and spices, grilled to perfection alongside a vibrant mix of vegetables.',
      dietaryInfo: ['Halal', 'Gluten-free'],
    },
    'Best of Mezze': {
      category: 'Starters',
      description: 'A selection of traditional mezze dishes',
      image: '/api/placeholder/300/200',
      ingredients: ['Hummus', 'Tabbouleh', 'Baba Ganoush'],
      allergens: [],
      chefs_description:
        'A delightful assortment of Middle Eastern appetizers, featuring classics like hummus, tabbouleh, and baba ganoush.',
      dietaryInfo: ['Halal', 'Vegetarian', 'Gluten-free available'],
    },
    'Creamy Zucchini Soup': {
      category: 'Soups',
      description: 'Smooth and velvety zucchini soup',
      image: '/api/placeholder/300/200',
      ingredients: ['Zucchini', 'Cream', 'Vegetable stock', 'Onions', 'Garlic', 'Herbs'],
      allergens: ['Dairy'],
      chefs_description:
        'A silky smooth soup showcasing the delicate flavor of summer zucchini, enhanced with fresh herbs and finished with a touch of cream.',
      dietaryInfo: ['Vegetarian', 'Gluten-free', 'Low-carb', 'Kosher', 'Halal'],
    },
    'Grilled Cod Fish': {
      category: 'Main Course',
      description: 'Grilled cod served with Château potatoes and Tuscany style vegetables',
      image: '/api/placeholder/300/200',
      ingredients: ['Cod fish', 'Potatoes', 'Vegetables'],
      allergens: ['Fish'],
      chefs_description:
        'Perfectly grilled cod paired with Château-style potatoes and a medley of Tuscan vegetables, bringing a taste of Italy to your plate.',
      dietaryInfo: ['Halal', 'Gluten-free'],
    },
    'Stir Fried Beef with BBQ': {
      category: 'Main Course',
      description: 'Beef stir-fried with BBQ sauce, served with sautéed spinach and steamed rice',
      image: '/api/placeholder/300/200',
      ingredients: ['Beef', 'BBQ sauce', 'Spinach', 'Rice'],
      allergens: ['Gluten'],
      chefs_description:
        'Tender beef strips stir-fried in a rich BBQ sauce, accompanied by lightly sautéed spinach and fluffy steamed rice.',
      dietaryInfo: ['Halal'],
    },
    'Rigatoni with Parmesan Tomato Sauce': {
      category: 'Main Course',
      description: 'Rigatoni pasta in a parmesan tomato sauce with fried eggplant and zucchini',
      image: '/api/placeholder/300/200',
      ingredients: ['Rigatoni', 'Parmesan', 'Tomato sauce', 'Eggplant', 'Zucchini'],
      allergens: ['Gluten', 'Dairy'],
      chefs_description:
        'Al dente rigatoni tossed in a savory tomato sauce enriched with parmesan, topped with golden fried eggplant and zucchini.',
      dietaryInfo: ['Halal', 'Vegetarian'],
    },
    'Potpourri of Traditional Turkish Desserts': {
      category: 'Desserts',
      description: 'Selection of traditional Turkish desserts',
      image: '/api/placeholder/300/200',
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
    'Chocolate Cake': {
      category: 'Desserts',
      description: 'Rich and moist chocolate cake',
      image: '/api/placeholder/300/200',
      ingredients: ['Chocolate', 'Flour', 'Sugar', 'Eggs', 'Butter'],
      allergens: ['Gluten', 'Dairy', 'Eggs'],
      chefs_description:
        'Decadent chocolate cake, baked to perfection, offering a rich and indulgent chocolate experience.',
      dietaryInfo: ['Halal', 'Vegetarian'],
    },
    'Apricot Caramel Cake': {
      category: 'Desserts',
      description: 'Moist cake with apricot pieces and caramel, served with vanilla sauce',
      image: '/api/placeholder/300/200',
      ingredients: ['Apricot', 'Caramel', 'Flour', 'Sugar', 'Eggs', 'Butter', 'Vanilla'],
      allergens: ['Gluten', 'Dairy', 'Eggs'],
      chefs_description:
        'A delightful blend of sweet apricots and rich caramel, this cake is topped with a smooth vanilla sauce for an extra layer of flavor.',
      dietaryInfo: ['Halal', 'Vegetarian'],
    },
    'Selection of Cheese': {
      category: 'Cheese Course',
      description: 'Curated selection of fine cheeses',
      image: '/api/placeholder/300/200',
      ingredients: ['Various cheeses', 'Accompaniments', 'Crackers', 'Dried fruits'],
      allergens: ['Dairy', 'May contain nuts'],
      chefs_description:
        'A carefully selected assortment of artisanal cheeses, served with appropriate accompaniments.',
      dietaryInfo: ['Vegetarian', 'Gluten-free available', 'Halal'],
    },
    'Fresh Fruit Salad': {
      category: 'Desserts',
      description: 'Selection of fresh seasonal fruits',
      image: '/api/placeholder/300/200',
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
    'Nicoise Salad': {
      category: 'Starters',
      description: 'Classic French salad with a variety of fresh ingredients',
      image: '/api/placeholder/300/200',
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
    'Mozzarella & Grilled Vegetables': {
      category: 'Starters',
      description: 'Fresh mozzarella paired with a selection of grilled vegetables',
      image: '/api/placeholder/300/200',
      ingredients: ['Mozzarella', 'Zucchini', 'Bell peppers', 'Eggplant'],
      allergens: ['Dairy'],
      chefs_description:
        'Soft, creamy mozzarella served with a colorful assortment of freshly grilled vegetables, drizzled with olive oil.',
      dietaryInfo: ['Halal', 'Vegetarian', 'Gluten-free'],
    },
    'Grilled Fillet of Morina': {
      category: 'Main Course',
      description:
        'Grilled morina fillet served with sautéed spinach and roasted potatoes, lemon butter sauce',
      image: '/api/placeholder/300/200',
      ingredients: ['Morina fillet', 'Spinach', 'Potatoes', 'Lemon', 'Butter'],
      allergens: ['Fish', 'Dairy'],
      chefs_description:
        'Delicately grilled morina fillet, accompanied by a bed of sautéed spinach and perfectly roasted potatoes, all brought together with a zesty lemon butter sauce.',
      dietaryInfo: ['Halal', 'Gluten-free'],
    },
    'Grilled Scallop Wrapped Beef Bacon': {
      category: 'Main Course',
      description: 'Scallops wrapped in beef bacon, served with risotto and sautéed mushrooms',
      image: '/api/placeholder/300/200',
      ingredients: ['Scallops', 'Beef bacon', 'Risotto', 'Mushrooms'],
      allergens: ['Shellfish', 'Dairy'],
      chefs_description:
        'Luxurious scallops wrapped in crispy beef bacon, served alongside creamy risotto and earthy sautéed mushrooms.',
      dietaryInfo: ['Halal'],
    },
    'Penne with Tomato Sauce': {
      category: 'Main Course',
      description:
        'Penne pasta in a rich tomato sauce with fried eggplants, cherry tomatoes, and olives',
      image: '/images/PenneWithTomatoSauce.webp',
      ingredients: ['Penne', 'Tomato sauce', 'Eggplants', 'Cherry tomatoes', 'Olives'],
      allergens: ['Gluten'],
      chefs_description:
        'Al dente penne tossed in a savory tomato sauce, enriched with the flavors of fried eggplants, sweet cherry tomatoes, and briny olives.',
      dietaryInfo: ['Halal', 'Vegetarian'],
    },
    'Brownie Cheesecake': {
      category: 'Desserts',
      description: 'Rich chocolate brownie base topped with creamy cheesecake',
      image: '/api/placeholder/300/200',
      ingredients: ['Chocolate', 'Cream cheese', 'Sugar', 'Eggs', 'Butter'],
      allergens: ['Dairy', 'Eggs', 'Gluten'],
      chefs_description:
        'A decadent dessert combining a moist chocolate brownie base with a luscious cheesecake topping, creating a perfect blend of textures and flavors.',
      dietaryInfo: ['Halal', 'Vegetarian'],
    },
    'Cherry Almond Tart': {
      category: 'Desserts',
      description: 'Warm tart filled with cherries and almonds, served with vanilla sauce',
      image: '/api/placeholder/300/200',
      ingredients: ['Cherries', 'Almonds', 'Flour', 'Butter', 'Sugar', 'Eggs', 'Vanilla'],
      allergens: ['Nuts', 'Dairy', 'Eggs', 'Gluten'],
      chefs_description:
        'A delightful warm tart, brimming with juicy cherries and crunchy almonds, complemented by a smooth vanilla sauce.',
      dietaryInfo: ['Halal', 'Vegetarian'],
    },
    'Spinach Omelette': {
      category: 'Breakfast',
      description:
        'Fluffy omelette with fresh spinach, served with roesti potatoes and sautéed broccoli',
      image: '/api/placeholder/300/200',
      ingredients: ['Eggs', 'Spinach', 'Potatoes', 'Broccoli'],
      allergens: ['Eggs'],
      chefs_description:
        'A nutritious and filling omelette packed with fresh spinach, accompanied by crispy roesti potatoes and lightly sautéed broccoli.',
      dietaryInfo: ['Halal', 'Vegetarian', 'Gluten-free'],
    },
    'French Toast': {
      category: 'Breakfast',
      description: 'Classic French toast served with grilled pineapple and vanilla sauce',
      image: '/api/placeholder/300/200',
      ingredients: ['Bread', 'Eggs', 'Milk', 'Pineapple', 'Vanilla', 'Butter'],
      allergens: ['Eggs', 'Dairy', 'Gluten'],
      chefs_description:
        'Savory French toast topped with caramelized pineapple slices and drizzled with a rich vanilla sauce, offering a sweet and satisfying breakfast option.',
      dietaryInfo: ['Halal', 'Vegetarian'],
    },
  };

  const item = menu[name as keyof typeof menu];

  if (!item) {
    return NextResponse.json({
      category: 'NOT FOUND',
      description: 'NOT FOUND',
      image: '/api/placeholder/300/200',
      ingredients: ['NOT FOUND'],
      allergens: ['NOT FOUND'],
      chefs_description: 'NOT FOUND',
      dietaryInfo: ['NOT FOUND'],
    });
  }

  return NextResponse.json(item);
}
