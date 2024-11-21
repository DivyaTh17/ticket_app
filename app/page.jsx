import TicketCard from "./(components)/TicketCard";

const getTickets = async () => {
  try {
    const apiUrl =
      process.env.NODE_ENV === "production"
        ? "https://ticket-app-sage.vercel.app/api/Tickets" // Production URL on Vercel
        : "http://localhost:3000/api/Tickets"; // Local URL for development

    const res = await fetch(apiUrl, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch tickets: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.log("Failed to get tickets", error);
    return { tickets: [] }; // Default return if there's an error
  }
};

const Dashboard = async () => {
  const { tickets = [] } = await getTickets();

  const uniqueCategories = [
    ...new Set(tickets?.map(({ category }) => category)),
  ];

  return (
    <div className="p-5">
      <div>
        {tickets &&
          uniqueCategories?.map((uniqueCategory, categoryIndex) => (
            <div key={categoryIndex} className="mb-4">
              <h2>{uniqueCategory}</h2>
              <div className="lg:grid grid-cols-2 xl:grid-cols-4">
                {tickets
                  .filter((ticket) => ticket.category === uniqueCategory)
                  .map((filteredTicket, _index) => (
                    <TicketCard
                      id={_index}
                      key={_index}
                      ticket={filteredTicket}
                    />
                  ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
