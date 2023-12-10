export function validateAge(dateOfBirth) {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age >= 18 && age <= 70;
}

export function dateConvertUK(dateString) {
  if (!dateString) return "";
  const [year, month, day] = dateString.split("-");
  return `${day}${month}${year}`; // Concatenating to DDMMYYYY
}
