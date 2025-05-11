import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { DatePicker } from 'antd';
import 'antd/dist/antd.css';
import '../css/StatisticsPage.css';

const StatisticsPage = () => {
    const [cards, setCards] = useState([]);
    const [filteredCards, setFilteredCards] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    useEffect(() => {
        const savedCards = JSON.parse(localStorage.getItem('cards')) || [];
        setCards(savedCards);
        setFilteredCards(savedCards);
    }, []);

    const handleDateFilter = (date, type) => {
        const newFilteredCards = cards.filter(card => {
            const cardDate = new Date(card.date);
            if (type === 'start') {
                setStartDate(date);
                return cardDate >= date && cardDate <= endDate;
            } else if (type === 'end') {
                setEndDate(date);
                return cardDate >= startDate && cardDate <= date;
            }
            return true;
        });
        setFilteredCards(newFilteredCards);
    };

    // Группировка по категории для PieChart и BarChart
    const groupByCategory = (cards) => {
        return cards.reduce((acc, card) => {
            if (!acc[card.category]) {
                acc[card.category] = { income: 0, expense: 0 };
            }
            if (card.operationType === 'income') {
                acc[card.category].income += card.amount;
            } else {
                acc[card.category].expense += card.amount;
            }
            return acc;
        }, {});
    };

    const categoryData = groupByCategory(filteredCards);
    const incomeData = Object.keys(categoryData).map(category => ({
        name: category,
        value: categoryData[category].income,
    }));
    const expenseData = Object.keys(categoryData).map(category => ({
        name: category,
        value: categoryData[category].expense,
    }));

    return (
        <div className="statistics-page">
            <div className="filters">
                <DatePicker
                    onChange={(date) => handleDateFilter(date, 'start')}
                    placeholder="Start Date"
                />
                <DatePicker
                    onChange={(date) => handleDateFilter(date, 'end')}
                    placeholder="End Date"
                />
            </div>

            <div className="charts">
                <div className="pie-chart">
                    <h3>Доходы по категориям</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={incomeData}
                                dataKey="value"
                                nameKey="name"
                                outerRadius={100}
                                fill="#8884d8"
                            >
                                {incomeData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="pie-chart">
                    <h3>Расходы по категориям</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={expenseData}
                                dataKey="value"
                                nameKey="name"
                                outerRadius={100}
                                fill="#82ca9d"
                            >
                                {expenseData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="bar-chart">
                    <h3>Доходы и расходы по категориям</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={incomeData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="value" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default StatisticsPage;
