import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../fichiercss/terrainDem.css';
import Navigation from '../components/navbar';
import MessageModal from '../components/modal';
import { ref, onValue } from 'firebase/database';
import { database } from './firebase';

function Terraindemander() {
  const [terrains, setTerrains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedAgriculteur, setSelectedAgriculteur] = useState(null);

  useEffect(() => {
    fetchTerrains();
  }, []);

  const fetchTerrains = async () => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        throw new Error('ID utilisateur non trouvé dans le stockage local');
      }
      const response = await axios.get(`http://localhost:3001/terraindemander?userId=${userId}`);
      setTerrains(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Erreur lors de la récupération des terrains et des demandeurs d\'offres:', error);
      setError('Erreur lors de la récupération des terrains et des demandeurs d\'offres. Veuillez réessayer.');
      setLoading(false);
    }
  };

  const handleAccept = async (idPanieragriculteur, idTerrain) => {
    try {
      const response = await axios.put(`http://localhost:3001/terraindemander/accepter/${idPanieragriculteur}/${idTerrain}`);
      alert(response.data.message);

      setTerrains(prevTerrains => 
        prevTerrains.map(terrain => 
          terrain.idTerrain === idTerrain ? {
            ...terrain,
            demandeursOffres: terrain.demandeursOffres.filter(demandeur => demandeur.idPanieragriculteur !== idPanieragriculteur)
          } : terrain
        )
      );
    } catch (error) {
      console.error('Erreur lors de l\'acceptation du demandeur:', error);
    }
  };

  const handleDelete = async (idPanieragriculteur) => {
    try {
      await axios.delete(`http://localhost:3001/terraindemander/${idPanieragriculteur}`);
      fetchTerrains();
    } catch (error) {
      console.error('Erreur lors de la suppression du demandeur:', error);
    }
  };

  const handleMessage = (agriculteur) => {
    setSelectedAgriculteur(agriculteur);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedAgriculteur(null);
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>Erreur: {error}</div>;
  }

  return (
    <div>
      <Navigation />
      <div className="container-fluid mt-5">
        <div className="row">
          <div className="col">
            <h1 className="text-center mb-5">Liste des demandeurs d'offre</h1>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="table-responsive">
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>Numéro de terrain</th>
                    <th>Nom demandeur</th>
                    <th>Prénom demandeur</th>
                    <th>Photo demandeur</th>
                    <th>Décision</th>
                  </tr>
                </thead>
                <tbody>
                  {terrains.map(terrain => (
                    <React.Fragment key={terrain.idTerrain}>
                      {terrain.demandeursOffres && terrain.demandeursOffres.length > 0 ? (
                        terrain.demandeursOffres.map(demandeur => (
                          <tr key={demandeur.idPanieragriculteur}>
                            <td>{terrain.idTerrain}</td>
                            <td>{demandeur.Agriculteur && demandeur.Agriculteur.nom}</td>
                            <td>{demandeur.Agriculteur && demandeur.Agriculteur.prenom}</td>
                            <td>
                              {demandeur.Agriculteur && (
                                <img src={`http://localhost:3001/uploads/${demandeur.Agriculteur.photo}`} alt={`${demandeur.Agriculteur.nom} ${demandeur.Agriculteur.prenom}`} className="img-fluid smaller-photo" />
                              )}
                            </td>
                            <td>
                              <i
                                className="bi bi-check-circle-fill text-success me-2"
                                onClick={() => handleAccept(demandeur.idPanieragriculteur, terrain.idTerrain)}
                                style={{ cursor: 'pointer' }}
                              ></i>
                              <i
                                className="bi bi-x-circle-fill text-danger me-2"
                                onClick={() => handleDelete(demandeur.idPanieragriculteur)}
                                style={{ cursor: 'pointer' }}
                              ></i>
                              <i
                                className="bi bi-envelope-fill text-primary"
                                onClick={() => handleMessage(demandeur.Agriculteur)}
                                style={{ cursor: 'pointer' }}
                              ></i>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td>{terrain.idTerrain}</td>
                          <td colSpan="4" className="text-center">Pas des demandeurs d'offres</td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {selectedAgriculteur && (
        <MessageModal
          show={showModal}
          handleClose={handleCloseModal}
          agriculteur={selectedAgriculteur}
        />
      )}
    </div>
  );
}

export default Terraindemander;
