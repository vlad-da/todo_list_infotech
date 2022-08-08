import React, {useState} from 'react';
import axios from 'axios';

import plusSvg from './plus.svg';

//компонент для добавления задачи
const AddTaskForm = ({list, onAddTask}) => {

    //состояние скрытия окна
    const [vivbleForm, setVisibleForm] = useState(false);

    //состояние для ввода в форму
    const [inputValue, setInputValue] = useState('');

    //состояние отправки
    const [isLoad, setIsLoad] = useState('');

    //скрытие формы
    const toggleFormVisible = () => {
        setVisibleForm(!vivbleForm);
        setInputValue('');
    };

    //запись заданий в бд
    const addTask = () => {
        const obj = {
            listId: list.id,
            text: inputValue,
            completed: false
        };
        if (inputValue.length !== 0) {
            setIsLoad(true);
            axios.post('http://localhost:3001/tasks', obj).then(({data}) => {
                onAddTask(list.id, data);
                toggleFormVisible();
            }).catch(() => {
                alert('Ошибка добавления задачи');
            }).finally(() => {
                setIsLoad(false);
            });
        } else {
            alert('Введите что-нибудь перед отправкой');
        }

    };

    return (
        <div className="tasks__form">
            {!vivbleForm ? 
                <div onClick={toggleFormVisible} className="tasks__form-new">
                    <img src={plusSvg} alt="plus" />
                    <span>Новая задача</span>
                </div>
            : 
            <div className="tasks__form-block">
                <input value={inputValue} onChange={e => setInputValue(e.target.value)} className='field' type="text" placeholder="Текст задачи" />
                <button disabled={isLoad} onClick={addTask} className='button'>{isLoad ? 'Доавление...' : 'Добавить задачу'}</button>
                <button onClick={toggleFormVisible} className='button button--grey'>Отмена</button>
            </div>
            }
            
            
            
        </div>
    );
}

export default AddTaskForm;