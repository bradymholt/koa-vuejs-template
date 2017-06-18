import { createConnection as createDbConnection, getConnection, ConnectionOptions, Connection } from 'typeorm';
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import * as bcrypt from "bcryptjs";
import User from "../models/User";
import Contact from "../models/Contact";

export type PostgresConnectionOptions = PostgresConnectionOptions;

export default class DbInitializer {
  static async init(connectionOptions: PostgresConnectionOptions, seed: boolean = false) {
    // Get the options and clone to a new object since node-config gives a read-only object and TypeORM attempts to modify it.
    let options: any = Object.assign({}, connectionOptions);
    // Prepend absolute path to entities/migrations items
    options.entities = options.entities.map((item) => { return `${__dirname}/../${item}`; });
    options.migrations = options.migrations.map((item) => { return `${__dirname}/../${item}`; });

    try {
      let connection = await createDbConnection(options as ConnectionOptions);
      if (seed) {
        console.log("Seeding the database...");
        await this.seedData();
      }
    } catch (err) {
      console.log(`Error initializing the database: ${err}`);
      throw err;
    }
  }

  private static async seedData() {
    let connection = getConnection();
    let contactRepo = connection.getRepository(Contact);

    // Create test user
    let email = "user@test.com";
    let password = "P2ssw0rd!";

    let user1 = new User()
    user1.email = email;
    let hashedPassword = await bcrypt.hash(password, 3);
    user1.hashedPassword = hashedPassword;
    user1.emailConfirmed = true;

    let userRepo = connection.getRepository(User);
    await userRepo.persist(user1);

    // Create test contacts
    let contact1 = new Contact({
      id: 1,
      lastName: "Finkley",
      firstName: "Adam",
      phone:  "555-555-5555",
      email: "adam@somewhere.com"
    });
    await contactRepo.save(contact1);

    let contact2 = new Contact({
      id: 2,
      lastName: "Biles",
      firstName: "Steven",
      phone: "555-555-5555",
      email: "sbiles@somewhere.com"
    });
    await contactRepo.save(contact2);
  }
}
