class videosControler {
index(req, res){
try{
const videos = dados.videos;
if (videos.length > 0) {
res.status(200).json(videos);
} else {
res.status(404).json({ messagem: "Nenhum video encontrado"});
}

} catch (erro) {
    res
    .status(500)
    .json({ messagem: "Erro ao buscar videos",
        detalhes: erro.message })
}

}

show(req, res){
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
    }


store(req, res) {
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
}}

update(req, res) { try {
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
};

delete(req, res){
    try{
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
}};



module.exports = new videosControler();