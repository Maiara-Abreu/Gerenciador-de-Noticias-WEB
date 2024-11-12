// ListarNoticias.js
import React from 'react';
import { Link } from 'react-router-dom';
import './ListNoticia.css'

// Componente para um item de notícia
const ItemNoticia = ({ id, titulo, imagem }) => {
  return (
    <div className="news-item">
      {imagem && <img src={imagem} alt={titulo} className="news-image" />}
      <h2 className="news-title">{titulo}</h2>
      
      <Link to={`/DetalheNoticia/${id}`}>
        <button className='details-button'>Ver Detalhes</button>
      </Link>
    </div>
  );
};

// Componente para listar notícias
const ListarNoticias = ({ news }) => {
  return (
    <div className="news-list">
      {news.map((item, index) => (
        <ItemNoticia 
          key={index} 
          id={item.id}
          titulo={item.titulo} 
          imagem={item.imagem} 
        />
      ))}
    </div>
  );
};

export default ListarNoticias