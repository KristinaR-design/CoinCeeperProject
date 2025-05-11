import React from 'react';
import Card from './Card';
import OperationItem from './OperationItem';
import History from './History';
import '../css/OperationsPage.css';

const OperationsPage = ({ cards, types, banks }) => {
    const monthNames = [
        'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
        'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    ];
    const currentMonth = monthNames[new Date().getMonth()] + " " + new Date().getFullYear();

    const incomeCards = cards.filter(card => card.operationType === 'income');
    const expenseCards = cards.filter(card => card.operationType === 'expense');

    const historyData = [...expenseCards]
        .sort((a, b) => parseInt(b.id) -parseInt(a.id))
        .slice(0, 5)
        .map(card => ({
            id: card.id,
            bank: card.bank || 'Источник',
            comment: card.comment || 'Комментарий',
            amount: card.amount,
            status: true,
            date: card.date,
            category: card.category
        }));

    const rerenderTree = () => {
        console.log("История обновлена");
    };

    return (
        <div className="operations-page" style={{ display: 'flex', gap: '20px' }}>
            <div className="card-container" style={{ flexGrow: 1 }}>
                <Card title="INCOME" subtitle={currentMonth}>
                    {incomeCards.length > 0 ? (
                        incomeCards.map(card => (
                            <OperationItem
                                key={card.id}
                                label={card.source || card.comment || 'Без комментария'}
                                value={`${card.amount} ₽`}
                                icon={card.icon}
                                color={card.color}
                                isEditable={false}
                            />
                        ))
                    ) : (
                        <OperationItem label="Нет доходов" value="" />
                    )}
                </Card>

                <Card title="ACCOUNTS" subtitle="Все добавленные операции" forMock="ACCOUNTS">
                    {banks.length > 0 ? (
                        banks.map(bank => (
                            <OperationItem
                                key={bank.id}
                                label={bank.name}
                                value={`${bank.amount} ₽`}
                                color={bank.color}
                                forMock="ACCOUNTS"
                                id={bank.id}
                            />
                        ))
                    ) : (
                        <OperationItem label="Операций пока нет" value="" />
                    )}
                </Card>

                <Card title="EXPENSES" subtitle={currentMonth} forMock="EXPENSES">
                    {types.length > 0 ? (
                        types.map(type => (
                            <OperationItem
                                key={type.id + '_exp'}
                                label={type.name}
                                value={`${type.amount} ₽`}
                                icon={type.icon}
                                color={type.color}
                                forMock="EXPENSES"
                                id={type.id}
                            />
                        ))
                    ) : (
                        <OperationItem label="Нет расходов" value="" />
                    )}
                </Card>
            </div>

            <div className="history-panel" style={{ width: '300px' }}>
                <h3 className='history-text'>История</h3>
                <History history={historyData} rerenderTree={rerenderTree} />
            </div>
        </div>
    );
};

export default OperationsPage;
