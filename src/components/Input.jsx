import React, { useState } from 'react';
import '../css/Input.css';

const Input = ({ onAddCard, types, banks }) => {
  const [selectedBank, setSelectedBank] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [comment, setComment] = useState('');
  const [operationType, setOperationType] = useState('');

  const handleSubmit = () => {
    if (!operationType) {
      alert('Выберите тип операции (доход/расход)');
      return;
    }

    if (!selectedBank || !amount || !date) {
      alert('Заполните все обязательные поля!');
      return;
    }

    if (operationType === 'expense' && !selectedType) {
      alert('Для расхода необходимо выбрать категорию');
      return;
    }

    const selectedBankObj = banks.find(b => b.id == selectedBank);
    const bankName = selectedBankObj?.name || '';

    const newCard = {
      id: Date.now(),
      category: operationType === 'expense' 
        ? types.find(t => t.id == selectedType)?.name || 'Без категории'
        : 'Доход',
      amount: Number(amount),
      date,
      comment,
      operationType,
      bank: bankName,
      type: operationType === 'expense' 
        ? types.find(t => t.id == selectedType)?.name || ''
        : '',
      icon: operationType === 'expense'
        ? types.find(t => t.id == selectedType)?.icon || ''
        : '💵',
      color: operationType === 'expense'
        ? types.find(t => t.id == selectedType)?.color || ''
        : '#A8E4A0' 
    };

    onAddCard(newCard);

    setSelectedBank('');
    setSelectedType('');
    setAmount('');
    setDate('');
    setComment('');
    setOperationType('');
  };

  return (
    <div className="main">
      <div className="operation-buttons">
        <button
          className={`operation-button ${operationType === 'income' ? 'active' : ''}`}
          onClick={() => setOperationType('income')}
        >
          Доход
        </button>
        <button
          className={`operation-button ${operationType === 'expense' ? 'active' : ''}`}
          onClick={() => setOperationType('expense')}
        >
          Расход
        </button>
      </div>

      {operationType && (
        <>
          <select
            value={selectedBank}
            onChange={(e) => setSelectedBank(e.target.value)}
            className="from-input"
          >
            <option value="">Выбери банк</option>
            {banks.map(bank => (
              <option key={bank.id} value={bank.id}>
                {bank.name}
              </option>
            ))}
          </select>

          {operationType === 'expense' && (
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="type-input"
            >
              <option value="">Выбери категорию расхода</option>
              {types.map(type => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
          )}

          <input
            placeholder="Сумма:"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="bill-input"
          />

          <input
            placeholder="Дата:"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="date-input"
          />

          <input
            placeholder="Комментарий:"
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="comment-input"
          />

          <button className="input-button" onClick={handleSubmit}>+</button>
        </>
      )}
    </div>
  );
};

export default Input;