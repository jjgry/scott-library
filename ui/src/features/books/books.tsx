import {
  DataTable,
  DataTableFilterMeta,
  DataTableRowClickEvent,
} from "primereact/datatable";
import { Column, ColumnFilterElementTemplateOptions } from "primereact/column";
import { Tag } from "primereact/tag";
import { Dropdown } from "primereact/dropdown";
import { MultiSelect, MultiSelectChangeEvent } from "primereact/multiselect";
import { useBooks } from "./book.service";
import { Book } from "./book.model";
import { useState } from "react";
import { BookForm } from "./book-form";
import "./book.scss";

const columns = [
  { title: "tag", header: "Tag" },
  { title: "title", header: "Title" },
  { title: "isbn", header: "ISBN" },
  { title: "authors", header: "Author(s)" },
  { title: "locations", header: "Location(s)" },
  { title: "borrower", header: "Borrower" },
];

export const Books = () => {
  const { books, refreshBooks } = useBooks();
  const [visibleColumns, setVisibleColumns] = useState(columns);
  const [formVisible, setFormVisible] = useState(false);
  const [formId, setFormId] = useState("");

  const locations = Array.from(
    new Set(books.map((book) => book.locations).flatMap((x) => x))
  );

  const filters: DataTableFilterMeta = {
    title: { value: null, matchMode: "contains" },
    isbn: { value: null, matchMode: "startsWith" },
    authors: { value: null, matchMode: "contains" },
    locations: { value: null, matchMode: "contains" },
    borrower: { value: null, matchMode: "contains" },
  };

  const handleRowClick = (e: DataTableRowClickEvent) => {
    const book = e.data as Book;
    setFormVisible(true);
    setFormId(book.id);
  };

  const isColumnHidden = (columnId: string) =>
    !visibleColumns.map((c) => c.title).includes(columnId);

  const authorsBodyTemplate = (rowdata: Book) => rowdata.authors?.join(", ");

  const locationsBodyTemplate = (rowdata: Book) => (
    <>
      {rowdata.locations?.map((location) => (
        <Tag
          key={location}
          className={`location-${location.toLocaleLowerCase()}`}
          value={location}
        />
      ))}
    </>
  );

  const borrowerBodyTemplate = (rowdata: Book) => {
    const isBorrowed = !!rowdata.borrower;
    return (
      <div className="on-loan">
        <i className={`pi ${isBorrowed ? "pi-check" : "pi-times"}`} />
        {isBorrowed && <span>{rowdata.borrower}</span>}
      </div>
    );
  };

  const locationsFilterTemplate = (
    options: ColumnFilterElementTemplateOptions
  ) => (
    <Dropdown
      value={options.value}
      options={locations}
      onChange={(e) => options.filterApplyCallback(e.value)}
      placeholder="Select a location"
      className="p-column-filter"
      showClear
    />
  );

  const onColumnToggle = (event: MultiSelectChangeEvent) =>
    setVisibleColumns(event.value);

  const headerTemplate = (
    <>
      <span className="logo">Scott Library</span>
      <span className="p-float-label">
        <MultiSelect
          value={visibleColumns}
          options={columns}
          optionLabel="header"
          onChange={onColumnToggle}
          display="chip"
        />
        <label htmlFor="ms-columns">Select Columns to Display</label>
      </span>
    </>
  );

  return (
    <div className="books">
      <BookForm
        id={formId}
        visible={formVisible}
        setVisible={setFormVisible}
        refreshBooks={refreshBooks}
      />
      <DataTable
        value={books}
        responsiveLayout="scroll"
        filters={filters}
        header={headerTemplate}
        scrollable
        scrollHeight="flex"
        onRowClick={handleRowClick}
        rowHover
        reorderableColumns
        resizableColumns
        filterDisplay="row" // TODO: Investigate why "menu" causes filter to break
      >
        <Column
          style={{ maxWidth: "10%" }}
          field="tag"
          header="Tag"
          sortable
          filter
          filterPlaceholder="Search by tag"
          hidden={isColumnHidden("tag")}
        />
        <Column
          style={{ minWidth: "30%" }}
          field="title"
          header="Title"
          filter
          filterPlaceholder="Search by title"
          sortable
          hidden={isColumnHidden("title")}
          bodyStyle={{ whiteSpace: "pre-wrap" }}
        />
        <Column
          field="isbn"
          header="ISBN"
          filter
          filterPlaceholder="Search by ISBN"
          hidden={isColumnHidden("isbn")}
        />
        <Column
          field="authors"
          header="Author(s)"
          body={authorsBodyTemplate}
          filter
          filterPlaceholder="Search by author(s)"
          hidden={isColumnHidden("authors")}
        />
        <Column
          field="locations"
          header="Location(s)"
          body={locationsBodyTemplate}
          sortable
          filter
          filterElement={locationsFilterTemplate}
          hidden={isColumnHidden("locations")}
        />
        <Column
          field="borrower"
          header="Borrower"
          sortable
          filter
          filterPlaceholder="Search by borrower"
          body={borrowerBodyTemplate}
          hidden={isColumnHidden("borrower")}
        />
      </DataTable>
    </div>
  );
};
