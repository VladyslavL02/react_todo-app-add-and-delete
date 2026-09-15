/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import cn from 'classnames';
import { useEffect, useState } from 'react';
import { deleteTodo } from '../../api/todos';

type Props = {
  completed: boolean;
  title: string;
  isActive?: boolean;
  todoId: number;
  handleTodoDeletion?: (status: boolean, id?: number) => void;
  activeTodos: number[];
};

export const Todo: React.FC<Props> = ({
  completed,
  title,
  isActive = false,
  todoId,
  handleTodoDeletion,
  activeTodos,
}) => {
  const [active, setActive] = useState(isActive);

  useEffect(() => {
    if (activeTodos.includes(todoId)) {
      setActive(true);
    }

    if (activeTodos.length === 0 && active) {
      setActive(false);
    }
  }, [activeTodos, todoId]);

  const onTodoDeletion = () => {
    setActive(true);

    deleteTodo(todoId)
      .then(() => {
        handleTodoDeletion?.(true, todoId);
      })
      .catch(() => {
        setActive(false);
        handleTodoDeletion?.(false);
      });
  };

  return (
    <div data-cy="Todo" className={cn('todo', { completed: completed })}>
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          defaultChecked={completed}
        />
      </label>

      <span data-cy="TodoTitle" className="todo__title">
        {title}
      </span>
      <button
        type="button"
        className="todo__remove"
        data-cy="TodoDelete"
        onClick={onTodoDeletion}
      >
        ×
      </button>

      <div
        data-cy="TodoLoader"
        className={cn('modal', 'overlay', { 'is-active': active })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
