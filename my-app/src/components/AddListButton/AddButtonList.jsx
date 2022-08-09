import React, { useState } from 'react';
import axios from 'axios';
import List from '../List';
import './addListButton.css';
import closeSvg from '../../asserts/close.svg';

//компонент в виде кнопки для добавления компоненов списка
//вслывабщее окно на 30 строке

const AddButtonList = ({onAdd}) => {

    //состояние для клика 

    const [state, setState] = useState(false);

    //состояние для вхордящего значения
    const [inputValue, setInputValue] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    //скрывает окно после добавления и очищает форму
    const onClose = () => {
        setState(false);
        setInputValue('');
    };

    //проверка для входящих значений и добавление в бд
    const addList = () => {
        if (!inputValue) {
            alert('Введите название заметки');
            return;
        }
        setIsLoading(true);
        axios.post('http://localhost:3001/lists', {name: inputValue}).then( ({data}) => {
            const listObj = {...data, tasks: []};
            onAdd(listObj);
            onClose();
        }).catch(() => {
            alert('Ошибка добавления списка');
        }).finally(() => {
            setIsLoading(false);
        });

    };
    
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
                onClick={ onClose }
                src={closeSvg} alt='Close' className='add-list-popup-close-btn' />
                <input value={inputValue} onChange={e => setInputValue(e.target.value)} className='field' type="text" placeholder="Название заметки" />
                <button onClick={addList} className='button'>{isLoading ? 'Добавление...' : 'Добавить'}</button>
            </div> }
        </div>
    );
    
    
    };



export default AddButtonList;