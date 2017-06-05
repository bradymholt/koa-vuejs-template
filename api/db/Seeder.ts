import { getConnection } from "typeorm";
import * as bcrypt from "bcryptjs";

import User from "../models/User";

export async function seedDevelopmentData() {
  let connection = getConnection();
  let userRepo = connection.getRepository(User);

  // Create test user
  let email = "user@test.com";
  let password = "P2ssw0rd!";

  let testUser = await userRepo.createQueryBuilder("u").
    where("u.email = :email", { email }).
    getOne();

  if (!testUser) {
    let newUser = new User()
    newUser.email = email;
    let hashedPassword = await bcrypt.hash(password, 3);
    newUser.hashedPassword = hashedPassword;
    newUser.emailConfirmed = true;
    await userRepo.persist(newUser);
  }
}
