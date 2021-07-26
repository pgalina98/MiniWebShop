import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import SwipeableViews from "react-swipeable-views";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";

import Product from "../components/Product";
import api from "../utils/api";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  font: {
    fontFamily: "Arial",
    fontSize: "13px",
  },
});

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={2}>{children}</Box>}
    </div>
  );
};

const HomeScreen = () => {
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = useState(0);
  const [products, setProducts] = useState({ isFetching: true, data: [] });

  useEffect(() => {
    const getProducts = async () => {
      setProducts({ isFetching: true });

      await api
        .get("/products")
        .then(({ data }) => {
          setProducts({ isFetching: false, data });
        })
        .catch((error) => console.log("ERROR: ", error));
    };

    getProducts();
  }, []);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Paper className={classes.root}>
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Show Products as Cards" className={classes.font} />
        <Tab label="Show Products as Data table" className={classes.font} />
      </Tabs>
      <SwipeableViews
        axis="x"
        index={selectedTab}
        onChangeIndex={handleTabChange}
      >
        <TabPanel value={selectedTab} index={0} dir="x">
          {products.isFetching ? (
            <CircularProgress />
          ) : (
            <div className="row center">
              {products.data.map((product) => {
                return <Product key={product.id} product={product} />;
              })}
            </div>
          )}
        </TabPanel>
        <TabPanel value={selectedTab} index={1} dir="x">
          Item Two
        </TabPanel>
      </SwipeableViews>
    </Paper>
  );
};

export default HomeScreen;
