import React from "react";
import { Link } from "react-router-dom";
import { Button, Item, Segment } from "semantic-ui-react";
import { Competition } from "../../../app/models/competition";

interface Props {
  competition: Competition;
}

export default function ActivityListItem({ competition }: Props) {



  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size="tiny" circular src="/assets/user.png" />
            <Item.Content>
              <Item.Header as={Link} to={`/competitions/${competition.id}`}>
                {competition.title}
              </Item.Header>
              <Item.Description>Hosted by bob</Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment secondary>
        Attendees go here
      </Segment>
      <Segment clearing>
        <span>{competition.title}</span>
        <Button 
          as={Link}
          to={`/competitions/${competition.id}`}
          color='teal'
          floated='right'
          content='View'
        /> 
      </Segment>
    </Segment.Group>
  );
}
