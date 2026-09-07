import { useRef, useState, useEffect, useCallback } from 'react';

import Places from './components/Places.jsx';
import { AVAILABLE_PLACES } from './data.js';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import { sortPlacesByDistance } from './loc.js';

const storedIds = JSON.parse(localStorage.getItem('selectedPlaces')) || [];
const storedPlaces = storedIds.map((id) =>
    AVAILABLE_PLACES.find((place) => place.id === id)
);

function App() {
    const selectedPlace = useRef();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [availablePlaces, setAvailablePlaces] = useState([]);
    const [pickedPlaces, setPickedPlaces] = useState(storedPlaces);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            const sortedPlaces = sortPlacesByDistance(
                AVAILABLE_PLACES,
                position.coords.latitude,
                position.coords.longitude
            );

            setAvailablePlaces(sortedPlaces);
        });
    }, []);

    function handleStartRemovePlace(id) {
        setModalIsOpen(true);
        selectedPlace.current = id;
    }

    function handleStopRemovePlace() {
        setModalIsOpen(false);
    }

    function handleSelectPlace(id) {
        setPickedPlaces((prevPickedPlaces) => {
            if (prevPickedPlaces.some((place) => place.id === id)) {
                return prevPickedPlaces;
            }
            const place = AVAILABLE_PLACES.find((place) => place.id === id);
            return [place, ...prevPickedPlaces];
        });

        const storedIds = JSON.parse(localStorage.getItem('selectedPlaces')) || [];
        if (storedIds.indexOf(id) === -1) {
            localStorage.setItem(
                'selectedPlaces',
                JSON.stringify([id, ...storedIds])
            );
        }
    }

    const handleRemovePlace = useCallback(function handleRemovePlace() {
        setPickedPlaces((prevPickedPlaces) =>
            prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
        );
        setModalIsOpen(false);

        const storedIds = JSON.parse(localStorage.getItem('selectedPlaces')) || [];
        localStorage.setItem(
            'selectedPlaces',
            JSON.stringify(storedIds.filter((id) => id !== selectedPlace.current))
        );
    }, []);

    return (
        <section className='m-0 p-8 bg-[linear-gradient(180deg,#1f1c2c_0%,#1f1c2c_100%)] min-h-screen'>
            <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
                <DeleteConfirmation
                    onCancel={handleStopRemovePlace}
                    onConfirm={handleRemovePlace}
                />
            </Modal>

            <header className="text-center">
                <img src={logoImg} alt="Stylized globe" className="w-20 h-20 object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.4)] mx-auto inline-block" />
                <h1 className="m-0 text-[3rem] uppercase tracking-[1rem]">PlacePicker</h1>
                <p className="m-0 mx-auto text-[1.15rem] max-w-[38ch] text-[#9eb5b4]">
                    Create your personal collection of places you would like to visit or
                    you have visited.
                </p>
            </header>
            <main>
                <Places
                    title="I'd like to visit ..."
                    fallbackText={'Select the places you would like to visit below.'}
                    places={pickedPlaces}
                    onSelectPlace={handleStartRemovePlace}
                />
                <Places
                    title="Available Places"
                    places={availablePlaces}
                    fallbackText="Sorting places by distance..."
                    onSelectPlace={handleSelectPlace}
                />
            </main>
        </section>
    );
}

export default App;
