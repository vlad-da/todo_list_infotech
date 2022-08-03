import React from 'react';
import './List.css';

//компонент меню

function List({items, isRemovable}) {

    return ( 
        //создание компонентов из данных <List items /> из App.js
    <ul className="list">
        {items.map(item => (
                //в li назначение класса для каждого компонента для выделения элемента, либо пустой класс
                //в {i} выбор  либо иконки, либо цвета
                <li className={item.active ? 'active' : ''}>
                    <i>
                        {item.icon ? ( item.icon) : ( <i className={`badge badge--${item.color}`}></i> )}
                    </i>
                    <span>{item.name}</span>
                </li>
        ))}
                
    </ul>
    ); 
};

export default List;
