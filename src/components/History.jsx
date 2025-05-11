import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { deleteHistory, updateHistory } from '../store/actions/historyActions';
import '../css/History.css';
import { fetchHistory } from '../store/actions/historyActions';
import { fetchTypes } from '../store/actions/typeActions';
import { fetchAccounts } from '../store/actions/accountActions';

const History = ({ history, rerenderTree }) => {
    const dispatch = useDispatch();
    const { data: types = [] } = useSelector((state) => state.types || []);
    const { items: accounts = [] } = useSelector((state) => state.account || {});

    const [editingItem, setEditingItem] = useState(null);
    const [historyData, setHistoryData] = useState([]);

    useEffect(() => {
        setHistoryData(history);
    }, [history]);

    const handleEditClick = (item) => {
        setEditingItem({ ...item });
    };

    const handleSave = async () => {
        if (!editingItem) return;
    
        const originalItem = history.find(h => h.id === editingItem.id);
        const newAmount = editingItem.amount;
        const oldAmount = originalItem.amount;
    
        try {
            
            const oldBank = accounts.find(account => account.name === originalItem.bank);
            const newBank = accounts.find(account => account.name === editingItem.bank);
            if (newAmount !== oldAmount || oldBank !== newBank) {
                
                if (oldBank) {
                    await axios.put(
                        `https://681a187b1ac115563507c648.mockapi.io/accounts/${oldBank.id}`,
                        { amount: oldBank.amount + oldAmount },{ withCredentials: false }
                    );
                }
    
                
                if (newBank) {
                    await axios.put(
                        `https://681a187b1ac115563507c648.mockapi.io/accounts/${newBank.id}`,
                        { amount: newBank.amount - newAmount },{ withCredentials: false }
                    );
                }
            }
    
            const oldType = types.find(type => type.name === originalItem.category);
            const newType = types.find(type => type.name === editingItem.category);
            if (newAmount !== oldAmount || oldType !== newType) {
                
                if (oldType) {
                    await axios.put(
                        `https://681a187b1ac115563507c648.mockapi.io/types/${oldType.id}`,
                        { amount: oldType.amount - oldAmount },{ withCredentials: false }
                    );
                }
    
                
                if (newType) {
                    await axios.put(
                        `https://681a187b1ac115563507c648.mockapi.io/types/${newType.id}`,
                        { amount: newType.amount + newAmount },{ withCredentials: false }
                    );
                }
            }
            await dispatch(updateHistory(editingItem.id, editingItem));
            setEditingItem(null);
            rerenderTree();
            await dispatch(fetchAccounts());
            await  dispatch(fetchTypes());
            await dispatch(fetchHistory());

    
        } catch (error) {
            console.error("Ошибка при обновлении истории, банка или категории:", error);
        }
    };

    const handleDelete = (id) => {
        dispatch(deleteHistory(id)).then(() => {
            rerenderTree();
        });
    };

    return (
        <div className="history-container">
            {historyData
                .slice()
                .sort((a, b) => parseInt(b.id) - parseInt(a.id))
                .map(item => {
                    const date = new Date(item.date);
                    const formattedDate = date.toLocaleDateString('ru-RU');
                    // console.log(item)
                    return (
                    
                        <div key={item.id} className="history-item">
                            <div className='history-left'>
                                <div className='history-icon'>🏦</div>
                                <div className='history-info'>
                                    <div className='history-from'>{item.bank}</div>
                                    <div className='history-to'>{item.comment}</div>
                                </div>
                            </div>
                            <div className='history-right'>
                                <div className='history-amount'>- {item.amount} ₽</div>
                                <div className='history-date'>{formattedDate}</div>
                                <div className='edit-delete-buttons'>
                                    <button onClick={() => handleEditClick(item)}>✏️</button>
                                    <button onClick={() => handleDelete(item.id)}>🗑️</button>
                                </div>
                            </div>
                        </div>
                    );
                })}

            {editingItem && (

                <div className="popup-overlay">
                    <div className="popup">
                        <h3>Редактировать операцию</h3>
                        {/* {console.log(editingItem)} */}
                        <label>Дата</label>
                        <input
                            type="date"
                            value={editingItem.date || ''}
                            onChange={(e) => setEditingItem({ ...editingItem, date: e.target.value })}
                        />

                        <label>Комментарий</label>
                        <input
                            type="text"
                            value={editingItem.comment || ''}
                            onChange={(e) => setEditingItem({ ...editingItem, comment: e.target.value })}
                        />

                        <label>Категория</label>
                        <select
                            value={editingItem.category || ''}
                            onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                        >
                            <option value="">Выберите</option>
                            {types.map(type => (
                                <option key={type.id} value={type.name}>{type.name}</option>
                            ))}
                        </select>

                        <label>Сумма</label>
                        <input
                            type="number"
                            value={editingItem.amount || ''}
                            onChange={(e) => setEditingItem({ ...editingItem, amount: Number(e.target.value) })}
                        />

                        <label>Банк</label>
                        <select
                            value={editingItem.bank || ''}
                            onChange={(e) => setEditingItem({ ...editingItem, bank: e.target.value })}
                        >
                            <option value="">Выберите</option>
                            {accounts.map(account => (
                                <option key={account.id} value={account.name}>{account.name}</option>
                            ))}
                        </select>

                        <div className="popup-actions">
                            <button onClick={handleSave}>💾 Сохранить</button>
                            <button onClick={() => setEditingItem(null)}>❌ Отмена</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default History;
