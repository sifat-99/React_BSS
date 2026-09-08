import { Link } from 'react-router-dom';
import MainNavigation from '../components/MainNavigation';

function ErrorPage() {
  return (
    <>
      <MainNavigation />
      <main>
        <h1>Please visit in the correct route!</h1>
        <p>You are in the wrong direction, turn back!</p>
        <Link to="/">Back to Home</Link>
      </main>
    </>
  );
}

export default ErrorPage;
