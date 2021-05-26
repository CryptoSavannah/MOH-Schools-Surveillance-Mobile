import React from "react";
import withObservables from "@nozbe/with-observables";
import {
  ListItem,
  Thumbnail,
  Text,
  Left,
  Body,
  Right,
  Button,
  Icon
} from "native-base";

// We observe and render the counter in a separate component so that we don't have to wait for the database
// until we can render the component. You can also prefetch all data before displaying the list
const RawCounter = ({ count }) => count;
const Counter = withObservables(["observable"], ({ observable }) => ({
  count: observable
}))(RawCounter);

const CustomListItem = ({ patient, onPress, countObservable }) => (
  <ListItem thumbnail onPress={onPress}>
    <Left>
      <Thumbnail square source={require("../assets/logo.png")} />
    </Left>
    <Body>
      <Text>{patient.fname + " " + patient.lname}</Text>
      <Text note numberOfLines={1}>
        {/* Open Cases: <Counter observable={countObservable} /> */}
      </Text>
    </Body>
    <Right>
      <Button transparent onPress={onPress}>
        <Icon name="arrow-forward" />
      </Button>
    </Right>
  </ListItem>
);

export default CustomListItem;