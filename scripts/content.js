function add2hours(dateString) {
  const origin = new Date(dateString);
  origin.setHours(origin.getHours() + 2);
  return origin.toISOString();
}

function getDataFromMatch(match) {
  const displayedHour = match.querySelector(".matchFull__infosDate > time");
  if (!displayedHour) return null;
  const start = new Date(displayedHour.getAttribute("datetime")).toISOString();
  const end = add2hours(start);
  const teams = Array.from(
    match.querySelectorAll(".matchTeam__name"),
    (elem) => elem.innerText
  );
  /*   const link = match
    .querySelector(".matchFull__broadcastImage")
    .getAttribute("src");
  console.log("link", link); */
  const title = ` ${teams[0]} - ${teams[1]}`;
  const description = `Match entre ${teams.join(" et ")}`;
  return {
    start,
    end,
    title,
    description,
  };
}

function generateCalendar(match) {
  const event = getDataFromMatch(match);
  if (!event) return null;
  const calendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&dates=${event.start.replace(
    /-|:|\.\d+/g,
    ""
  )}/${event.end.replace(/-|:|\.\d+/g, "")}&text=${event.title}&details=${
    event.description
  }&location=${event.location}`;
  return calendarUrl;
}

function generateButton(match) {
  if (!generateCalendar(match)) return;
  const addButton = document.createElement("a");
  addButton.innerText = "Ajouter au calendrier";
  addButton.href = generateCalendar(match);
  addButton.target = "_blank";
  addButton.referrerPolicy = "no-referrer";
  addButton.classList = ["button button--secondary button--small"];

  match.appendChild(addButton);
}

const main = () => {
  const matches = document.querySelectorAll(".matchesGroup__match");
  for (const match of matches) {
    generateButton(match);
  }
};

main();
