import { toSnakeCase } from '@/lib/utils';
import { NextResponse } from 'next/server';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const name = decodeURIComponent(searchParams.get('name') || '');
  let lang = decodeURIComponent(searchParams.get('lang') || 'en');

  if (lang !== 'tr') {
    lang = 'en';
  }

  const menu = {
    tr: {
      grilled_chicken_breast: {
        category: 'Ana Yemek',
        description: 'Yanında sebzelerle servis edilen nefis ızgara tavuk göğsü',
        image: '/images/GrilledChickenBreast.jpg',
        ingredients: ['Tavuk göğsü', 'Zeytinyağı', 'Sarımsak', 'Limon', 'Rozmarin'],
        allergens: ['Yok'],
        chefs_description:
          'Sarımsak ve aromatik rozmarinle tatlandırılmış, mükemmel şekilde ızgara edilmiş tavuk göğsü, taze sebzelerle birlikte servis edilir.',
        dietaryInfo: ['Helal', 'Gluten-free'],
      },
      seasonal_fresh_fruits: {
        category: 'İnişe Yakın',
        description: 'Çeşitli taze mevsim meyveleri',
        image: '/images/Fruits.jpg',
        ingredients: ['Elma', 'Muz', 'Portakal', 'Ananas', 'Üzüm'],
        allergens: [],
        chefs_description:
          'İnişe yakın taze mevsim meyvelerinden oluşan bir seçki, hafif ve ferahlatıcı bir atıştırmalık için mükemmeldir.',
        dietaryInfo: ['Helal', 'Vegan', 'Gluten-free'],
      },
      vegetable_salad_with_marinated_shrimp: {
        category: 'Başlangıçlar',
        description: 'Marine edilmiş karidesle birlikte taze sebze salatası',
        image: '/images/VegetableSaladWithMarinatedShrimp.jpg',
        ingredients: [
          'Karides',
          'Marullalar',
          'Domates',
          'Salatalık',
          'Kırmızı soğan',
          'Zeytinyağı',
          'Limon suyu',
        ],
        allergens: ['Kabuklu deniz ürünleri'],
        chefs_description:
          'Taze sebzelerle tamamlanmış, marinelenmiş karidesler eşliğinde hafif limonlu bir sosla tatlandırılmış ferah bir salata.',
        dietaryInfo: ['Helal', 'Gluten-free'],
      },
      moutabel: {
        category: 'Başlangıçlar',
        description: 'Közlenmiş patlıcandan yapılan kremalı, tütsülü bir sos',
        image: '/images/Moutabel.jpg',
        ingredients: ['Patlıcan', 'Tahin', 'Sarımsak', 'Limon suyu', 'Zeytinyağı', 'Kimyon'],
        allergens: ['Susam'],
        chefs_description:
          'Tahin, sarımsak ve limon suyu ile harmanlanmış, zengin ve tütsülü bir patlıcan sosu.',
        dietaryInfo: ['Helal', 'Vejetaryen', 'Vegan'],
      },
      penne_with_tomato_sauce: {
        category: 'Ana Yemek',
        description:
          'Kızarmış patlıcan, kiraz domates ve zeytinle zengin domates sosunda penne makarna',
        image: '/images/PenneWithTomatoSauce.jpg',
        ingredients: ['Penne', 'Domates sosu', 'Patlıcan', 'Kiraz domates', 'Zeytin'],
        allergens: ['Gluten'],
        chefs_description:
          'Lezzetli penne makarna, zengin domates sosu içinde, kızarmış patlıcan, sulu kiraz domates ve tuzlu zeytinlerle.',
        dietaryInfo: ['Helal', 'Vejetaryen'],
      },
      basa_fish_with_vegetables: {
        category: 'Ana Yemek',
        description: 'Yanında karışık sebzelerle servis edilen basa balığı filetosu',
        image: '/images/BasaFishWithVegetables.jpg',
        ingredients: ['Basa balığı', 'Havuç', 'Brokoli', 'Biber', 'Limon', 'Zeytinyağı'],
        allergens: ['Balık'],
        chefs_description:
          'Zengin sebzelerle hafifçe tatlandırılmış ve ızgara yapılmış tender basa balığı filetosu.',
        dietaryInfo: ['Helal', 'Gluten-free'],
      },
      mango_mousse: {
        category: 'Tatlı',
        description: 'Taze meyve ile süslenmiş hafif ve kremalı mango mousse',
        image: '/images/MangoMousse.jpg',
        ingredients: ['Mango', 'Çırpılmış krema', 'Şeker', 'Jelatin'],
        allergens: ['Süt Ürünleri'],
        chefs_description:
          'Olgun mango, çırpılmış krema ve hafif tatlılıkla yapılan ferah ve yumuşak bir mousse.',
        dietaryInfo: ['Helal', 'Vejetaryen'],
      },
      seasonal_fresh_fruit: {
        category: 'Meyve',
        description: 'Çeşitli taze mevsim meyveleri',
        image: '/images/Placeholder.jpg',
        ingredients: ['Elma', 'Muz', 'Portakal', 'Ananas', 'Üzüm'],
        allergens: [],
        chefs_description:
          'İnişe yakın taze mevsim meyvelerinden oluşan bir seçki, hafif ve ferahlatıcı bir atıştırmalık için mükemmeldir.',
        dietaryInfo: ['Helal', 'Vegan', 'Gluten-free'],
      },
      assorted_cheese: {
        category: 'Peynir Seçkisi',
        description: 'Bir dizi farklı peynir çeşidi',
        image: '/images/Placeholder.jpg',
        ingredients: ['Cheddar', 'Brie', 'Gouda', 'Mavi peynir'],
        allergens: ['Süt Ürünleri'],
        chefs_description:
          'Lezzetli ve zengin bir peynir seçkisi, inmeden önce tuzlu bir atıştırmalık arayanlar için mükemmel.',
        dietaryInfo: ['Helal', 'Vejetaryen'],
      },
      scrambled_eggs: {
        category: 'Kahvaltı',
        description: 'Otlarla süslenmiş kabarık karıştırılmış yumurtalar',
        image: '/images/Placeholder.jpg',
        ingredients: ['Yumurtalar', 'Tereyağı', 'Tuz', 'Karabiber'],
        allergens: ['Yumurta', 'Süt Ürünleri'],
        chefs_description:
          'Tam olarak tuz ve karabiberle tatlandırılmış, yumuşak ve kabarık karıştırılmış yumurtalar, taze otlarla süslenmiş.',
        dietaryInfo: ['Helal'],
      },
      pickled_cucumber: {
        category: 'Atıştırmalıklar',
        description: 'Crisp ve asidik turşu salatalık dilimleri',
        image: '/images/Placeholder.jpg',
        ingredients: ['Salatalık', 'Sirke', 'Şeker', 'Tuz', 'Sarımsak'],
        allergens: [],
        chefs_description:
          'Ferahlatıcı bir tat ve lezzet patlaması sunan, gevrek ve asidik turşu salatalık dilimleri.',
        dietaryInfo: ['Helal', 'Vegan', 'Gluten-free'],
      },
      congee_with_chicken: {
        category: 'Atıştırmalıklar',
        description: 'Tender tavuk ile sıcak ve rahatlatıcı pirinç lapası',
        image: '/images/Placeholder.jpg',
        ingredients: ['Pirinç', 'Tavuk', 'Zencefil', 'Sarımsak', 'Yeşil soğan', 'Soya sosu'],
        allergens: ['Soya'],
        chefs_description:
          'Tender tavuk, aromatik zencefil ve soya bazlı bir et suyuyla yapılan besleyici bir konge.',
        dietaryInfo: ['Helal', 'Gluten-free'],
      },
      marinated_prawns_and_grilled_vegetables: {
        category: 'Başlangıçlar',
        description: 'Marine edilmiş karides ve ızgara sebzelerle yapılan bir başlangıç',
        image: '/images/MarinatedShrimpAndVegetableSalad.jpg',
        ingredients: ['Karides', 'Çeşitli sebzeler'],
        allergens: ['Kabuklu deniz ürünleri'],
        chefs_description:
          'Aromatik otlar ve baharatlarla marine edilmiş, ızgara yapılmış karidesler ve taze sebzeler.',
        dietaryInfo: ['Helal', 'Gluten-free'],
      },
      best_of_mezze: {
        category: 'Başlangıçlar',
        description: 'Geleneksel mezelerden oluşan bir seçki',
        image: '/images/BestOfMezze.jpg',
        ingredients: ['Humus', 'Tabule', 'Cacık', 'Baba ganoush'],
        allergens: ['Süt Ürünleri', 'Susam'],
        chefs_description:
          'Lezzetli bir mezze koleksiyonu, geleneksel Türk ve Orta Doğu tariflerinden esinlenerek.',
        dietaryInfo: ['Helal', 'Vejetaryen'],
      },
      creamy_zucchini_soup: {
        category: 'Çorbalar',
        description: 'Pürüzsüz ve kremalı kabak çorbası',
        image: '/images/CreamyZucchiniSoup.jpg',
        ingredients: ['Kabak', 'Krem', 'Sebze suyu', 'Soğan', 'Sarımsak', 'Baharatlar'],
        allergens: ['Süt Ürünleri'],
        chefs_description:
          'Yaz kabaklarının ince lezzetini sergileyen, taze baharatlarla zenginleştirilmiş ve kremalı bir dokunuşla tamamlanmış ipeksi bir çorba.',
        dietaryInfo: ['Vejetaryen', 'Glutensiz', 'Düşük karbonhidrat', 'Koşer', 'Helal'],
      },
      grilled_cod_fish: {
        category: 'Ana Yemekler',
        description:
          'Izgara morina balığı, Château patatesleri ve Toskana usulü sebzelerle servis edilir',
        image: '/images/GrilledCodFish.jpg',
        ingredients: ['Morina balığı', 'Patates', 'Sebzeler'],
        allergens: ['Balık'],
        chefs_description:
          "Mükemmel şekilde ızgara yapılmış morina balığı, Château tarzı patatesler ve İtalyan mutfağının Toskana sebzeleriyle birleştirilmiş, tabağınıza İtalya'nın tadını getiriyor.",
        dietaryInfo: ['Helal', 'Glutensiz'],
      },
      stir_fried_beef_with_bbq: {
        category: 'Ana Yemekler',
        description: 'BBQ soslu sotelik dana eti, ıspanak ve haşlanmış pirinçle servis edilir',
        image: '/images/StirFriedBeefWithBBQ.jpg',
        ingredients: ['Dana eti', 'BBQ sosu', 'Ispanak', 'Pirinç'],
        allergens: ['Gluten'],
        chefs_description:
          'Zengin BBQ sosunda sotelenmiş, yumuşak dana etleri, hafifçe sotelenmiş ıspanak ve buharda pişirilmiş pilavla birlikte.',
        dietaryInfo: ['Helal'],
      },
      rigatoni_with_parmesan_tomato_sauce: {
        category: 'Ana Yemekler',
        description: 'Parmesanlı domates soslu rigatoni makarna, kızarmış patlıcan ve kabak ile',
        image: '/images/RigatoniWithParmesanTomatoSauce.jpg',
        ingredients: ['Rigatoni', 'Parmesan', 'Domates sosu', 'Patlıcan', 'Kabak'],
        allergens: ['Gluten', 'Süt Ürünleri'],
        chefs_description:
          'Al dente rigatoni, parmesanla zenginleştirilmiş lezzetli domates sosunda karıştırılır, altın sarısı kızarmış patlıcan ve kabakla süslenir.',
        dietaryInfo: ['Helal', 'Vejetaryen'],
      },
      potpourri_of_traditional_turkish_desserts: {
        category: 'Tatlılar',
        description: 'Geleneksel Türk tatlılarından seçki',
        image: '/images/PotpourriOfTraditionalTurkishDesserts.jpg',
        ingredients: [
          'Çeşitli geleneksel Türk tatlıları',
          'Bal',
          'Kuruyemişler',
          'Yufka',
          'Süt ürünleri',
        ],
        allergens: ['Kuruyemiş', 'Süt Ürünleri', 'Gluten'],
        chefs_description:
          'Türk mutfağının zengin gastronomik mirasını sergileyen, özenle seçilmiş otantik Türk tatlıları.',
        dietaryInfo: ['Vejetaryen', 'Helal'],
      },
      chocolate_cake: {
        category: 'Tatlılar',
        description: 'Zengin ve nemli çikolatalı kek',
        image: '/images/ChocolateCake.jpg',
        ingredients: ['Çikolata', 'Un', 'Şeker', 'Yumurtalar', 'Tereyağı'],
        allergens: ['Gluten', 'Süt Ürünleri', 'Yumurta'],
        chefs_description:
          'Zengin ve doyurucu çikolata deneyimi sunan, mükemmel şekilde pişirilmiş çikolatalı kek.',
        dietaryInfo: ['Helal', 'Vejetaryen'],
      },
      apricot_caramel_cake: {
        category: 'Tatlılar',
        description: 'Kayısı ve karamel parçalarıyla nemli kek, vanilyalı sosla servis edilir',
        image: '/images/Placeholder.jpg',
        ingredients: ['Kayısı', 'Karamel', 'Un', 'Şeker', 'Yumurtalar', 'Tereyağı', 'Vanilya'],
        allergens: ['Gluten', 'Süt Ürünleri', 'Yumurta'],
        chefs_description:
          'Tatlı kayısılar ve zengin karamelin harika birleşimiyle hazırlanan bu kek, ekstra lezzet katacak şekilde vanilyalı sosla süslenmiştir.',
        dietaryInfo: ['Helal', 'Vejetaryen'],
      },
      selection_of_cheese: {
        category: 'Peynir Tabağı',
        description: 'Özenle seçilmiş kaliteli peynirler',
        image: '/images/Placeholder.jpg',
        ingredients: ['Çeşitli peynirler', 'Yan ürünler', 'Krakerler', 'Kurutulmuş meyveler'],
        allergens: ['Süt Ürünleri', 'Kuruyemiş içerebilir'],
        chefs_description:
          'Sanatsal peynirler, uygun yan ürünlerle birlikte özenle seçilmiş bir assorti.',
        dietaryInfo: ['Vejetaryen', 'Glutensiz seçenek mevcut', 'Helal'],
      },
      fresh_fruit_salad: {
        category: 'Tatlılar',
        description: 'Mevsimlik taze meyvelerden seçki',
        image: '/images/Placeholder.jpg',
        ingredients: ['Mevsimlik taze meyveler', 'Hafif şurup'],
        allergens: [],
        chefs_description:
          'Özenle seçilmiş, mükemmel olgunlaştırılmış meyvelerden oluşan ferahlatıcı bir kombinasyon.',
        dietaryInfo: [
          'Vejetaryen',
          'Vegan',
          'Glutensiz',
          'Süt Ürünü İçermez',
          'Helal',
          'Koşer',
          'Düşük Kalori',
        ],
      },
      nicoise_salad: {
        category: 'Başlangıçlar',
        description: 'Çeşitli taze malzemelerle klasik Fransız salatası',
        image: '/images/Placeholder.jpg',
        ingredients: [
          'Ton balığı',
          'Yeşil fasulye',
          'Yumurtalar',
          'Zeytinler',
          'Havyar',
          'Domates',
          'Vinaigret',
        ],
        allergens: ['Balık', 'Yumurtalar'],
        chefs_description:
          'Kıtır sebzelerle zenginleştirilmiş, protein açısından zengin ton balığı ve yumurtalarla hazırlanan, hafif vinaigretle tatlandırılmış geleneksel bir Nicoise salatası.',
        dietaryInfo: ['Helal', 'Glutensiz'],
      },
      mozzarella_and_grilled_vegetables: {
        category: 'Başlangıçlar',
        description: 'Taze mozzarella, ızgara sebzelerle birlikte',
        image: '/images/Placeholder.jpg',
        ingredients: ['Mozzarella', 'Kabak', 'Biber', 'Patlıcan'],
        allergens: ['Süt Ürünleri'],
        chefs_description:
          'Yumuşak ve kremalı mozzarella, taze ızgara sebzelerle birlikte zeytinyağı ile tatlandırılmış.',
        dietaryInfo: ['Helal', 'Vejetaryen', 'Glutensiz'],
      },
      grilled_fillet_of_morina: {
        category: 'Ana Yemekler',
        description:
          'Izgara morina filetosu, sotelenmiş ıspanak ve fırınlanmış patates, limonlu tereyağı sosuyla',
        image: '/images/Placeholder.jpg',
        ingredients: ['Morina filetosu', 'Ispanak', 'Patates', 'Limon', 'Tereyağı'],
        allergens: ['Balık', 'Süt Ürünleri'],
        chefs_description:
          'Hafifçe ızgara yapılmış morina filetosu, sotelenmiş ıspanak ve mükemmel fırınlanmış patatesler ile sunulup, zesty limonlu tereyağı sosu ile tamamlanmıştır.',
        dietaryInfo: ['Helal', 'Glutensiz'],
      },
      tomato_soup: {
        category: 'Çorbalar',
        description: 'Lezzetli domates çorbası, taze otlar ve ekşi krema ile',
        image: '/images/Placeholder.jpg',
        ingredients: ['Domates', 'Krem', 'Baharatlar'],
        allergens: ['Süt Ürünleri'],
        chefs_description:
          'Taze domateslerin zengin lezzetini, baharatlar ve krema ile birleştirerek ideal bir başlangıç sunar.',
        dietaryInfo: ['Vejetaryen'],
      },
      grilled_scallop_wrapped_beef_bacon: {
        category: 'Ana Yemekler',
        description:
          'Dana pastırmasıyla sarılmış deniztarağı, risotto ve sotelenmiş mantarlarla servis edilir',
        image: '/images/Placeholder.jpg',
        ingredients: ['Deniztarağı', 'Dana pastırması', 'Risotto', 'Mantarlar'],
        allergens: ['Kabuklu deniz ürünleri', 'Süt Ürünleri'],
        chefs_description:
          'Crispy dana pastırmasıyla sarılmış lüks deniztarağı, kremalı risotto ve toprak kokulu sotelenmiş mantarlarla birlikte sunulur.',
        dietaryInfo: ['Helal'],
      },
    },
    en: {
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
    },
  };

  const snakeCaseName = toSnakeCase(name);
  const item = menu[lang][snakeCaseName];

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
