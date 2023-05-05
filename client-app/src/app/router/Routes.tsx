import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import CompetitionDashboard from "../../features/competitions/dashboard/CompetitionDashboard";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            {path: 'competitions', element: <CompetitionDashboard />},
        //     {path: 'activities/:id', element: <ActivityDetails />},
        //     {path: 'createActivity', element: <ActivityForm key='create' />},
        //     {path: 'manage/:id', element: <ActivityForm key='manage' />},
        ]
    }
]

export const router = createBrowserRouter(routes);