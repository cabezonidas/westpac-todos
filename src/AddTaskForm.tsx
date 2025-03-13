import "./AddTaskForm.css";

export const AddTaskForm = ({
  onAdded,
}: {
  onAdded: (value: string) => void;
}) => {
  const id = "new-task";
  return (
    <form
      className="AddTaskForm"
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        onAdded(formData.get(id)!.toString());
        e.currentTarget.reset();
      }}
      autoComplete="off"
    >
      <label htmlFor={id}></label>
      <input required id={id} name={id} />
      <button>Add</button>
    </form>
  );
};
