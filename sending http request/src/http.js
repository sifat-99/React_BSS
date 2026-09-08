export default async function fetchAvailablePlaces() {
    const response = await fetch("https://sending-http-request-5s8ezocen-sifats-projects-c0b91c2d.vercel.app/places");
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Could not fetch places.");
    }

    return data.places;
}

export async function updateUserPlaces(places) {
    const response = await fetch("https://sending-http-request-5s8ezocen-sifats-projects-c0b91c2d.vercel.app/user-places", {
        method: "PUT",
        body: JSON.stringify({ places }),
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        throw new Error(data.message || "Could not update places.");
    }

    const resData = await response.json();
    return resData;
}

export async function fetchUserPlaces() {
    const response = await fetch("https://sending-http-request-5s8ezocen-sifats-projects-c0b91c2d.vercel.app/user-places");
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Could not fetch places.");
    }

    return data.places;
}
