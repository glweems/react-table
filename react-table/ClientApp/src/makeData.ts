import _ from "lodash";
import faker from "faker";
import Axios from "axios";

class Person {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  companyName: string;
  constructor() {
    this.firstName = faker.name.firstName();
    this.lastName = faker.name.lastName();
    this.userName = faker.internet.userName();
    this.email = faker.internet.email();
    this.companyName = faker.company.companyName();
    // this.idk = faker.helpers.userCard();
  }
}
console.log(faker.helpers.userCard());
const dummyUser: any = new Person();

export const columns = [
  {
    Header: "Users",
    columns: [
      { Header: "Name", accessor: "name" },
      { Header: "username", accessor: "username" },
      { Header: "email", accessor: "email" },
      { Header: "phone", accessor: "phone" },
      { Header: "website", accessor: "website" },
    ],
  },
];

export default function makeData(columns: number) {
  const arr = new Array(columns).fill(null).map(() => new Person());
  return arr;
}

export async function seedDb(numUsers = 10) {
  const { data: users } = await Axios.get("/api/users");
  if (users.length < numUsers)
    await Axios.all(
      new Array(numUsers - users.length)
        .fill(null)
        .map(() => Axios.post("/api/users", faker.helpers.userCard()))
    )
      .catch((err) => console.error(err))
      .then(() => window.location.reload())
      .finally(() => console.debug(`DB Seeded With ${numUsers} new users`));
}
