import React, { useState } from 'react';
import '../css/PopupMenu.css';

function CategoryPopupMenu({ onSave, onClose, initialData = {} }) {
  const [name, setName] = useState(initialData.name || '');
  const [color, setColor] = useState(initialData.color || '#4ecdc4');
  const [icon, setIcon] = useState(initialData.icon || '');
  const [amount, setAmount] = useState(initialData.amount || "");
  const emojiOptions = ['🚗', '🍔', '🏠', '🛒', '💡', '✈️', '🎁', '📚', '💼', '💊'];

  const handleSave = () => {
    const data = { name, color, icon, amount: Number(amount) };
    onSave(data);
  };

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <h2>Добавить категорию</h2>

        <label>
          Название:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>

        <label>
          Цвет:
          <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
        </label>

        <label>Иконка:</label>
        <div className="emoji-list">
          {emojiOptions.map((emo) => (
            <button
              key={emo}
              type="button"
              className={`emoji-btn ${emo === icon ? 'selected' : ''}`}
              onClick={() => setIcon(emo)}
            >
              {emo}
            </button>
          ))}
        </div>

        <label>
          Сумма:
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </label>

        <div className="popup-actions">
          <button onClick={handleSave} className='save-btn'>Сохранить</button>
          <button onClick={onClose} className='cancel-btn'>Отмена</button>
        </div>
      </div>
    </div>
  );
}

export default CategoryPopupMenu;
