import { Outlet } from 'react-router-dom'
import MainNavigation from '../components/MainNavigation';
import classes from './Rootlayout.module.css';

const Rootlayout = () => {
    return (
        <div className={classes.layout}>
            <MainNavigation />
            <main className={classes.main}>
                <Outlet />
            </main>
        </div>
    )
}

export default Rootlayout