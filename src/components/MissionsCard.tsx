import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  root: {
    width: 500,
    height: 150,
    marginTop: 50,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

/**
 * @param {buttonTitle} - updates text of button title
 * @param {disabled} - boolean value to handle disabling button when clicked
 * @param {missionName} - name of mission
 * @param {missionDate} - date of mission
 * @param {rocketName} - name of rocket
 * @returns card item to display mission details
 * 
**/

const MissionsCard: React.FC<{
  buttonTitle: string;
  disabled: boolean;
  missionName: string;
  missionDate: string;
  rocketName: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}> = ({ buttonTitle, disabled, missionName, missionDate, rocketName, onClick }) => {
  const classes = useStyles();

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card className={classes.root}>
        <CardContent>
          <h4>Mission: {missionName || "N/A"}</h4>
          <h4>Rocket: {rocketName || "N/A"}</h4>
          <h4>{new Date(missionDate).toDateString() }</h4>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={onClick} disabled={disabled}>
            {buttonTitle}
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};
export default MissionsCard;
