import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Box from "@material-ui/core/Box";

import { saveDiscountCode } from "../actions/cartActions";
import OrderCheckoutSteps from "../components/OrderCheckoutSteps";
import MessageBox from "../components/MessageBox";
import api from "../utils/api";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    width: 300,
    margin: 100,
  },
  resize: {
    fontSize: 17,
  },
}));

export default function DiscountCodeScreen(props) {
  const classes = useStyles();
  const [haveDiscountCode, setHaveDiscountCode] = useState("false");
  const [didMount, setDidMount] = useState(false);
  const dispatch = useDispatch();

  const paymentDetails = useSelector((state) => state.paymentDetails);
  const [code, setCode] = useState("");
  const [discountCode, setDiscountCode] = useState([{}]);

  if (!paymentDetails) {
    props.history.push("/payment");
  }

  useEffect(() => {
    setDidMount(true);
    return () => setDidMount(false);
  }, []);

  if (!didMount) {
    return null;
  }

  const handleChangeHaveDiscountCode = (event) => {
    setHaveDiscountCode(event.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const checkIfDiscountExistsAndIsValid = async () => {
      await api
        .get("/discount-codes")
        .then(({ data }) => {
          setDiscountCode(data.filter((item) => item.kod === code));
          dispatch(saveDiscountCode(data.filter((item) => item.kod === code)));
        })
        .catch((error) => console.log("ERROR: ", error));
    };

    if (haveDiscountCode === "true") {
      console.log("DISCOUNT CODE CHECK");
      checkIfDiscountExistsAndIsValid();
    }

    if (
      (haveDiscountCode === "true" &&
        discountCode[0]?.id &&
        !discountCode[0]?.iskoristen) ||
      haveDiscountCode === "false"
    ) {
      props.history.push("/placeorder");
    }
  };

  return (
    <div>
      <OrderCheckoutSteps step1 step2 step3 />
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Discount Code</h1>
        </div>
        <FormControl component="fieldset">
          <RadioGroup
            aria-label="discountCode"
            name="discountCode"
            value={haveDiscountCode}
            onChange={handleChangeHaveDiscountCode}
          >
            <FormControlLabel
              value="true"
              control={<Radio />}
              label={
                <Box component="div" fontSize={15}>
                  I have Discount Code
                </Box>
              }
            />
            <FormControlLabel
              value="false"
              control={<Radio />}
              label={
                <Box component="div" fontSize={15}>
                  I don't have Discount Code
                </Box>
              }
            />
          </RadioGroup>
        </FormControl>
        {(discountCode.length === 0 || discountCode[0].iskoristen === true) && (
          <MessageBox variant="danger">
            Discount Code is expired or invalid! Refresh page and try again.
          </MessageBox>
        )}
        <div
          style={
            haveDiscountCode === "true"
              ? { display: "block" }
              : { display: "none" }
          }
        >
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <CardGiftcardIcon fontSize="large" />
            </Grid>
            <Grid item>
              <TextField
                id="input-with-icon-grid"
                label="Enter Discount Code"
                onChange={(e) => {
                  setCode(e.target.value);
                  setDiscountCode([{}]);
                }}
                InputProps={{
                  classes: {
                    input: classes.resize,
                  },
                }}
                InputLabelProps={{ style: { fontSize: "1.3rem" } }}
              />
            </Grid>
          </Grid>
        </div>

        <div>
          <button
            className="primary"
            type="submit"
            disabled={
              (discountCode.length === 0 && haveDiscountCode === "true") ||
              (haveDiscountCode === "true" && code === "")
            }
          >
            {haveDiscountCode === "true" && discountCode[0]?.id === undefined
              ? "Procced discount code"
              : "Continue"}
          </button>
        </div>
      </form>
    </div>
  );
}
