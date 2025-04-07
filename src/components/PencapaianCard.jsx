import React from "react";
import PropTypes from "prop-types";
import "./PencapaianCard.css";
import { useNavigate } from "react-router-dom";


const PencapaianCard = ({ item }) => {
  console.log("Image path:", item.image);
  const navigate = useNavigate();

  return (
    <div className="card"
      onClick={() => navigate(`profil/pencapaian/detail/${item.id}`)}
    >
      <div className="card2">
        <img
          src={`http://localhost:8000/storage/${item.image}`}
          alt={`Pencapaian ${item.name}`}
          className="card-img"
          onError={(e) => {
            e.target.src = "http://localhost:8000/storage/default.jpg";
          }}
        />
 <p className="card-name">{item.name}</p>
 <p className="card-desk">{item.deskripsi}</p>
        </div>
    </div>
  );
};

PencapaianCard.propTypes = {
  item: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    deskripsi: PropTypes.string.isRequired,
  }).isRequired,
};

export default PencapaianCard;
