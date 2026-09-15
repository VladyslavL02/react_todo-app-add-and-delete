import { useEffect, useRef } from 'react';

type Props = {
  disableInput: boolean;
  handleNewTodo: (value: string) => Promise<boolean>;
  formFocus: boolean;
  setFormFocus: () => void;
};

export const NewTodo: React.FC<Props> = ({
  handleNewTodo,
  disableInput,
  formFocus,
  setFormFocus,
}) => {
  const inputElement = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // setTimeout(() => {
    inputElement.current?.focus();
    // }, 0);
  }, [formFocus]);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!inputElement.current) {
      return;
    }

    let successfullCompletion;

    await handleNewTodo(inputElement.current.value.trim()).then(
      value => (successfullCompletion = value),
    );

    if (successfullCompletion) {
      if (inputElement.current) {
        inputElement.current.value = '';
      }
    }

    setFormFocus();
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        ref={inputElement}
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        autoFocus
        disabled={disableInput}
      />
    </form>
  );
};
