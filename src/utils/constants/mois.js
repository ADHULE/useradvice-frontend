const monthNames = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];

export const MOIS = monthNames.map((name, index) => {
  const value = String(index + 1).padStart(2, "0"); // "01", "02", ...
  return { value, label: name };
});
