"use client";

const timeline = [
  {
    name: 'Založení firmy',
    description:
      'V roce 2020 jsme jako malá skupina nadšených IT vývojářů založili firmu s vizí přinášet inovace a kvalitní softwarová řešení.',
    date: '2020',
    dateTime: '2020',
  },
  {
    name: 'První velký projekt',
    description:
      'V roce 2022 jsme úspěšně realizovali náš první velký projekt, který nám otevřel dveře k dalším ambiciózním zakázkám a posílil naši reputaci na trhu.',
    date: '2022',
    dateTime: '2022',
  },
  {
    name: 'Rozšíření týmu',
    description:
      'V roce 2023 jsme výrazně rozšířili náš tým o nové talenty, což nám umožnilo rozšířit nabídku služeb a lépe reagovat na potřeby našich klientů.',
    date: '2023',
    dateTime: '2023',
  },
  {
    name: 'Rozmach CRM a e-shopů',
    description:
    'Pustili jsme se do masové výroby CRM systémů a e-shopů šitých na zakázku. Naše nabídka se stala synonymem pro vysoce kvalitní a efektivní řešení, která posouvají hranice IT vývoje.',
    date: '2024',
    dateTime: '2024',
  },
];

export default function Example() {
  return (
    <div className="bg-white">
      {/* Nadpis nebo další úvodní informace lze přidat sem */}

      <main className="isolate pt-32">
        {/* Timeline sekce */}
        <div className="pb-14 mx-auto -mt-8 max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 overflow-hidden lg:mx-0 lg:max-w-none lg:grid-cols-4">
            {timeline.map((item) => (
              <div key={item.name}>
                <time
                  dateTime={item.dateTime}
                  className="flex items-center text-sm font-semibold text-primary"
                >
                  <svg
                    viewBox="0 0 4 4"
                    aria-hidden="true"
                    className="mr-4 h-1 w-1 flex-none"
                  >
                    <circle r={2} cx={2} cy={2} fill="currentColor" />
                  </svg>
                  {item.date}
                  <div
                    aria-hidden="true"
                    className="absolute -ml-2 h-px w-screen -translate-x-full bg-gray-900/10 sm:-ml-4 lg:static lg:-mr-6 lg:ml-8 lg:w-auto lg:flex-auto lg:translate-x-0"
                  />
                </time>
                <p className="mt-6 text-lg font-semibold tracking-tight text-gray-900">
                  {item.name}
                </p>
                <p className="mt-1 text-base text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
