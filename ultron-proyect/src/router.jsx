import {createBrowserRouter} from 'react-router-dom';
import Mapas from "./views/Mapas";
import Route from './views/Route';

const router = createBrowserRouter([
    {
        path : 'route/:origen/:destino',
        element : <Route/>,
        errorElement : <h1>error al cargar pagina Route : error 401</h1>
    },
    {
        path: '/',
        element: <Mapas/>,
        errorElement: <h1>error page 401</h1>,
    },
]);

export default router;