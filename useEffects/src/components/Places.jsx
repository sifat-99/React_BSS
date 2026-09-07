export default function Places({ title, places, fallbackText, onSelectPlace }) {
    return (
        <section className="max-w-[85rem] mx-auto my-8 p-4 border-2 border-[#0d373e] rounded-lg">
            <h2 className="font-title text-2xl m-0 p-0 mb-4 text-[#8feeff] text-center">{title}</h2>
            {places.length === 0 && <p className='text-center'>{fallbackText}</p>}
            {places.length > 0 && (
                <ul className="max-w-[80rem]  grid grid-cols-[repeat(auto-fill,minmax(18rem,1fr))] gap-8 mx-auto my-8 p-0 list-none">
                    {places.map((place, index) => {
                        const rotationClass = index % 2 === 0 ? 'hover:rotate-[5deg] focus:rotate-[5deg]' : 'hover:rotate-[-5deg] focus:rotate-[-5deg]';
                        return (
                            <li key={place.id} className="relative flex flex-col rounded-lg bg-[#1f1c2c] shadow-[0_0.5rem_1rem_rgba(0,0,0,0.15)] animate-[slide-up-fade-in_0.3s_ease-out_forwards]">
                                <button
                                    onClick={() => onSelectPlace(place.id)}
                                    className={`bg-transparent border-none p-0 transition-all duration-200 ease-in-out hover:shadow-[0_0_8px_4px_rgba(255,217,0,0.6)] focus:shadow-[0_0_8px_4px_rgba(255,217,0,0.6)] hover:rounded-lg focus:rounded-lg ${rotationClass}`}
                                >
                                    <img className="w-full h-full object-cover rounded-lg" src={place.image.src} alt={place.image.alt} />
                                    <h3 className="font-title font-normal text-[0.9rem] absolute bottom-0 right-4 my-4 mx-auto bg-[#feee86] text-black rounded p-[0.15rem_0.35rem] shadow-[0_1px_4px_rgba(0,0,0,0.4)]">
                                        {place.title}
                                    </h3>
                                </button>
                            </li>
                        );
                    })}
                </ul>
            )}
        </section>
    );
}
