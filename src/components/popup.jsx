import React, { useState } from 'react';
import '../css/popup.css';

function PopupMenu({ onSave, onClose, initialData = {} }) {
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    amount: initialData.amount || '',
    color: initialData.color || '#ff6b6b'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.amount) {
      alert('Пожалуйста, заполните все обязательные поля');
      return;
    }
    onSave({
      name: formData.name,
      amount: Number(formData.amount),
      color: formData.color
    });
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      name: '',
      amount: '',
      color: '#ff6b6b'
    });
    onClose();
  };

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <h3>Добавить новую запись</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Название:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Например: Кредитная карта"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Сумма:</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Например: 7655"
              required
            />
          </div>
          <div className="form-group">
            <label>Цвет:</label>
            <input
              type="color"
              name="color"
              value={formData.color}
              onChange={handleChange}
            />
            <span className="color-preview" style={{ backgroundColor: formData.color }}></span>
          </div>
          
          <div className="button-group">
            <button 
              type="button" 
              onClick={handleClose} // Используем handleClose вместо onClose
              className="cancel-btn"
            >
              Отмена
            </button>
            <button type="submit" className="save-btn">
              Сохранить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PopupMenu;