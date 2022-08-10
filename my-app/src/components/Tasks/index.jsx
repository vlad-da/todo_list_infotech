import React from 'react';
import axios from 'axios';
import AddTaskForm  from './AddTaskForm';
import Task from './Task';
import penSvg from './pen.svg';

import './tasks.css';

const Tasks = ({list, onEditTitle, onAddTask, onRemoveTask, onEditTask, onCompleteTask}) => {

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
                {list.tasks && !list.tasks.length && <h2>Задачи отсутствуют</h2>}
                {
                    //отображаем все задания в заметке
                    list.tasks && list.tasks.map(task => (
                        //компонент в виде строки списка
                        <Task key={task.id} list={list} onRemove={onRemoveTask} onEdit={onEditTask} {...task} onComplete={onCompleteTask}/>
                    ))
                }

                <AddTaskForm key={list.id} list={list} onAddTask={onAddTask}/> 
                
                
            </div>
        </div>
    )
}

export default Tasks;