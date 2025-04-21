import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaPlus, FaLandmark, FaComments, FaBell, FaUsers, FaUserCircle, FaShoppingCart, FaSignOutAlt, FaTasks } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './navbar.css';
import Conversation from '../pages/conversation'; // Adjust the import path accordingly

function Navigation() {
  const [showConversationsModal, setShowConversationsModal] = useState(false);
  const [conversations, setConversations] = useState([
    // Mock data for demonstration, replace with actual data fetching
    { name: 'Agriculteur 1', lastMessage: 'Bonjour, comment ça va?' },
    { name: 'Agriculteur 2', lastMessage: 'Je suis intéressé par vos produits.' }
  ]);

  const handleDiscussionClick = (e) => {
    e.preventDefault();
    setShowConversationsModal(true);
  };

  const handleCloseConversationsModal = () => setShowConversationsModal(false);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-green">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#myNavbar">
            <span className="navbar-toggler-icon"></span>
          </button>
          <a className="navbar-brand" href="/home">AgriCOOLWeb</a>
          <div className="collapse navbar-collapse" id="myNavbar">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item"><NavLink className="nav-link" to="/home"><FaHome /> Accueil</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/notifications"><FaBell /> Notifications</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/ajouterproduit"><FaPlus /> Ajouter des produits</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/ajouterterrain"><FaPlus /> Ajouter Terrain</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/listedeterrains"><FaLandmark /> Terrains</NavLink></li>
              <li className="nav-item">
                <NavLink className="nav-link" to="#" onClick={handleDiscussionClick}>
                  <FaComments /> Discussion
                </NavLink>
              </li>
              <li className="nav-item"><NavLink className="nav-link" to="/post"><FaUsers /> Expériences et orientations</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/profil"><FaUserCircle /> Compte</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/panier"><FaShoppingCart /> Panier</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/tableaudeboard"><FaTasks /> Gestion de vente</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/deconnecter"><FaSignOutAlt /> Déconnexion</NavLink></li>
            </ul>
          </div>
        </div>
      </nav>

      <Conversation show={showConversationsModal} handleClose={handleCloseConversationsModal} conversations={conversations} />
    </>
  );
}

export default Navigation;
