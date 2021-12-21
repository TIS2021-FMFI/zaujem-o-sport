import {Table as BootstrapTable} from "react-bootstrap";
import {SortUp, SortDown} from "react-bootstrap-icons";
import React, {useEffect, useState} from "react";

type columnNamesType = string[];
type rowsType = string[][];

type SortFunction = (i: number, reverse: boolean) => void;

interface TableProps {
  columnNames: columnNamesType,
  rows: rowsType
}

/**
 * General table component.
 * @param columnNames: Array of names.
 * @param rows: Data for the table.
 * Length of one row in `rows` should be the same size as length of `columnNames`.
 * */
export const Table = ({columnNames, rows}: TableProps) => {

  const [sortedRows, setSortedRows] = useState<string[][]>([]);

  /** Sort values by column `i`. */
  const sortColumn: SortFunction = (i, reverse) => {
    setSortedRows([...sortedRows.sort((row1, row2) => {
      return (reverse ? 1 : -1) * (row1[i] > row2[i] ? 1 : row1[i] < row2[i] ? -1 : 0);
    })]);
  }

  useEffect(() => {
    setSortedRows([...rows]);
  }, [columnNames, rows]);

  return (
  	<BootstrapTable striped bordered responsive="xl">
      <TableHead columnNames={columnNames} sort={sortColumn} />
      <TableBody rows={sortedRows} />
    </BootstrapTable>
  )
}

interface TableHeadProps {
  columnNames: columnNamesType,
  sort: SortFunction
}

const TableHead = ({columnNames, sort}: TableHeadProps) => {

  /**
   * Determine icon for next ordering and switching between descending & ascending ordering.
   * i-th boolean value corresponds to i-th column.
   * */
  const [iconsSwitch, setIconsSwitch] = useState<boolean[]>([]);

  useEffect(() => {
    setIconsSwitch(Array(columnNames.length).fill(true));
  }, [columnNames]);

  const switchIcon = (i: number) =>  {
    const _iconsSwitch = [...iconsSwitch];
    _iconsSwitch[i] = !_iconsSwitch[i];
    setIconsSwitch(_iconsSwitch);
  }

  const iconProps = {
    className: "ms-1 cursor-pointer",
    size: 19
  }
  const SortDownIcon = <SortDown {...iconProps} />
  const SortUpIcon = <SortUp {...iconProps} />

  return (
    <thead>
    <tr>
      { columnNames.map((column, i) =>
        <th key={`column-name-${i}`}>
          <div
            className={`d-flex align-items-center`}
            onClick={(e_) => {
              sort(i, iconsSwitch[i]);
              switchIcon(i);
            }}
          >
            {column}
            {iconsSwitch[i] ? SortDownIcon : SortUpIcon}
          </div>
        </th>
      )}
    </tr>
    </thead>
  )
}

interface TableBodyProps {
  rows: rowsType
}

const TableBody = ({rows}: TableBodyProps) => {
  return (
    <tbody>
    { rows.map((row, i) =>
      <tr key={`row-${i}`}>
        { row.map((cellValue, j) =>
          <td key={`cell-${i}-${j}`}>{cellValue}</td>
        )}
      </tr>
    )}
    </tbody>
  )
}