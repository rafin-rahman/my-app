export type FormInputs = {
  title: string;
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
  placeOfBirth: string;
  nationality: string;
  nationalInsuranceNumber: string;
  // b1
  holdUkPassport: boolean;
  // c
  previousLoanSLC: boolean;
  behindWithRepayments: boolean;
  // d1
  armedForcesMember: boolean;
  // d2
  familyMemberArmedForces: boolean;
  // e
  address: string;
  postcode: string;
  telephoneNumber: string;
  emailAddress: string;
  //f What is your current relationship status? Single, Living with a partner, Married/civil partnership, Separated, Divorced, Widowed
  relationshipStatus: string;
  // if married provide date of marriage/civil partnership
  marriageDate: string;
  // a2
  ukNational: boolean;
  // a3
  irishCitizen: boolean;
  ukResident3YearsBeforeFirstDayOfStudies: boolean;
  // a4
  familyMemberUkLiving3years: boolean;
  bothUkResident3YearsBeforeFirstDayOfStudies: boolean;
  // a5
  residencyStatus: string;
  settledStatusShareCode: string;
  // a6
  childOfSwissNational: boolean;
};
