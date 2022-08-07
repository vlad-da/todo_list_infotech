import React from 'react';
import axios from 'axios';
import './List.css';
import removeSvg from './remove.svg';

//компонент меню

function List({items, isRemovable, onClick, onRemove}) {

    //удаление заметки при нажатии на крестик
    const removeList = (item) => {
        if (window.confirm('Вы хотите удалить заметку?')) {
            axios.delete('http://localhost:3001/lists/' + item.id).then(() => {
                onRemove(item);
            });

        }
    };  
    return ( 
        //создание компонентов из данных <List items /> из App.js
    <ul onClick={onClick} className="list">
        {items.map((item, index)=> (
                //в li назначение класса для каждого компонента для выделения элемента, либо пустой класс
                //в {i} выбор  либо иконки, либо цвета
                <li key={index} className={item.active ? 'active' : ''}>
                    <i>
                        {item.icon ? ( item.icon) : ( <i className={'badge'}></i> )}
                    </i>
                    <span>{item.name}</span>
                    {isRemovable && <img className='list__remove-icon' src={removeSvg} alt="remove" onClick={() => removeList(item)}/>}
                </li>
        ))}
                
    </ul>
    ); 
};

export default List;
