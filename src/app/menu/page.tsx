import FlightMenu from '@/components/FlightMenu';
import { readMenuData } from '@/services/ai';

export default async function Menu() {
  //const data = await readMenuData();
  const data = [
    {
      "id": "dine_on_demand",
      "title": "Dine On Demand",
      "items": [
        {
          "alternativeGroups": [
            {
              "items": [
                { "name": "Marinated Prawns And Grilled Vegetables" }
              ]
            },
            {
              "alternationType": "or",
              "items": [
                { "name": "Best Of Mezze" }
              ]
            },
            {
              "alternationType": "and/or",
              "items": [
                { "name": "Creamy Zucchini Soup" }
              ]
            }
          ]
        },
        {
          "alternativeGroups": [
            {
              "items": [
                { "name": "Grilled Cod Fish" }
              ]
            },
            {
              "alternationType": "or",
              "items": [
                { "name": "Stir Fried Beef With Bbq" }
              ]
            },
            {
              "alternationType": "or",
              "items": [
                { "name": "Rigatoni With Parmesan Tomato Sauce" }
              ]
            }
          ]
        },
        {
          "alternativeGroups": [
            {
              "items": [
                { "name": "Potpourri Of Traditional Turkish Desserts" }
              ]
            },
            {
              "alternationType": "or",
              "items": [
                { "name": "Chocolate Cake" }
              ]
            },
            {
              "alternationType": "or",
              "items": [
                { "name": "Apricot Caramel Cake" }
              ]
            },
            {
              "alternationType": "or",
              "items": [
                { "name": "Selection Of Cheese" }
              ]
            },
            {
              "alternationType": "or",
              "items": [
                { "name": "Fresh Fruit Salad" }
              ]
            }
          ]
        },
        {
          "name": "Roast Beef Sandwich, Fruit Tartelette"
        }
      ]
    },
    {
      "id": "before_landing",
      "title": "Before Landing",
      "items": [
        { "name": "Freshly Squeezed Orange Juice, Fresh Papaya Juice" },
        { "name": "Mango & Banana Smoothie" },
        { "name": "Fresh Fruit Salad" },
        { "name": "Yoghurt" },
        { "name": "Chicken Breast & Smoked Turkey" },
        { "name": "Selection Of Cheese" },
        { "name": "Honey, Butter" },
        {
          "alternativeGroups": [
            {
              "items": [
                { "name": "Mozzarella And Tomato Omelette" }
              ]
            },
            {
              "alternationType": "or",
              "items": [
                { "name": "Crepe With Vanilla Custard" }
              ]
            }
          ]
        },
        { "name": "Ovenfresh Bread Selection" },
        { "name": "Croissant And Danish" }
      ]
    }
  ]

  return <FlightMenu />;
}
