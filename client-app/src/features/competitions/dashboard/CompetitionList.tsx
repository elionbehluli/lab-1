import {  useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import axios from 'axios';

export default observer(function ActivityList() {
  const [competitions, setCompetitions] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/competition')
      .then(response => {
        console.log(response);
        setCompetitions(response.data)
      })
  }, [])

  return (
    <>
      {/* {groupedCompetitions.map(([group, competitions]) => (
        <Fragment key={group}>
          <Header sub color="teal">
            {group}
          </Header>
              {competitions.map((competition) => (
                <ActivityListItem key={competition.id} competition={competition} />
              ))}
        </Fragment>
      ))} */}
      <ul>
        {competitions.map((competition: any) => (
          <li key={competition.id}>
            {competition.title}
          </li>
        ))}
      </ul>
      
      
    </>
  );
});
