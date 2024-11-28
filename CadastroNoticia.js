import React, { useState } from 'react';
import './CadastroNoticia.css'; // Importando o arquivo de estilos

const CadastroNoticia = () => {
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [link, setLink] = useState('');
    const [imagem, setImagem] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const noticia = { titulo, descricao, link, imagem };

        try {
            const response = await fetch('http://localhost:8082/noticias', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(noticia),
            });

            if (!response.ok) {
                throw new Error('Erro ao cadastrar a notícia');
            }

            const data = await response.json();
            setMensagem(`Notícia cadastrada com sucesso! ID: ${data.id}`);

            // Limpar os campos do formulário
            setTitulo('');
            setDescricao('');
            setLink('');
            setImagem('');
        } catch (error) {
            setMensagem(`Erro: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='formulario-noticia'>
            <h1>Painel Administrativo - Cadastrar Notícia</h1>
            <form onSubmit={handleSubmit} className="form-container">
                <div className="form-group">
                    <label>Título:</label>
                    <input
                        type="text"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        required
                        placeholder="Digite o título da notícia"
                    />
                </div>
                <div className="form-group">
                    <label>Descrição:</label>
                    <textarea
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        required
                        placeholder="Digite a descrição da notícia"
                    />
                </div>
                <div className="form-group">
                    <label>Link:</label>
                    <input
                        type="url"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        required
                        placeholder="Adicione o link da notícia"
                    />
                </div>
                <div className="form-group">
                    <label>Imagem (URL):</label>
                    <input
                        type="url"
                        value={imagem}
                        onChange={(e) => setImagem(e.target.value)}
                        placeholder="URL da imagem (opcional)"
                    />
                </div>
                <button type="submit" disabled={loading} className="submit-btn">
                    {loading ? 'Cadastrando...' : 'Cadastrar Notícia'}
                </button>
            </form>
            {mensagem && <p className={`mensagem ${mensagem.includes('Erro') ? 'erro' : 'sucesso'}`}>{mensagem}</p>}
        </div>
    );
};

export default CadastroNoticia;
