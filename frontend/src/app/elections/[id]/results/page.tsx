

export default function ElectionResultsPage() {
  const totalVoters = 42; // Total eligible voters

  // Example candidates and votes
  const candidates = [
    { name: 'Joshua Mensah', votes: 29 },
    { name: 'Alisson Newton', votes: 6 },
    { name: 'James Hammond', votes: 4 },
    { name: 'Michael Brown', votes: 3 },
  ];

  // Function to calculate percentage of votes for a candidate
  const getPercentage = (votes: number) => (votes / totalVoters) * 100;

  return (
    <div className="p-4 md:p-6 lg:p-8 mb-32 lg:mb-0">
      <div className="flex flex-col items-center text-center mb-6">
        <h1 className="gradient-text-vertical text-[32px] md:text-[40px] lg:text-[50px] font-bold font-space-grotesk">
          The addresses have spoken
        </h1>
        <p className="text-subtle-text text-[16px] md:text-[18px]">
          Turpis non molestie amet tortor. Diam amet volutpat
        </p>
      </div>

      <div className="border-t-[1px] border-subtle-text flex flex-col lg:flex-row justify-between pt-8">
        <div className="w-full lg:w-[55%] mb-6 lg:mb-0">
          <div className='flex flex-col justify-center lg:justify-start '>
            <button className="bg-[#FE6940] rounded-2xl px-3 py-1 mb-4 self-center md:self-start">
              closed
            </button>
            <h2 className="text-xl md:text-2xl font-bold font-space-grotesk text-center md:text-start">
              2024 SRC President - UG
            </h2>
          </div>
          <div className="mt-6 md:mt-10 text-center md:text-start">
            <p className="text-subtle-text font-bold mb-4">Description</p>
            <p>This election is being held to elect a new SRC president for the University of Ghana.</p>
          </div>
        </div>

        <div className="w-full lg:w-[35%] flex flex-col gap-6">
          <div className="border border-subtle-text rounded-lg p-4 md:p-6">
            <p className="font-bold font-space-grotesk text-subtle-text mb-6 text-[18px]">
              Results
            </p>

            {candidates.map((candidate, index) => {
              const percentage = getPercentage(candidate.votes);
              return (
                <div className="flex flex-col mb-6" key={index}>
                  <div className="flex gap-4 justify-between text-sm ">
                    <p className="w-[50%]">{candidate.name}</p>
                    <p className="text-subtle-text">{candidate.votes} votes</p>
                    <p className="text-subtle-text">{percentage.toFixed(2)}%</p>
                  </div>

                  {/* Custom progress bar */}
                  <div className="relative w-full h-4 bg-gray-200 rounded-full mt-2 bg-[#202020]">
                    <div
                      className="h-full bg-[#29D] rounded-full"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="border border-subtle-text rounded-lg p-4 md:p-6">
            <p className="font-bold font-space-grotesk text-subtle-text mb-6 text-[18px]">
              Election Information
            </p>
            <div className="flex flex-col gap-4 md:gap-6 text-sm md:text-base">
              <div className="flex justify-between">
                <p className="text-subtle-text">Created by</p>
                <p>0x4d...39dd</p>
              </div>

              <div className="flex justify-between">
                <p className="text-subtle-text">Start date</p>
                <p>Aug 17, 2024</p>
              </div>

              <div className="flex justify-between">
                <p className="text-subtle-text">End date</p>
                <p>Aug 29, 2024</p>
              </div>

              <div className="flex justify-between">
                <p className="text-subtle-text">Election type</p>
                <p>Private</p>
              </div>

              <div className="flex justify-between">
                <p className="text-subtle-text">Registered voters</p>
                <p>50</p>
              </div>

              <div className="flex justify-between">
                <p className="text-subtle-text">Voters</p>
                <p>42</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}