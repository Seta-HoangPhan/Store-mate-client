import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import PageviewOutlinedIcon from "@mui/icons-material/PageviewOutlined";
import { Collapse, IconButton, Table as MuiTable } from "@mui/material";
import Paper from "@mui/material/Paper";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useState, type ReactNode } from "react";
import "./index.scss";
import Tooltip from "@components/Tooltip";

export interface Column<T> {
  id: keyof T;
  header: string;
  render: (value: T[keyof T]) => ReactNode;
  width: string;
  align?: "left" | "right" | "center";
}

interface Props<T> {
  data: T[];
  columns: Column<T>[];
  hasAction?: {
    onDetails?: (rowId: number) => void;
    onEdit?: (rowId: number) => void;
    onDelete?: (rowId: number) => void;
  };
  open?: boolean;
}

export default function Table<T extends { id: number }>({
  data,
  columns,
  hasAction,
  open = true,
}: Props<T>) {
  const [page, setPage] = useState(0);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  return (
    <Paper className="table-wrapper">
      <Collapse in={open} timeout="auto" unmountOnExit>
        <TableContainer className="table-container">
          <MuiTable stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map(({ id, header, align, width }) => (
                  <TableCell
                    key={`table-head-cell-${id.toString()}`}
                    align={align || "left"}
                    sx={{ width }}
                    className="table-head__cell"
                  >
                    {header}
                  </TableCell>
                ))}
                {hasAction && <TableCell></TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.slice(0, 10).map((row) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={`table-body-row-${row.id}`}
                  >
                    {columns.map(({ id, align, render }) => {
                      const value = row[id];
                      return (
                        <TableCell
                          key={`table-body-cell-${id.toString()}`}
                          align={align || "left"}
                        >
                          {render(value)}
                        </TableCell>
                      );
                    })}
                    {hasAction && (
                      <TableCell
                        align="center"
                        className="table-body__cell-action"
                      >
                        {hasAction.onDetails && (
                          <Tooltip title="Thông tin chi tiết">
                            <IconButton
                              onClick={() => hasAction.onDetails?.(row.id)}
                            >
                              <PageviewOutlinedIcon color="success" />
                            </IconButton>
                          </Tooltip>
                        )}
                        {hasAction.onEdit && (
                          <Tooltip title="chỉnh sửa thông tin">
                            <IconButton
                              onClick={() => hasAction.onEdit?.(row.id)}
                            >
                              <DriveFileRenameOutlineOutlinedIcon color="primary" />
                            </IconButton>
                          </Tooltip>
                        )}
                        {hasAction.onDelete && (
                          <Tooltip title="xóa">
                            <IconButton
                              onClick={() => hasAction.onDelete?.(row.id)}
                            >
                              <RemoveCircleOutlineOutlinedIcon color="error" />
                            </IconButton>
                          </Tooltip>
                        )}
                      </TableCell>
                    )}
                  </TableRow>
                );
              })}
            </TableBody>
          </MuiTable>
          <TablePagination
            rowsPerPageOptions={[]}
            component="div"
            count={data.length}
            rowsPerPage={10}
            page={page}
            onPageChange={handleChangePage}
          />
        </TableContainer>
      </Collapse>
    </Paper>
  );
}
