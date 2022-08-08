import React from 'react';
import axios from 'axios';
import AddTaskForm  from './AddTaskForm';
import penSvg from './pen.svg';

import './tasks.css';

const Tasks = ({list, onEditTitle, onAddTask}) => {

    //изменения названия заметки через prompt
    const editTitle = () => {
        const newTitle = window.prompt('Название заметки', list.name);
        if (newTitle) {
            onEditTitle(list.id, newTitle);
            //изменение названия заметки в бд
            axios.patch('http://localhost:3001/lists/' + list.id, {
                name: newTitle
            }).catch(() => {
                alert('Не удалось обновить название заметки');
            });
        }
    };

    //компонент для правой части туду-лист: загаловок и список
    return (
        <div className="tasks">
            <h2  className="tasks__title">{list.name}
                <img onClick={editTitle} className='tasks__title-pen' src={penSvg} alt='pen' />
            </h2>
            <div className='tasks__items'>
                {!list.tasks.length && <h2>Задачи отсутствуют</h2>}
                {
                    //отображаем все задания в заметке
                    list.tasks.map(task => (
                        <div key={task.id} className='tasks__item-row'>
                            <div className='checkbox'>
                                <input id={`task-${task.id}`} type="checkbox" />
                                <label htmlFor={`task-${task.id}`}>
                                    <svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </label>
                                <p>{task.text}</p>
                            </div>
                        </div>
                    ))
                }

                <AddTaskForm list={list} onAddTask={onAddTask}/> 
                
                
            </div>
        </div>
    )
}

export default Tasks;