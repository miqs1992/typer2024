const RulesPage = async () => {
  return (
    <>
      <h1 className="my-4 mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white">
        Regulamin
      </h1>

      <ul className="list-inside list-disc space-y-1 text-gray-500 dark:text-gray-400">
        <li>
          Zabawę dzielimy na 7 etapów - trzy kolejki grupowe, 1/8, ćwierćfinały,
          półfinały oraz finał
        </li>
        <li>
          Przed każdym z nich typujemy <b>DOKŁADNE</b> wyniki meczów, które mają
          się rozegrać
        </li>
        <li>
          W każdym etapie, każdy z nas wybiera swój <i>mecz kolejki</i>,
          oznaczając go w swoich typach gwiazdką. Za ten mecz punktujemy
          podwójnie.
        </li>
        <li>
          Czas na wytypowanie wyników danego dnia mamy do rozpoczęcia pierwszego
          meczu danego dnia, ani minuty później, bez żadnych wyjątków.
        </li>
        <li>
          Swoje typy można zmieniać do momentu rozpoczęcia pierwszego meczu
          danego dnia, ani minuty później.
        </li>
        <li>
          Typujemy także Mistrza Europy i Króla Strzelców
          <ol className="mt-2 list-inside list-decimal space-y-1 ps-5">
            <li>
              W przypadku gdy kilku zawodników skończy mistrzostwa z równą
              liczbą bramek, każdy z nich będzie uznany za Króla Strzelców
            </li>
            <li>
              Jeśli Król Strzelców nie strzeli na mistrzostwach minimum 3
              bramek, punktów w tej kategorii nie przyznajemy
            </li>
          </ol>
        </li>
        <li>
          W fazie pucharowej typujemy tylko 90 minut, bez dogrywki i rzutów
          karnych
        </li>
        <li>
          Typowanie odbywa się na stronie: https://typer2024.onrender.com/
        </li>
        <li>Wpisowe: 30PLN</li>
        <li>Podział puli: 50%/30%/20% - do potwierdzenia</li>
      </ul>

      <h3 className="my-4 mb-8 text-center text-xl font-bold text-gray-900 dark:text-white">
        Punktacja
      </h3>

      <ul className="mb-5 list-inside list-disc space-y-1 text-gray-500 dark:text-gray-400">
        <li>
          Poprawnie wytypowany dokładny wynik meczu - 3 punkty (np. typuję wynik
          Niemcy - Polska 1:7 i dokładnie taki pada)
        </li>
        <li>
          Poprawnie wytypowany wynik meczu - 1 punkt (np. typuję wynik Niemcy -
          Polska 1:7, a pada 21:37)
        </li>
        <li>
          Mecz kolejki (tak zwany joker/bonus) - x2 (np. moim meczem kolejki
          jest Niemcy - Polska 1:7, pada wynik 0:7, dostaje 2 punkty, a nie
          tylko 1 punkt) Łącznie będzie 7 jokerów do zużycia. Trzy kolejki w
          fazie grupowej + cztery rundy fazy pucharowej
        </li>
        <li>Poprawnie wytypowany Mistrz Europy - 7 punktów</li>
        <li>Poprawnie wytypowany Król Strzelców - 5 punktów</li>
        <li>
          Od fazy pucharowej pojawiają się mnożniki za poprawne typy:
          <ol className="mt-2 list-inside list-decimal space-y-1 ps-5">
            <li>1/8: x1.2</li>
            <li>1/4: x1.4</li>
            <li>1/2: x1.8</li>
            <li>Finał: x2.0</li>
          </ol>
        </li>
        <li>
          O zwycięstwie decyduje:
          <ol className="mt-2 list-inside list-decimal space-y-1 ps-5">
            <li>Liczba punktów</li>
            <li>Liczba poprawnie wytypowanych dokładnych wyników meczu</li>
            <li>Poprawnie wytypowany Mistrz Europy</li>
            <li>Poprawnie wytypowany Król Strzelców</li>
            <li>
              Jeśli to nie przyniesie rozstrzygnięcia, ogłaszamy więcej niż
              jednego Mistrza
            </li>
          </ol>
        </li>
      </ul>
    </>
  );
};

export default RulesPage;
