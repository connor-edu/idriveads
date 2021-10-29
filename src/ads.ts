export interface Ad {
  id: number;
  name: string;
  company: string;
  description: string;
  rpm: number;
}
export const ads: Ad[] = [
  {
    id: 1,
    name: "Cola Coca",
    company: "Cola Coca Co",
    description: "Company that makes a brand of soft drink ",
    rpm: 0.16,
  },
  {
    id: 2,
    name: "Legal Assistance",
    company: "Hopkins Law Firm",
    description: "Company for providing legal assistance to people",
    rpm: 0.07,
  },
  {
    id: 3,
    name: "Health Insurance",
    company: "Davenport Health Insurance",
    description: "Company for providing health insurance",
    rpm: 0.08,
  },
  {
    id: 4,
    name: "Life Insurance",
    company: "Blaine Life Insurance",
    description: "Compnay for providing life insurance",
    rpm: 0.11,
  },
];
