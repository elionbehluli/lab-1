import React, { useEffect } from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import CompetitionList from "./CompetitionList";
// import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
// import LoadingComponents from "../../../app/layout/LoadingComponents";
// import ActivityFilters from "./ActivityFilters";

export default observer(function CompetitionDashboard() {
  const {competitionStore} = useStore();
  const {loadCompetitions, competitionRegistry} = competitionStore;

  useEffect(() => {
    if (competitionRegistry.size === 0 ) loadCompetitions()
  }, [competitionRegistry.size, loadCompetitions])

  // if (activityStore.loadingInitial) return <LoadingComponents content='Loading app' />

  return (
    <Grid>
      <Grid.Column width="10">
        <CompetitionList />
      </Grid.Column>
      <GridColumn width="6">
        {/* <ActivityFilters /> */}
      </GridColumn>
    </Grid>
  );
})
