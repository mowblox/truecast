import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const ElectionFactoryModule = buildModule("ElectionFactoryModule", (m) => {
  const electionFactory = m.contract("ElectionFactory");

  const electionTitle = m.getParameter("electionTitle", "Demo Election");
  const electionDescription = m.getParameter("electionDescription", "Election description for demo purposes.");
  const isPublic = m.getParameter("isPublic", true);
  const startDate = m.getParameter("startDate", 1730469605); // Current time in seconds
  const endDate = m.getParameter("endDate", 1733061605); // 1 week later

  m.call(electionFactory, "createElection", [electionTitle, electionDescription, isPublic, startDate, endDate]);

  return { electionFactory };
});

export default ElectionFactoryModule;