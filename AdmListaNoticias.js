import React, { useEffect, useState } from 'react';
import './ListaNoticias.css';
import EditarNoticia from './EditarNoticia';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Importação de ícones

const AdmListaNoticias = () => {
    const [noticias, setNoticias] = useState([]);
    const [mensagem, setMensagem] = useState('');
    const [editandoNoticiaId, setEditandoNoticiaId] = useState(null);

    useEffect(() => {
        fetchNoticias();
    }, []);

    const fetchNoticias = async () => {
        try {
            const response = await fetch('http://localhost:8082/noticias');
            if (!response.ok) {
                throw new Error('Erro ao buscar notícias');
            }
            const data = await response.json();
            setNoticias(data);
        } catch (error) {
            setMensagem(`Erro: ${error.message}`);
        }
    };

    const excluirNoticia = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir esta notícia?')) {
            try {
                const response = await fetch(`http://localhost:8082/noticias/${id}`, {
                    method: 'DELETE',
                });
                if (!response.ok) {
                    throw new Error('Erro ao excluir a notícia');
                }
                setMensagem('Notícia excluída com sucesso!');
                fetchNoticias();
            } catch (error) {
                setMensagem(`Erro: ${error.message}`);
            }
        }
    };

    return (
        <div className="adm-lista-noticias">
            {mensagem && <p className="mensagem">{mensagem}</p>}
            {editandoNoticiaId ? (
                <EditarNoticia
                    noticiaId={editandoNoticiaId}
                    aoSalvar={() => {
                        setEditandoNoticiaId(null);
                        fetchNoticias();
                    }}
                />
            ) : (
                <div>
                    <h1>Painel Administrativo - Lista de Notícias</h1>
                    <table className="tabela-noticias">
                        <thead>
                            <tr>
                                <th>Título</th>
                                <th>Descrição</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {noticias.map((noticia) => (
                                <tr key={noticia.id}>
                                    <td>{noticia.titulo}</td>
                                    <td>{noticia.descricao.substring(0, 250)}...</td>
                                    <td>
                                        <button
                                            className="botao-editar"
                                            onClick={() => setEditandoNoticiaId(noticia.id)}
                                        >
                                            <FaEdit /> Editar
                                        </button>
                                        <button
                                            className="botao-excluir"
                                            onClick={() => excluirNoticia(noticia.id)}
                                        >
                                            <FaTrash /> Excluir
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdmListaNoticias;
