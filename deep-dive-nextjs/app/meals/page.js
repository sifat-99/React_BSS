import Link from 'next/link'
import React from 'react'

const Meals = () => {
    return (
        <main>
            <header>
                <p>
                    <Link href="/meals/share">Share a Meal</Link>

                </p>
                <p>
                    <Link href="/meals/1">Meal 1</Link>
                </p>
                <p>
                    <Link href="/meals/2">Meal 2</Link>
                </p>
                <p>
                    Choose your favorite meal and share them with others!
                </p>
            </header>

        </main>
    )
}

export default Meals