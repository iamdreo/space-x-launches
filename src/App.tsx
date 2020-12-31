import React, { useEffect, useState } from "react";
import "./App.css";
import Searchbox from "./components/Searchbox";
import Pagination from "@material-ui/lab/Pagination";
import MissionsCard from "./components/MissionsCard";
import CompareDialog from "./components/CompareDialog";
import { fetchedData } from "./services/dataservice";
import { launchesPast, paginationState } from "../src/interfaces";


function App() {
  const [data, setData] = useState<any[] | null>([]);
  const [selected, setSelected] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [selectionInput, setSelectionInput] = useState("mission_name");
  const [state, setState] = useState<paginationState>({
    offset: 0,
    perPage: 20,
    currentPage: 0,
    size: 20,
  });
  const [page, setPage] = React.useState(1);

  useEffect(() => {
    fetchedData()
      .then((data) => setData(data.launchesPast))
      .catch(() => setData(null));
  }, []);

  //listen for changes to selected array, if its up to 2, show dialog
  useEffect(() => {
    if (selected && selected.length === 2) {
      setOpen(true);
    }
  }, [selected]);

  //listen for changes to refresh pagination ui
  useEffect(() => {
    ReceivedData();
  }, [data, state.currentPage, state.offset, selected]);

  //slice data array to perform pagination of items
  const ReceivedData = () => {
    if (data && data.length) {
      const slice = data.slice(state.offset, state.offset + state.perPage);

      const pageData = slice.map((item: launchesPast) => (
        <MissionsCard
          key={item.mission_name}
          buttonTitle={
            selected.includes(item) ? "Selected" : "Click to compare"
          }
          disabled={selected.includes(item)}
          missionName={item.mission_name}
          missionDate={item.launch_date_local}
          rocketName={item.rocket.rocket_name}
          onClick={() => onSelectMission(item)}
        />
      ));

      setState({
        ...state,

        pageCount: Math.ceil(data.length / state.perPage),
        pageData,
      });
    }
  };

  //when user selects a mission, add to selected array to compare
  const onSelectMission = (item: launchesPast) => {
    if (selected.length) {
      setSelected([...selected, item]);
    } else {
      setSelected([item]);
    }
  };

  const onSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setSearchInput(value);
  };

  //when user clicks on search button, if the fields is empty reload data
  //if user selects mission name, filter by mission name results
  //if user selects rocket name, filter by rocket name results
  //reset pagination

  const onSearchButtonClick = async () => {
    setData([]);

    setState({
      ...state,
      currentPage: 0,
      offset: 0,
    });

    setPage(1);
    try {
      let searchData = await fetchedData();

      if (searchInput === "" && searchData && searchData.launchesPast) {
        setData(searchData.launchesPast);
      } else if (
        selectionInput === "mission_name" &&
        searchData &&
        searchData.launchesPast
      ) {
        let requestedData = searchData.launchesPast.filter(
          (item: launchesPast) =>
            item.mission_name.toLowerCase().includes(searchInput.toLowerCase())
        );
        if (requestedData && requestedData.length) {
          setData(requestedData);
        } else {
          setData(null);
        }
      } else if (
        selectionInput === "rocket_name" &&
        searchData &&
        searchData.launchesPast
      ) {
        let requestedData = searchData.launchesPast.filter(
          (item: launchesPast) =>
            item.rocket.rocket_name
              .toLowerCase()
              .includes(searchInput.toLowerCase())
        );
        if (requestedData && requestedData.length) {
          setData(requestedData);
        } else {
          setData(null);
        }
      }
    } catch {
      setData(null);
    }
  };

  const onSelectionchange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    setSelectionInput(value);
  };

  const handlePageClick = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    const selectedPage = value - 1;

    const offset = selectedPage * state.perPage;

    setState({
      ...state,
      currentPage: selectedPage,
      offset: offset,
    });
  };

  return (
    <div className="App">
      <div id="background-image"></div>

      <Searchbox
        onChange={onSearchInputChange}
        onClick={onSearchButtonClick}
        value={searchInput}
        onSelectChange={onSelectionchange}
      />

      {data && !data.length ? (
        <h4 style={{ textAlign: "center" }}>Loading...</h4>
      ) : data && data.length ? (
        <div
          id="card-grid"
        >
          {state.pageData}
        </div>
      ) : (
        <h4 style={{ textAlign: "center" }}>No launches found.. try again</h4>
      )}

      <div style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
        {data && data.length ? (
          <Pagination
            count={state.pageCount}
            page={page}
            style={{ color: "#009949", marginBottom: 50 }}
            shape="rounded"
            color="primary"
            variant="outlined"
            onChange={handlePageClick}
          />
        ) : null}
      </div>
      <CompareDialog
        open={open}
        handleClose={() => {
          setOpen(false);
          setSelected([]);
        }}
        selected={selected}
      />
    </div>
  );
}

export default App;
