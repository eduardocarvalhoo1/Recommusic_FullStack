-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Artista" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "genero" TEXT NOT NULL,

    CONSTRAINT "Artista_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArtistaSemelhante" (
    "id" SERIAL NOT NULL,
    "artistaId" INTEGER NOT NULL,
    "semelhanteId" INTEGER NOT NULL,

    CONSTRAINT "ArtistaSemelhante_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- AddForeignKey
ALTER TABLE "ArtistaSemelhante" ADD CONSTRAINT "ArtistaSemelhante_artistaId_fkey" FOREIGN KEY ("artistaId") REFERENCES "Artista"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtistaSemelhante" ADD CONSTRAINT "ArtistaSemelhante_semelhanteId_fkey" FOREIGN KEY ("semelhanteId") REFERENCES "Artista"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
