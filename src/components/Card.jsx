import React, { useState } from 'react';
import '../css/Card.css';
import changeIcon from '/img/icons8-add-50.png';
import PopupMenu from './popup';
import { useDispatch, useSelector } from 'react-redux'
import { addAccount } from '../store/actions/accountActions';
import { addType } from '../store/actions/typeActions';
import CategoryPopupMenu from './CategoryPopup';

const Card = ({ title, subtitle, children, forMock }) => {
  const [showPopup, setShowPopup] = useState(false);
  const dispatch = useDispatch();
  const [showCategoryPopup, setShowCategoryPopup] = useState(false);

  const handleSave = (newItem) => {
    dispatch(addAccount(newItem))
    setShowPopup(false);
  };

  const handleSaveType = (newItem) => {
    dispatch(addType(newItem))
    setShowCategoryPopup(false);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setShowCategoryPopup(false);
  };

  // console.log(title, subtitle, children);

  return (
    <div className="operation-card">
      <div className="card-header">
        <h3>{title}</h3>

        {forMock === "EXPENSES" ? (<>

          <button className="icon-button" onClick={() => setShowCategoryPopup(true)}>
            <img src={changeIcon} alt="Добавить аккаунт" />
          </button>
          {showCategoryPopup && <CategoryPopupMenu onSave={handleSaveType} onClose={() => setShowCategoryPopup(false)} />}
        </>

        ) : forMock === "ACCOUNTS" ? (
          <>
            <button
              className="icon-button"
              onClick={() => setShowPopup(true)}
            >
              <img src={changeIcon} alt="Добавить аккаунт" />
            </button>

            {showPopup && (
              <PopupMenu
                onSave={handleSave}
                onClose={handleClosePopup}
              />
            )}
          </>
        ) : null}

        {subtitle && <p className="subtitle">{subtitle}</p>}
      </div>
      <div className="card-body">
        {children}
      </div>
    </div>
  );
};

export default Card;