import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { Column, ColumnFilterElementTemplateOptions } from "primereact/column";
import { Tag } from "primereact/tag";
import { Dropdown } from "primereact/dropdown";
import { useBooks } from "./books.service";
import { Book } from "./book.model";
import "./books.scss";

export const Books = () => {
  const { books } = useBooks();
  const locations = Array.from(
    new Set(books.map((book) => book.locations).flatMap((x) => x))
  );

  const filters: DataTableFilterMeta = {
    title: { value: null, matchMode: "contains" },
    isbn: { value: null, matchMode: "startsWith" },
    authors: { value: null, matchMode: "contains" },
    locations: { value: null, matchMode: "contains" },
  };

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

  return (
    <div className="books">
      <DataTable
        value={books}
        responsiveLayout="scroll"
        filters={filters}
        filterDisplay="row"
        scrollable 
        scrollHeight="flex"
      >
        <Column
          field="title"
          header="Title"
          filter
          filterPlaceholder="Search by title"
        />
        <Column
          field="isbn"
          header="ISBN"
          filter
          filterPlaceholder="Search by ISBN"
        />
        <Column
          field="authors"
          header="Author(s)"
          body={authorsBodyTemplate}
          filter
          filterPlaceholder="Search by author(s)"
        />
        <Column
          field="locations"
          header="Location(s)"
          body={locationsBodyTemplate}
          filter
          filterElement={locationsFilterTemplate}
        />
      </DataTable>
    </div>
  );
};
