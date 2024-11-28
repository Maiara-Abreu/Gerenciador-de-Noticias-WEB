import React, { useEffect, useState } from 'react';
import ListNoticia from './ListarNoticias';
import './Main.css';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

function Noticias() {
    const [noticias, setNoticias] = useState([]);
    const [mensagem, setMensagem] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <p>Carregando...</p>;
    }

    if (error) {
        return <p>Erro: {error}</p>;
    }

    // Configuração do carrossel
    const responsive = {
        allDevices: {
            breakpoint: { max: 4000, min: 0 },
            items: 1, // Apenas uma notícia por vez
        },
    };

    return (
        <div className="Main">
            <div className="app">
                {mensagem && <p>{mensagem}</p>}
                <h1>Tecnologia & Programação</h1>

                {/* Carrossel para exibir uma notícia por vez */}
                <Carousel
                    swipeable={true}
                    draggable={true}
                    showDots={true} // Bolinhas no rodapé
                    responsive={responsive}
                    ssr={true}
                    infinite={true}
                    autoPlay={true}
                    autoPlaySpeed={5000}
                    keyBoardControl={true}
                    customTransition="all 0.5s"
                    transitionDuration={500}
                    containerClass="carousel-container"
                    removeArrowOnDeviceType={["tablet", "mobile"]}
                    dotListClass="custom-dot-list" // Classe para estilizar bolinhas
                    customLeftArrow={
                        <button className="custom-arrow custom-arrow-left">{"<"}</button>
                    }
                    customRightArrow={
                        <button className="custom-arrow custom-arrow-right">{">"}</button>
                    }
                >
                    {noticias.map((noticia, index) => (
                        <div key={index} className="carousel-item">
                            <img
                                src={noticia.imagem}
                                alt={noticia.titulo}
                                className="carousel-img"
                            />
                            <div className="carousel-content">
                                <h3>{noticia.titulo}</h3>
                                <p>{noticia.descricao}</p>
                            </div>
                        </div>
                    ))}
                </Carousel>

                {/* Lista de notícias */}
                <ListNoticia news={noticias} />
            </div>
        </div>
    );
}

export default Noticias;
