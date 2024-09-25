const express = require("express");
const router = express.Router();
const dados = require("../mock/dados.json");

// Rota para listar todos os vídeos
router.get("/", videoController.index);
// Rota para buscar um vídeo pelo ID
router.get("/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const video = dados.videos.find((v) => v.id === id);



    if (video) {
      res.status(200).json(video);
    } else {
      res.status(404).json({ mensagem: "Vídeo não encontrado" });
    }
  } catch (erro) {
    res.status(500).json({ mensagem: "Erro ao buscar vídeo", detalhes: erro.message });
  }
});

// Rota para criar um novo vídeo
router.post("/", (req, res) => {
  try {
    const { titulo, descricao, quantidadeViews, image, canalID } = req.body;

    const gerarIdUnico = () => {
      let id;
      do {
        id = Math.floor(Math.random() * 1000);
      } while (dados.videos.some((video) => video.id === id));
      return id;
    };

    const novoVideo = {
      id: gerarIdUnico(),
      titulo,
      descricao,
      quantidadeViews,
      image,
      canalID
    };

    dados.videos.push(novoVideo);
    res.status(201).json(novoVideo);
  } catch (erro) {
    res.status(500).json({ mensagem: "Erro ao criar vídeo", detalhes: erro.message });
  }
});

// Rota para editar um vídeo pelo ID
router.put("/:id", (req, res) => {
  try {
    const { titulo, descricao, quantidadeViews, canalID } = req.body;
    const id = parseInt(req.params.id);
    const video = dados.videos.find((video) => video.id === id);

    if (!video) {
      return res.status(404).json({ mensagem: "Vídeo não encontrado" });
    }

    video.titulo = titulo;
    video.descricao = descricao;
    video.quantidadeViews = quantidadeViews;
    video.canalID = canalID;

    res.status(200).json(video);
  } catch (erro) {
    res.status(500).json({ mensagem: "Erro ao editar vídeo", detalhes: erro.message });
  }
});

// Rota para deletar um vídeo pelo ID
router.delete("/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const indiceDoVideo = dados.videos.findIndex((video) => video.id === id);

    if (indiceDoVideo !== -1) {
      const videoRemovido = dados.videos.splice(indiceDoVideo, 1);
      res.status(200).json({ mensagem: `Vídeo id:${id} removido com sucesso!`, videoRemovido });
    } else {
      res.status(404).json({ mensagem: "Vídeo não encontrado" });
    }
  } catch (erro) {
    res.status(500).json({ mensagem: "Erro ao remover vídeo", detalhes: erro.message });
  }
});

module.exports = router;
