import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Box, Container, IconButton, InputBase } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { DataGrid } from "@mui/x-data-grid";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import UsersData from "./data/members.json";

const useStyles = makeStyles({
    searchInput: {
        margin: "1rem 0",
        width: "100%",
        display: "flex",
        border: "1px solid #0000003b",
        borderRadius: 5,
    },

    dataGridContainer: {
        width: "100%",
        flexGrow: 1,
    },

    noBorder: {
        border: "none",
    },

    removeFocus: {
        "&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus, &.MuiDataGrid-root .MuiDataGrid-columnHeader:focus-within, &.MuiDataGrid-root .MuiDataGrid-cell:focus":
            {
                outline: "none",
            },
    },
});

const columns = [
    {
        field: "name",
        headerName: "Name",
        flex: 0.5,
        minWidth: 150,
    },
    {
        field: "car",
        headerName: "Car number",
        flex: 0.5,
        minWidth: 150,
        sortable: false,
    },
    {
        field: "houseNumber",
        headerName: "House number",
        flex: 0.3,
        minWidth: 50,
        description: "This column has a value getter and is not sortable.",
    },
    {
        field: "contact",
        headerName: "Contact number",
        type: "number",
        flex: 0.5,
        minWidth: 150,
        sortable: false,
        description: "This column has a value getter and is not sortable.",
        valueFormatter: (params) => {
            const valueFormatted = Number(params.value);
            return valueFormatted;
        },
    },
];

const App = () => {
    const styles = useStyles();

    const [usersData, setUsersData] = useState([]);
    const [filteredUsersData, setFilteredUsersData] = useState([]);

    useEffect(() => {
        setUsersData(UsersData);
        setFilteredUsersData(UsersData);
    }, []);

    const handleOnChange = (event) => {
        const inputValue = _.get(event, "target.value");
        const localUsersData = [...usersData];

        const filteredList = inputValue
            ? _.filter(localUsersData, function (data) {
                  return (
                      _.includes(_.toLower(data.name), inputValue) ||
                      _.includes(_.toLower(data.car), inputValue) ||
                      _.includes(_.toLower(data.houseNumber), inputValue) ||
                      _.includes(_.toLower(data.contact), inputValue)
                  );
              })
            : usersData;

        setFilteredUsersData(filteredList);
    };

    return (
        <Container>
            <Box className={styles.searchInput}>
                <IconButton type="submit" aria-label="search">
                    <SearchOutlinedIcon />
                </IconButton>

                <InputBase
                    placeholder="Search"
                    onChange={handleOnChange}
                    sx={{
                        flex: 1,
                    }}
                />
            </Box>

            <Box className={styles.dataGridContainer}>
                <DataGrid
                    rows={filteredUsersData}
                    columns={columns}
                    className={styles.removeFocus}
                    pageSize={5}
                    rowsPerPageOptions={[5, 10, 20]}
                    getRowId={(row) => row._id}
                    autoHeight
                    disableColumnMenu
                    hideFooterSelectedRowCount
                />
            </Box>
        </Container>
    );
};

export default App;
