import { Outlet, useNavigation } from 'react-router-dom'
import MainNavigation from '../components/MainNavigation';
import classes from './Rootlayout.module.css';

const Rootlayout = () => {
    const navigation = useNavigation()
    return (
        <div className={classes.layout}>
            <MainNavigation />
            <main className={classes.main}>
                {navigation.state === 'loading' && <p>Loading...</p>}
                <Outlet />
            </main>
        </div>
    )
}

export default Rootlayout