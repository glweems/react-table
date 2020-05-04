import Axios from "axios";
import faker from "faker";
import _ from "lodash";
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
  }
}

export const columns = [
  {
    Header: "Names",
    columns: [
      { Header: "Name", accessor: "name" },
      { Header: "username", accessor: "username" },
    ],
  },
  {
    Header: "Other Fields",
    columns: [
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

/* export async function seedDb(numUsers = 10) {
  const [{ data, loading, error }, api] = useAxios("/api/users", {
    useCache: false,
  });

  if (!loading && !error && data.length < numUsers)
    await Axios.all(
      new Array(numUsers - data.length)
        .fill(null)
        .map(() =>
          api({
            method: "GET",
            url: "/api/users",
            data: faker.helpers.userCard(),
          })
        )
    )
      .catch((err) => console.error(err))
      .then(() => window.location.reload())
      .finally(() => console.debug(`DB Seeded With ${numUsers} new users`));
} */
export async function seedDb(numUsers = 10) {
  const { data: users } = await Axios.get("/api/users");

  if (users.length < numUsers)
    await Axios.all(
      new Array(numUsers - users.length).fill(null).map(() =>
        Axios({
          method: "GET",
          url: "/api/users",
          data: faker.helpers.userCard(),
        })
      )
    )
      .catch((err) => console.error(err))
      .then(() => window.location.reload())
      .finally(() => console.debug(`DB Seeded With ${numUsers} new users`));
}

export function makeYAxisData(yAxisArr: string[], data: any) {
  console.log("data: ", data);
  let obj = {
    Header: "Y Axis",
    columns: yAxisArr.map((y) => ({ Header: y, accessor: "y" })),
  };

  let d: any = data;

  data.forEach((y, i) => {
    let key = _.camelCase(y);
    // d?.[i]?.[key] = y;
  });
  return obj;
}

const yAxis = [
  "Unsecured credit card loans",
  "Payday alternative loans (pal loans)",
  "Non-federal guaranteed student loans",
  "New vehicle loans",
  "Used vehicle loans",
  "Total 1st mtg re loan/loc",
  "Total other re loans/loc",
  "Leans Receivable",
  "All other loans",
].map((label) => ({ key: _.camelCase(label), value: label }));
