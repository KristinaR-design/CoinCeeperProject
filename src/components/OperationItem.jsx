import React from 'react';
import { useState } from 'react';
import '../css/OperationItem.css';
import deleteIcon from '/img/icons8-delete-100.png';
import changeIcon from '/img/icons8-edit-50.png';
import { useDispatch, useSelector } from 'react-redux'
import PopupMenu from './popup';
import CategoryPopupMenu from './CategoryPopup';

import { deleteAccount, updateAccount } from '../store/actions/accountActions';
import { deleteType, updateType } from '../store/actions/typeActions';

const OperationItem = ({ label, value, subitems, icon, color, forMock, id }) => {
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);

  const [showCategoryPopup, setShowCategoryPopup] = useState(false);



  const handleDelete = () => {
    forMock == "ACCOUNTS" ? dispatch(deleteAccount(id)) : forMock == "EXPENSES" ? dispatch(deleteType(id)) : pass
  }


  const handleSave = (newItem) => {
    forMock == "ACCOUNTS" ? dispatch(updateAccount(id, newItem)) : forMock == "EXPENSES" ? dispatch(updateType(id, newItem)) : pass
    setShowPopup(false);
    setShowCategoryPopup(false);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setShowCategoryPopup(false);
  };




  return (

    <div className="card-item" style={{ borderLeft: `6px solid ${color || '#ccc'}` }}>
      {icon && <span className="item-icon">{icon}</span>}
      <div className="item-content">
        <span className="item-label">{label}</span>
        {value && <span className="item-value">{value}</span>}
        {subitems && (
          <div className="subitems">
            {subitems.map((subitem, index) => (
              <span key={index} className="subitem">{subitem}</span>
            ))}
          </div>
        )}
      </div>

      {forMock == "EXPENSES" ? <>
        <button className="icon-button" onClick={() => setShowCategoryPopup(true)}>
          <img src={changeIcon} alt="Изменить" />
        </button>
        {showCategoryPopup && <CategoryPopupMenu onSave={handleSave} onClose={() => setShowCategoryPopup(false)}
          initialData={{
            name: label,
            amount: parseInt(value.replace(/\D/g, ''), 10),
            color: color,
            icon: icon
          }}
        />}
        <button className="icon-button" onClick={() => handleDelete()}>
          <img src={deleteIcon} alt="Удалить" />
        </button>
      </> : forMock == "ACCOUNTS" ? <>
        <button className="icon-button" onClick={() => setShowPopup(true)}>
          <img src={changeIcon} alt="Изменить" />
        </button>

        {showPopup && (
          <PopupMenu
            onSave={handleSave}
            onClose={handleClosePopup}
            initialData={{
              name: label,
              amount: parseInt(value.replace(/\D/g, ''), 10),
              color: color
            }}
          />
        )}

        <button className="icon-button">
          <img src={deleteIcon} alt="Удалить" onClick={() => handleDelete()} />
        </button>
      </> : <></>}

    </div>
  );
};

export default OperationItem;
