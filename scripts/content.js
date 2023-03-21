function add2hours(dateString) {
  const origin = new Date(dateString);
  origin.setHours(origin.getHours() + 2);
  return origin.toISOString();
}

function getDataFromMatch(match) {
  const displayedHour = match.querySelector(".matchBroadcast__headDate > time");
  if (!displayedHour) return null;
  const start = new Date(displayedHour.getAttribute("datetime")).toISOString();
  const end = add2hours(start);
  const competition = match.querySelector(
    ".matchBroadcast__headCompetition"
  ).innerText;
  const teams = Array.from(
    match.querySelectorAll(".matchTeam__name"),
    (elem) => elem.innerText
  );
  const link = match
    .querySelector(".matchBroadcast__link")
    .getAttribute("href");
  const location = `https://footmercato.net${link}`;
  const title = `[${competition}] ${teams[0]} - ${teams[1]}`;
  const description = `Match de ${competition} entre ${teams.join(
    " et "
  )}, retrouvez toutes les informations sur ${location}`;
  return {
    start,
    end,
    title,
    description,
    location,
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
