import React from 'react';
import penSvg from './pen.svg';
import './tasks.css';

const Tasks = ({list}) => {
    //компонент для правой части туду-лист: загаловок и список
    return (
        <div className="tasks">
            <h2  className="tasks__title">{list.name}
                <img className='tasks__title-pen' src={penSvg} alt='pen' />
            </h2>
            <div className='tasks__items'>
            
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


                
            </div>
        </div>
    )
}

export default Tasks;