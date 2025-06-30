import express from 'express';
import prisma from '../config/prisma.js';
import { PrismaClient } from '@prisma/client';
import autenticarToken from './autenticacao.js';

const router = express.Router();

router.post('/artistas', autenticarToken, async(req, res) => {
    const {nome, genero} = req.body;

    if (!nome || !genero) {
        return res.status(400).json({erro: 'Nome e gênero musical são obrigatórios'});
    }

    try {
        const novoArtista= await prisma.artista.create({
            data: {
                nome, 
                genero
            }
        })

        res.status(201).json(novoArtista);

    } catch (error) {
        res.status(500).json({erro: 'Erro ao inserir artista'});
    }
})

/*router.get('/artistas', async(req, res) => {
    const {genero} = req.query;

    try {
        let artistas;

        if (genero) {
            artistas = await prisma.artista.findMany({
                where: {
                    genero: {
                        equals: genero,
                        mode: 'insensitive'
                    }
                }
            })
        }
        else{
            artistas = await prisma.artista.findMany();
        }

        res.json(artistas);
    } catch (error) {
        console.error(error);
        res.status(500).json({erro: 'Erro ao buscar artistas'});
    }
})*/

router.put('/artistas/:id', autenticarToken, async (req, res) => {
    const {id} = req.params;
    const {nome, genero} = req.body;

    try {
        const artistaExistente = await prisma.artista.findUnique({
            where: {id: parseInt(id)}
        });

        if (!artistaExistente) {
            return res.status(404).json({erro: 'Artista não encontrado'});
        }
        const atualizaArtista = await prisma.artista.update({
            where: {id: parseInt(id)},
            data: {
                nome,
                genero
            }
        })

        return res.json(atualizaArtista);

    } catch (error) {
        return res.status(500).json({erro: 'Erro ao atualizar artista'});
    }
})
router.get('/artistas', autenticarToken, async (req, res) => {
  const { nome } = req.query;

  try {
   
    const artistaPrincipal = await prisma.artista.findFirst({
      where: {
        nome: {
          equals: nome,
          mode: 'insensitive'
        }
      }
    });

    if (!artistaPrincipal) {
      return res.status(404).json({ erro: 'Artista não encontrado' });
    }

    const semelhantes = await prisma.artista.findMany({
      where: {
        genero: artistaPrincipal.genero,
        nome: {
          not: artistaPrincipal.nome
        }
      }
    });

    return res.json(semelhantes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao buscar artistas semelhantes' });
  }
});


router.delete('/artistas/:id', autenticarToken, async(req, res) => {
    const {id} = req.params;

    try {
        const artista = await prisma.artista.findUnique({
            where: {id: parseInt(id)}
        })

        if (!artista) {
            return res.status(404).json({erro: 'Artista não encontrado'});
        }

        await prisma.artista.delete({
            where: {id: parseInt(id)}
        })

        return res.json({mensagem: 'Artista deletado com sucesso.'});
    } catch (error) {
        return res.status(500).json({erro: 'Erro ao deletar artista'});
    }
})

export default router;