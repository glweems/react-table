import React from "react";
import ReactDataGrid from "react-data-grid";
import "react-data-grid/dist/react-data-grid.css";
const columns = [
  { key: "id", name: "ID", editable: true },
  { key: "title", name: "Title", editable: true },
  { key: "complete", name: "Complete", editable: true },
];

const rows = [
  { id: 0, title: "Task 1", complete: 20 },
  { id: 1, title: "Task 2", complete: 40 },
  { id: 2, title: "Task 3", complete: 60 },
];

export default class BasicGrid extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = { rows };
  }

  onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
    this.setState((state) => {
      const rows = (state as any).rows.slice();
      for (let i = fromRow; i <= toRow; i++) {
        rows[i] = { ...rows[i], ...updated };
      }
      return { rows };
    });
  };
  render() {
    return (
      <ReactDataGrid
        columns={columns}
        rows={this.state.rows}
        onRowsUpdate={(e) => console.log(e)}
        enableFilters
        enableCellDragAndDrop
        // rowGetter={(i) => (this.state as any).rows[i] as string}
        // rowsCount={3}
        // onGridRowsUpdated={this.onGridRowsUpdated}
        // enableCellSelect={true}
      />
    );
  }
}
