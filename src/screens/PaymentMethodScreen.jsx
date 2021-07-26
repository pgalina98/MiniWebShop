import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import PaymentIcon from "@material-ui/icons/Payment";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Box from "@material-ui/core/Box";

import { savePaymentMethod } from "../actions/cartActions";
import OrderCheckoutSteps from "../components/OrderCheckoutSteps";

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

const PaymentMethodScreen = (props) => {
  const classes = useStyles();

  const orderDetails = useSelector((state) => state.orderDetails);
  const [creditCardNumber, setCreditCardNumber] = useState("");

  if (!orderDetails) {
    props.history.push("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("Kartično");

  const dispatch = useDispatch();

  const handleChangePaymentMethod = (event) => {
    setPaymentMethod(event.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(savePaymentMethod(paymentMethod));
    props.history.push("/discountCode");
  };

  return (
    <div>
      <OrderCheckoutSteps step1 step2 />
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Payment Method</h1>
        </div>
        <FormControl component="fieldset">
          <RadioGroup
            aria-label="paymentMethod"
            name="paymentMethod"
            value={paymentMethod}
            onChange={handleChangePaymentMethod}
          >
            <FormControlLabel
              value="Kartično"
              control={<Radio />}
              label={
                <Box component="div" fontSize={15}>
                  Kartično
                </Box>
              }
            />
            <FormControlLabel
              value="Gotovinsko"
              control={<Radio />}
              label={
                <Box component="div" fontSize={15}>
                  Gotovinsko
                </Box>
              }
            />
          </RadioGroup>
        </FormControl>

        <div
          style={
            paymentMethod === "Kartično"
              ? { display: "block" }
              : { display: "none" }
          }
        >
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <PaymentIcon fontSize="large" />
            </Grid>
            <Grid item>
              <TextField
                id="input-with-icon-grid"
                label="Enter Credit Card number"
                onChange={(e) => setCreditCardNumber(e.target.value)}
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
            disabled={paymentMethod === "Kartično" && creditCardNumber === ""}
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentMethodScreen;
