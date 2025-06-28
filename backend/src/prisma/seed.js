import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function criarUser() {
    const senhaHash = await bcrypt.hash('1234', 10);

    await prisma.usuario.upsert({
        where: {email: 'edu@email.com'},
        update: {},
        create: {
            nome: 'Eduardo',
            email: 'edu@email.com',
            senha: senhaHash,
        },
    })
    console.log('Usuario criado com sucesso')
}

criarUser()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });