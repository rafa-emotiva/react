import { useEffect, useState } from "react"
import { getRandomFact } from "../services/facts"

export function useCatFact () {
    const [fact, setFact] = useState()

    const refreshFact = () => {
        getRandomFact().then(setFact)
    }

    // para recuperar la cita al cargar la pagina
    useEffect(refreshFact, [])

    return {fact, refreshFact}
}