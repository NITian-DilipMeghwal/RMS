const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('Seeding database...');

    // Clear existing data
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.dishIngredient.deleteMany();
    await prisma.ingredient.deleteMany();
    await prisma.dish.deleteMany();
    await prisma.restaurantQRCode.deleteMany();
    await prisma.restaurant.deleteMany();
    await prisma.userFoodPreference.deleteMany();
    await prisma.user.deleteMany();

    // Create a restaurant
    const restaurant = await prisma.restaurant.create({
        data: {
            name: 'Pizza Palace',
            description: 'The best pizza in town',
            address: '123 Main St',
            city: 'Food City',
<<<<<<< HEAD
            dishes: {
=======
            latitude: 40.7128,
            longitude: -74.0060,
            phone: '555-0199',
            is_active: true,
            qr_code: {
                create: {
                    qr_code_url: 'https://example.com/qr/gourmet-haven',
                }, // hello
            },
        },
    });

    console.log(`Created restaurant: ${restaurant.name} (${restaurant.id})`);

    // 2. Create Ingredients
    const cheese = await prisma.ingredient.create({ data: { name: 'Cheese' } });
    const tomato = await prisma.ingredient.create({ data: { name: 'Tomato' } });
    const basil = await prisma.ingredient.create({ data: { name: 'Basil' } });
    const flour = await prisma.ingredient.create({ data: { name: 'Flour' } });

    // 3. Create Dishes
    const pizza = await prisma.dish.create({
        data: {
            restaurant_id: restaurant.id,
            name: 'Margherita Pizza',
            description: 'Classic pizza with fresh mozzarella and basil.',
            price: 12.99,
            calories: 800,
            image_url: 'https://placehold.co/600x400',
            ingredients: {
                create: [
                    { ingredient_id: cheese.id },
                    { ingredient_id: tomato.id },
                    { ingredient_id: basil.id },
                    { ingredient_id: flour.id },
                ],
            },
            is_available: true,
        },
    });

    const pasta = await prisma.dish.create({
        data: {
            restaurant_id: restaurant.id,
            name: 'Spaghetti Pomodoro',
            description: 'Fresh pasta with tomato sauce.',
            price: 10.50,
            calories: 600,
            image_url: 'https://placehold.co/600x400',
            ingredients: {
>>>>>>> bharat
                create: [
                    {
                        name: 'Margherita Pizza',
                        description: 'Classic tomato and mozzarella',
                        price: 12.99,
                        is_available: true,
                    },
                    {
                        name: 'Pepperoni Pizza',
                        description: 'Spicy pepperoni with extra cheese',
                        price: 15.99,
                        is_available: true,
                    },
                ],
            },
        },
    });

    console.log(`Seeded restaurant: ${restaurant.name}`);
    console.log('Seeding complete.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
