import { makeAutoObservable, runInAction } from "mobx";
import { Competition } from "../models/competition";
import agent from "../api/agent";
import {v4 as uuid} from 'uuid';

export default class ActivityStore {
    competitionRegistry = new Map<string, Competition>();
    selectedCompetition: Competition | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this)
    }

    // get competitionsByDate() {
    //     return Array.from(this.competitionRegistry.values()).sort((a, b) => 
    //     // Date.parse(a.date) - Date.parse(b.date));
    // )}

    // get groupedActivities() {
    //     return Object.entries(
    //         this.competitionsByDate.reduce((competitions, competition) => {
    //             // const date = competition.date;
    //             // competitions[date] = competitions[date] ? [...competitions[date], competition] : [competition];
    //             return competitions;
    //         }, {} as {[key: string]: Competition[]})
    //     )
    // }

    loadCompetitions = async () => {
        this.setLoadingInitial(true);
        try {
            const activities = await agent.Competitions.list();
            activities.forEach(competition => {
                this.setCompetition(competition);
            })
            this.setLoadingInitial(false) 
                
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false) 
        }
    }

    loadCompetition = async (id: string) => {
        let activity = this.getCompetition(id);
        if (activity) {
            this.selectedCompetition = activity;
            return activity;
        }
        else {
            this.setLoadingInitial(true);
            try {
                activity = await agent.Competitions.details(id);
                this.setCompetition(activity);
                runInAction(() => this.selectedCompetition = activity);
                this.setLoadingInitial(false);
                return activity;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
        
    }

    private setCompetition = (competition: Competition) => {
        // competition.date = competition.date.split('T')[0];
        this.competitionRegistry.set(competition.id, competition);
    }

    private getCompetition = (id: string) => {
        return this.competitionRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createCompetition = async (competition: Competition) => {
        this.loading = true;
        competition.id = uuid();
        try {
            await agent.Competitions.create(competition);
            runInAction(() => {
                this.competitionRegistry.set(competition.id, competition);
                this.selectedCompetition = competition;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    updateCompetition = async (competition: Competition) => {
        this.loading = true;
        try {
            await agent.Competitions.update(competition);
            runInAction(() => {
                this.competitionRegistry.set(competition.id, competition);
                this.selectedCompetition = competition;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    deleteCompetition = async (id: string) => {
        this.loading = true;
        try {
            await agent.Competitions.delete(id);
            runInAction(() => {
                this.competitionRegistry.delete(id);
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }
}

