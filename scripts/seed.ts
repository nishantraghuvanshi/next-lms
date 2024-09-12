const {PrismaClient} = require('@prisma/client')

const db = new PrismaClient()

async function main() {
    try {
        await db.category.createMany({
          data: [
            { name: "Computer Science" },
            { name: "Mathematics" },
            { name: "Physics" },
            { name: "Engineering" },
            { name: "Photography" },
            { name: "Accounting" },
            { name: "Filming" },
            { name: "Health" },
          ],
          
        });
        console.log("Database seeded successfully")
    } catch (error) {
        console.log("Error seeding database", error)
    }finally{
        await db.$disconnect()
    }
}

main()