import { useEffect, useState } from "react";

export default function useMousePosition() {
  // je crée un state 'mousePosition' qui rassemblera les coordonnées de ma souris
  const [mousePosition, setMousePosition] = useState({ x: null, y: null });

  useEffect(() => {
    // je crée la fonction que je réutiliserai dans mon eventListener : elle consiste
    // simplement à sauvegarder les coordonnées de la souris dans le state 'mousePosition'
    const mouseMoveHandler = (event) => {
      const { clientX, clientY } = event;
      setMousePosition({ x: clientX, y: clientY });
    };

    //Je lance l'eventListener
    document.addEventListener("mousemove", mouseMoveHandler);

    //Je supprime l'eventListener pour optimiser les performances
    return () => {
      document.removeEventListener("mousemove", mouseMoveHandler);
    };
  }, []);

  // Le hook retournera finalement les coordonnées
  return mousePosition;
}
