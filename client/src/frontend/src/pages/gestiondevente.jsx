import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrashAlt, FaEnvelope } from 'react-icons/fa';
import MessageModal from '../components/comModal';
import { ref, onValue, remove } from 'firebase/database';
import { database } from './firebase';

const Gestiondevente = () => {
  const [paniers, setPaniers] = useState([]);
  const [selectedPanier, setSelectedPanier] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    fetchPaniers();
    const panierRef = ref(database, 'paniers');

    const onValueChange = onValue(panierRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setPaniers(Object.values(data).filter(panier => panier.userId === userId));
      }
    });

    return () => {
      // Cleanup the listener when the component unmounts
      onValueChange();
    };
  }, [userId]);

  const fetchPaniers = async () => {
    try {
      const response = await axios.get('http://localhost:3001/paniers');
      setPaniers(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des paniers:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await remove(ref(database, `paniers/${id}`));
      fetchPaniers();
    } catch (error) {
      console.error('Erreur lors de la suppression du panier:', error);
    }
  };

  const handleMessage = (panier) => {
    setSelectedPanier(panier);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPanier(null);
  };

  return (
    <div className="container">
      <h1>Gestion de Vente</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Produit</th>
            <th>Quantité</th>
            <th>Prix</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paniers.map((panier) => (
            <tr key={panier.id}>
              <td>{panier.id}</td>
              <td>{panier.produit}</td>
              <td>{panier.quantite}</td>
              <td>{panier.prix}</td>
              <td>
                <button onClick={() => handleDelete(panier.id)} className="btn btn-danger">
                  <FaTrashAlt />
                </button>
                <button onClick={() => handleMessage(panier)} className="btn btn-primary">
                  <FaEnvelope />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedPanier && (
        <MessageModal
          show={showModal}
          handleClose={handleCloseModal}
          panier={selectedPanier}
        />
      )}
    </div>
  );
};

export default Gestiondevente;
