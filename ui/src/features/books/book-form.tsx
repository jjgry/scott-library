import { Field, Form } from "react-final-form";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Chips } from "primereact/chips";
import { useBook } from "./book.service";
import { Book } from "./book.model";
import "./book.scss";

type BookFormProps = {
  id: string;
  visible: boolean;
  setVisible: (visible: boolean) => void;
};

export const BookForm = ({ id, visible, setVisible }: BookFormProps) => {
  const { book, updateBook, deleteBook } = useBook(id);

  const onSubmit = async (book: Book) => {
    await updateBook(book);
  };

  const onCancel = () => {
    setVisible(false);
  };

  const onDelete = async () => {
    await deleteBook();
    setVisible(false);
  };

  return (
    <Dialog
      header="Edit book"
      visible={visible}
      style={{ width: "50vw" }}
      onHide={() => setVisible(false)}
      dismissableMask
    >
      <Form
        onSubmit={onSubmit}
        validate={(values) => {
          return {}; // TODO: Add some validation
        }}
        initialValues={book}
        render={({ handleSubmit }) => (
          <form className="book-form" onSubmit={handleSubmit}>
            <Field name="title">
              {({ input }) => (
                <div className="field">
                  <label htmlFor="title">Title</label>
                  <InputText {...input} id="title" />
                </div>
              )}
            </Field>
            <Field name="isbn">
              {({ input }) => (
                <div className="field">
                  <label htmlFor="isbn">ISBN</label>
                  <InputText {...input} id="isbn" />
                </div>
              )}
            </Field>
            <Field name="authors">
              {({ input }) => (
                <div className="field">
                  <label htmlFor="authors">Author(s)</label>
                  <Chips id="authors" {...input} value={[...input.value]} />
                </div>
              )}
            </Field>
            <Field name="locations">
              {({ input }) => (
                <div className="field">
                  <label htmlFor="locations">Location(s)</label>
                  <Chips id="locations" {...input} value={[...input.value]} />
                </div>
              )}
            </Field>
            <div className="button-group">
              <Button
                className="p-button-danger"
                label="Delete"
                icon="pi pi-trash"
                onClick={onDelete}
              />
              <Button
                className="p-button-secondary"
                label="Cancel"
                icon="pi pi-times"
                onClick={onCancel}
              />
              <Button type="submit" label="Save" icon="pi pi-check" />
            </div>
          </form>
        )}
      />
    </Dialog>
  );
};
