import React, { useState } from 'react';
import List from '../List';

import './addListButton.css';
import closeSvg from '../../asserts/close.svg';

//компонент в виде кнопки для добавления компоненов списка
//вслывабщее окно на 30 строке

const AddButtonList = () => {

    //состояние для клика 

    const [state, setState] = useState(false);

    return (
        <div className='add-list'>
            <List
            //конвертация false в true и обратно при клике на "Добавить заметку" (показывает/скрывает окно)
            onClick={() => setState(!state)}
             items= {[
            {
            icon : <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 1V11" stroke="#868686" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M1 6H11" stroke="#868686" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            ,
            name: 'Добавить заметку',
            }
        
            ]} />
            
            { //передача true/false для всплытия окна
            state && <div className='add-list-popup'> 
            <img 
            //скрытие окна при нажатии на крестик
                onClick={() => setState(false) }
                src={closeSvg} alt='Close' className='add-list-popup-close-btn' />
                <input className='field' type="text" placeholder="Название заметки" />
                <button className='button'>Добавить</button>
            </div> }
        </div>
    );
    
    
    };



export default AddButtonList;