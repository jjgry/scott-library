import { Field, Form } from "react-final-form";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Chips } from "primereact/chips";
import { useBook } from "./book.service";
import { Book } from "./book.model";
import "./book.scss";

type BookFormProps = {
  id: string;
  visible: boolean;
  setVisible: any;
};

export const BookForm = ({ id, visible, setVisible }: BookFormProps) => {
  const { book, updateBook } = useBook(id);

  const onSubmit = async (book: Book) => {
    await updateBook(book);
  };

  return (
    <Dialog
      header="Edit book"
      visible={visible}
      style={{ width: "50vw" }}
      onHide={() => setVisible(false)}
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
            <button type="submit">Submit</button>
          </form>
        )}
      />
    </Dialog>
  );
};