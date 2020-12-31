import React from "react";
import {
  makeStyles,
  Theme,
  createStyles,
  withStyles,
} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      display: "flex",
      justifyContent: "center",
      marginTop: 50,
    },
    root: {
      padding: "2px 4px",
      display: "flex",
      alignItems: "center",
      width: 600,
    },
    searchInput: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
    formControl: {
      minWidth: 50,
      height: 50,
    },
  })
);

const BootstrapInput = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "label + &": {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: "relative",
      backgroundColor: theme.palette.background.paper,
      border: "1px solid #ced4da",
      fontSize: 16,
      padding: "10px 26px 10px 12px",
      transition: theme.transitions.create(["border-color", "box-shadow"]),

      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
      "&:focus": {
        borderRadius: 4,
        borderColor: "#80bdff",
        boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
      },
    },
  })
)(InputBase);


/**
 * @param {onChange} - updates text of search input element
 * @param {onClick} - handles search when button is clicked
 * @param {value} - returns value of the text input
 * @param {onSelectChange} - handles onchange method when search criteria changes
 * @returns search input box
 */

const Searchbox: React.FC<{
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  value: string;
  onSelectChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}> = ({ onChange, onClick, value, onSelectChange }) => {
  const classes = useStyles();

  return (
    <div className={classes.main}>
      <Paper component="form" className={classes.root}>
        <FormControl>
          <NativeSelect
            id="demo-customized-select-native"
            input={<BootstrapInput />}
            onChange={onSelectChange}
          >
            <option value="mission_name">Mission Name</option>
            <option value="rocket_name">Rocket Name</option>
          </NativeSelect>
        </FormControl>

        <InputBase
          className={classes.searchInput}
          placeholder="Search For Space X Missions"
          inputProps={{ "aria-label": "Search Space X" }}
          onChange={onChange}
          value={value}
          id="search-input"
        />
        <IconButton
          className={classes.iconButton}
          aria-label="search"
          onClick={onClick}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    </div>
  );
};

export default Searchbox;
